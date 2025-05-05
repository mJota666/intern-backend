import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService }                               from '@nestjs/jwt';
import { InjectModel }                              from '@nestjs/mongoose';
import { Model }                                    from 'mongoose';
import * as bcrypt                                  from 'bcryptjs';
import type { Redis }                               from 'ioredis';

import { User, UserDocument } from '../users/schema/user.schema';
import { JwtPayload }         from './types';
import { LoginDto }           from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis, 
    private readonly usersService: UsersService,             

  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException();
    const match = await bcrypt.compare(pass, user.passwordHash);
    if (!match) throw new UnauthorizedException();
    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    const payload: JwtPayload = { sub: user.id, role: user.role, name: user.name };
    const token = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    await this.redis.set(
      `session:${user.id}:${token}`,
      '1',
      'EX',
      parseInt(process.env.JWT_EXPIRES_IN!, 10),
    );

    return { accessToken: token, user };
  }

  async register(dto: RegisterDto) {
    return this.usersService.create({
      email: dto.email,
      name: dto.name,
      passwordHash: dto.password,  
      role: dto.role
    });
  }

  async logout(userId: string, token: string) {
    await this.redis.del(`session:${userId}:${token}`);
  }
}
