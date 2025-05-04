import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  BadRequestException,
  HttpCode,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard }     from '@nestjs/passport';
import { ExtractJwt }    from 'passport-jwt';
import type { Request }  from 'express';

import { AuthService }   from './auth.service';
import { LoginDto }      from './dto/login.dto';
import { RegisterDto }   from './dto/register.dto';

interface JwtRequest extends Request {
  user: { sub: string; role: string };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() dto: RegisterDto) {
    try {
      const user = await this.authService.register(dto);
      console.log("user ne:")
      console.log(user)
      return { id: user._id, email: user.email, name: user.name };
    } catch (e: any) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('logout')
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  logout(@Req() req: JwtRequest) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    return this.authService.logout(req.user.sub, token);
  }
}
