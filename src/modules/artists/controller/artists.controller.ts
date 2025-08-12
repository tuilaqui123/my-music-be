import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArtistsEntity } from '../entity/artists.entity';
import { ArtistsService } from '../service/artists.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly appService: ArtistsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = process.env.ARTIST_PATH || './uploads/artists';
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          cb(null, `${Date.now()}-${uuidv4()}${ext}`);
        },
      }),
    }),
  )
  async create(
    @Body() body: ArtistsEntity,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<ArtistsEntity> {
    let imgPath = '';
    let fileName = '';

    if (file) {
      // Lưu URL cho FE
      imgPath = file.filename;
      // Lưu tên file để BE quản lý
      fileName = file.filename;
    }

    return this.appService.create({
      ...body,
      img_thumb: imgPath, // URL cho FE
      // img_file: fileName, // Tên file thật
    });
  }
}
