import { Module, Global }           from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type Redis                   from 'ioredis';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: (cfg: ConfigService) => {
        const host = cfg.get<string>('REDIS_HOST', 'localhost');
        const port = parseInt(cfg.get<string>('REDIS_PORT', '6379'), 10);
        return new (require('ioredis'))({ host, port }) as Redis;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
