import { Controller, Injectable } from '@nestjs/common';
import { BaseController } from 'src/core/controller/base.controller';
import { TracksEntity } from '../entity/tracks.entity';
import { TracksService } from '../service/tracks.service';

@Controller('tracks')
@Injectable()
export class TracksController extends BaseController<TracksEntity> {
  constructor(protected readonly appService: TracksService) {
    super(appService);
  }
}
