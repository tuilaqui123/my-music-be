import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Bỏ field không hợp lệ
      transform: true, // Ép kiểu dữ liệu tự động
    }),
  );
  app.enableCors(); // Bật CORS nếu cần thiết
  // app.setGlobalPrefix('api'); // Thiết lập tiền tố toàn cục cho các route
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
