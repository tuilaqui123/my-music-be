import { Controller, Injectable } from '@nestjs/common';
import { BaseController } from 'src/core/controller/base.controller';
import { PlaylistEntity } from '../entity/playlist.entity';
import { PlaylistService } from '../service/playlist.service';

@Controller('playlist')
@Injectable()
export class PlaylistController extends BaseController<PlaylistEntity> {
  constructor(protected readonly appService: PlaylistService) {
    super(appService);
  }
}
