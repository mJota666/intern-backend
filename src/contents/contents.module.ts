import { Module }         from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ContentsController } from './contents.controller';
import { ContentsService }    from './contents.service';
import { Content, ContentSchema } from './schema/content.schema';
import { ContentGateway }     from '../gateway/content.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }])
  ],
  controllers: [ContentsController],
  providers: [ContentsService, ContentGateway],
})
export class ContentsModule {}
