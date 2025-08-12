import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

@Injectable()
export class StorageService {
  constructor(private configService: ConfigService) {}

  getMp3Path(): string {
    return path.resolve(this.configService.get<string>('MP3_PATH') || '');
  }

  getThumbnailPath(): string {
    return path.resolve(this.configService.get<string>('THUMBNAIL_PATH') || '');
  }

  getArtistsImagePath(): string {
    return path.resolve(this.configService.get<string>('ARTIST_PATH') || '');
  }
}
