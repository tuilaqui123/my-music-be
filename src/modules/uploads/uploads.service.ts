import { Injectable } from '@nestjs/common';
import { spawn, exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import { StorageService } from '../storage/storage.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TracksEntity } from 'src/modules/tracks/entity/tracks.entity';

const execAsync = promisify(exec);

@Injectable()
export class UploadsService {
  constructor(
    private storageService: StorageService,
    @InjectRepository(TracksEntity)
    private tracksRepo: Repository<TracksEntity>,
  ) {}

  async uploads(data: any): Promise<TracksEntity> {
    const MUSIC_DIR = this.storageService.getMp3Path();
    const THUMBNAIL_DIR = this.storageService.getThumbnailPath();

    // 1. Lấy metadata trước khi download
    const { stdout } = await execAsync(`yt-dlp -j "${data.link}"`);
    const info = JSON.parse(stdout);
    const trackName = info.title; // tên nhạc (UTF-8 chuẩn)
    const thumbUrl = info.thumbnail; // link ảnh gốc (có thể dùng để fallback)

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

      let downloadedFilePath = '';
      let downloadedThumbPath = path.join(THUMBNAIL_DIR, `${trackName}.jpg`);

      child.stdout.on('data', (chunk) => {
        const msg = chunk.toString();
        process.stdout.write(msg);

        // Bắt tên file nhạc từ log
        const audioMatch = msg.match(/Destination:\s(.+\.mp3)/);
        if (audioMatch) {
          downloadedFilePath = audioMatch[1];
        }

        // Bắt thumbnail convert thành jpg
        const thumbMatch = msg.match(/Converting thumbnail ".+\\(.+\.jpg)"/);
        if (thumbMatch) {
          downloadedThumbPath = path.join(THUMBNAIL_DIR, thumbMatch[1]);
        }
      });

      child.stderr.on('data', (chunk) => {
        process.stderr.write(chunk.toString());
      });

      child.on('close', async (code) => {
        if (code === 0) {
          try {
            const track = this.tracksRepo.create({
              link: data.link,
              file_path: downloadedFilePath,
              img_thumb: downloadedThumbPath,
              name: trackName,
              favourite: false,
            });

            const saved = await this.tracksRepo.save(track);
            resolve(saved);
          } catch (err) {
            reject(err);
          }
        } else {
          reject(new Error(`yt-dlp exited with code ${code}`));
        }
      });
    });
  }
}
