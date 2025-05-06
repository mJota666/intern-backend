// src/app.module.ts

import { Module }             from '@nestjs/common';
import { ConfigModule }       from '@nestjs/config';
import { MongooseModule }     from '@nestjs/mongoose';

import { RedisModule }        from './redis/redis.module';
import { AuthModule }         from './auth/auth.module';
import { UsersModule }        from './users/users.module';
import { ContentsModule }     from './contents/contents.module';
import { UploadModule }       from './upload/upload.module';
import { GatewayModule }      from './gateway/content.gateway';

import { AppController }      from './app.controller';
import { AppService }         from './app.service';

import { SeedModule } from 'seed/seed.module';
import 'dotenv/config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env',   }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    RedisModule,
    AuthModule,
    UsersModule,
    ContentsModule,
    UploadModule,
    GatewayModule,
    SeedModule,
  ],
  controllers: [AppController],    
  providers: [AppService],         
})

export class AppModule {}
