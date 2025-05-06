import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('run')
  async runSeed() {
    await this.seedService.seed();
    return 'Seeding completed successfully';
  }
}
