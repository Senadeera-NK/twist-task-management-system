import { Controller, Post, Body, UseGuards, Request, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import * as express from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('register')
    async register(@Body() body:any){
        return this.authService.register(body.email, body.password);
    }

    @Post('login')
    async login(@Body() loginDto:any, @Res({passthrough:true}) res: express.Response){
        return this.authService.login(loginDto.email, loginDto.password, res);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('refresh')
    async refresh(@Request()req:any){
        return this.authService.refresh(req.user.userId, req.user.email);
    }
}
