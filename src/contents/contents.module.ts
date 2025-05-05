import { Module }              from '@nestjs/common';
import { MongooseModule }      from '@nestjs/mongoose';
import { Content, ContentSchema } from './schema/content.schema';
import { ContentsService }     from './contents.service';
import { ContentsController }  from './contents.controller';
import { ContentGateway } from '../gateway/content.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }]),
  ],
  providers: [ContentsService, ContentGateway],
  controllers: [ContentsController],
})
export class ContentsModule {}
