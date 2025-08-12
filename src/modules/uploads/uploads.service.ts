import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { StorageService } from 'src/modules/storage/storage.service';

const execAsync = promisify(exec);

@Injectable()
export class UploadsService {
  constructor(private storageService: StorageService) {}
  async uploads(data: any): Promise<any> {
    const MUSIC_DIR = this.storageService.getMp3Path();
    const THUMBNAIL_DIR = this.storageService.getThumbnailPath();
    const cmd = `yt-dlp -o "${MUSIC_DIR}/%(title)s.%(ext)s" -x --audio-format mp3 --write-thumbnail --convert-thumbnails jpg "${data.link}"`;

    await execAsync(cmd);

    const files = fs.readdirSync(MUSIC_DIR).filter((f) => f.endsWith('.jpg'));

    for (const file of files) {
      const src = path.join(MUSIC_DIR, file);
      const dest = path.join(THUMBNAIL_DIR, file);
      fs.renameSync(src, dest);
    }

    return 'Downloaded successfully';
  }
}
