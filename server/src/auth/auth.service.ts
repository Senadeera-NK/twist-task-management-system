import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}
    
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
}
