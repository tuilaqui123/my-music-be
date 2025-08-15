import {
  Controller,
  Post,
  Body,
  UploadedFile,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseController } from 'src/core/controller/base.controller';
import { PlaylistEntity } from '../entity/playlist.entity';
import { PlaylistService } from '../service/playlist.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Controller('playlist')
@Injectable()
export class PlaylistController extends BaseController<PlaylistEntity> {
  constructor(protected readonly appService: PlaylistService) {
    super(appService);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = process.env.PLAYLIST_PATH || './uploads/playlist';
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
    @Body() body: PlaylistEntity,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<PlaylistEntity> {
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
