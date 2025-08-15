import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/service/base.service';
import { PlaylistEntity } from '../entity/playlist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlaylistService extends BaseService<PlaylistEntity> {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepository: Repository<PlaylistEntity>,
  ) {
    super(playlistRepository);
  }

  async create(data: Partial<PlaylistEntity>): Promise<PlaylistEntity> {
    return super.create(data);
  }
}
