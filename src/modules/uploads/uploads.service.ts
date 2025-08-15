import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class UploadsService {
  constructor(private storageService: StorageService) {}

  async uploads(data: any): Promise<string> {
    const MUSIC_DIR = this.storageService.getMp3Path();
    const THUMBNAIL_DIR = this.storageService.getThumbnailPath();

    console.log('MUSIC_DIR:', MUSIC_DIR);
    console.log('THUMBNAIL_DIR:', THUMBNAIL_DIR);

    return new Promise((resolve, reject) => {
      const args = [
        '-o',
        `${MUSIC_DIR}/%(title)s.%(ext)s`,
        '--output',
        `thumbnail:${THUMBNAIL_DIR}/%(title)s.%(ext)s`,
        '-x',
        '--audio-format',
        'mp3',
        '--write-thumbnail',
        '--convert-thumbnails',
        'jpg',
        data.link,
      ];


      const child = spawn('yt-dlp', args, { shell: true });

      // Log từng dòng stdout (tiến độ tải)
      child.stdout.on('data', (data) => {
        process.stdout.write(data.toString());
      });

      // Log stderr (lỗi hoặc thông tin thêm từ yt-dlp)
      child.stderr.on('data', (data) => {
        process.stderr.write(data.toString());
      });

      // Xử lý khi hoàn tất
      child.on('close', (code) => {
        if (code === 0) {
          resolve('Downloaded successfully');
        } else {
          reject(new Error(`yt-dlp exited with code ${code}`));
        }
      });
    });
  }
}
