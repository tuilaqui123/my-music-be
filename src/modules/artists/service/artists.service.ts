import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistsEntity } from '../entity/artists.entity';
import { BaseService } from 'src/core/service/base.service';

@Injectable()
export class ArtistsService extends BaseService<ArtistsEntity> {
  constructor(
    @InjectRepository(ArtistsEntity)
    private readonly artistsRepository: Repository<ArtistsEntity>,
  ) {
    super(artistsRepository);
  }

  async create(data: Partial<ArtistsEntity>): Promise<ArtistsEntity> {
    return super.create(data);
  }
}
