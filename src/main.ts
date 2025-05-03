import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.enableCors({
    origin: ['http://localhost:5173','http://localhost:5174'],
    credentials: false,              
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Backend listening on port ${process.env.PORT}`);

}
bootstrap();