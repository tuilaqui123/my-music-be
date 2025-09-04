import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/service/base.service';
import { TracksEntity } from '../entity/tracks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService extends BaseService<TracksEntity> {
  constructor(
    @InjectRepository(TracksEntity)
    repository: Repository<TracksEntity>,
  ) {
    super(repository);
  }
}
