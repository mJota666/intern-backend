import { Module }         from '@nestjs/common';
import { JwtModule }      from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../users/schema/user.schema';
import { AuthService }      from './auth.service';
import { AuthController }   from './auth.controller';
import { JwtStrategy }      from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
    PassportModule,
    // JwtModule.register({ secret: process.env.JWT_SECRET }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject:  [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret:     cfg.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn: cfg.get<string>('JWT_EXPIRES_IN')
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
