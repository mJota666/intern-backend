
import { Injectable }                      from '@nestjs/common';
import { ConfigService }                   from '@nestjs/config';
import type { Express }                    from 'express';
import { S3Client, PutObjectCommand }      from '@aws-sdk/client-s3';

@Injectable()
export class UploadService {
  private readonly s3: S3Client;
  private readonly bucket: string;
  private readonly region: string;

  constructor(private readonly cfg: ConfigService) {
    this.bucket = cfg.get<string>('AWS_S3_BUCKET')!;
    this.region = cfg.get<string>('AWS_REGION')!;
    
    this.s3 = new S3Client({
      region: cfg.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId:     cfg.get<string>('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: cfg.get<string>('AWS_SECRET_ACCESS_KEY')!,
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = `uploads/${Date.now()}-${file.originalname}`;

    await this.s3.send(new PutObjectCommand({
      Bucket:      this.bucket,
      Key:         key,
      Body:        file.buffer,
      ContentType: file.mimetype,
    }));
    // console.log(this.s3.re)
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
  }
}
