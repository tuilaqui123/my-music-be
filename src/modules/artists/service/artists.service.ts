import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/service/base.service';
import { ArtistsEntity } from '../entity/artists.entity';

@Injectable()
export class ArtistsService extends BaseService<ArtistsEntity> {}
