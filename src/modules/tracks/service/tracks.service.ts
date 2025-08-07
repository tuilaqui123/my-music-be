import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/service/base.service';
import { TracksEntity } from '../entity/tracks.entity';

@Injectable()
export class TracksService extends BaseService<TracksEntity> {}
