import { Module }            from '@nestjs/common';
import { MulterModule }      from '@nestjs/platform-express';

import { UploadService }     from './upload.service';
import { UploadController }  from './upload.controller';

@Module({
  imports: [
    MulterModule.register({
      storage: require('multer').memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  ],  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
