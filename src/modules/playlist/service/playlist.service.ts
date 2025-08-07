import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/service/base.service';
import { PlaylistEntity } from '../entity/playlist.entity';

@Injectable()
export class PlaylistService extends BaseService<PlaylistEntity> {}
