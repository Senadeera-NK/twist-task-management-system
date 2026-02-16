import { Controller, Post, Body, UseGuards, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('register')
    async register(@Body() body:any){
        return this.authService.register(body.email, body.password);
    }

    @Post('login')
    async login(@Body() body:any){
        return this.authService.login(body.email, body.password);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('refresh')
    async refresh(@Request()req:any){
        return this.authService.refresh(req.user.userId, req.user.email);
    }
}
