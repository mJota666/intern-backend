import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedService } from './seed.service';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { Content, ContentSchema } from 'src/contents/schema/content.schema';
import { SeedController } from './seed.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }]),
  ],
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule {}
