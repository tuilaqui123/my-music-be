import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksModule } from './modules/tracks/tracks.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { GenresModule } from './modules/genres/genres.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { MulterModule } from '@nestjs/platform-express';
import { StorageService } from './modules/storage/storage.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import { StorageModule } from './modules/storage/storage.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';

dotenv.config();
console.log('🔍 Loaded DB config:', {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS ? '***HIDDEN***' : '(empty)',
  DB_NAME: process.env.DB_NAME,
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule, StorageModule], // 👈 thêm StorageModule ở đây
      inject: [StorageService],
      useFactory: (storageService: StorageService) => {
        const uploadPath = storageService.getArtistsImagePath();
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        return {
          storage: diskStorage({
            destination: (req, file, cb) => cb(null, uploadPath),
            filename: (req, file, cb) => {
              const ext = path.extname(file.originalname);
              cb(null, `${Date.now()}-${uuidv4()}${ext}`);
            },
          }),
        };
      },
    }),
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: path.resolve(
            configService.get<string>('ARTIST_PATH') || '',
          ),
          serveRoot: '/artists',
        },
      ],
    }),

    TracksModule,
    PlaylistModule,
    GenresModule,
    ArtistsModule,
    UploadsModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
