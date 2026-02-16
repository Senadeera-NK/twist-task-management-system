import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ){}
    
    async register(email: string, pass: string){
        //checking if the user is already existing with the given mail
        const existingUser = await this.prisma.user.findUnique({
            where:{email},
        });
        if(existingUser){
            throw new ConflictException("email already in use");
        }

        //if not hashing the password
        const hashedPassword = await bcrypt.hash(pass, 10);

        //saving the user to the DB
        const user = await this.prisma.user.create({
            data:{
                email,
                password:hashedPassword
            }
        });

        //returning the user without the password
        const {password, ...result} = user;
        return result;
    }

    //login
    async login(email: string, pass: string, res: Response){
        try{
        //finding the user
        const user = await this.prisma.user.findUnique({where:{email}});
        if(!user)throw new UnauthorizedException('invalid credentials');

        //compare passwords
        const isMatch = await bcrypt.compare(pass, user.password);
        if(!isMatch)throw new UnauthorizedException('Invalid credentials');

        //generating the JWT
        const payload = {sub:user.id, email:user.email};
        const access_token = await this.jwtService.signAsync(payload);

        res.cookie('access_token', access_token, {
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge:3600000,
            path:'/',
        });
        return {message:'Logged in successfully'};
        }catch(err){
            console.error("CIRITCAL LOGIN ERROR", err);
        }
    }

    //jwt token refresh
    async refresh(userId:number, email:string){
        //checking if the user exists
        const user = await this.prisma.user.findUnique({where:{id:userId}});
        if(!user)throw new UnauthorizedException('User no longer exists');
        
        const payload = {sub:userId, email:email};

        return {
            access_token:await this.jwtService.signAsync(payload, {
                expiresIn:'15m',
            }),
        };
    }
}
