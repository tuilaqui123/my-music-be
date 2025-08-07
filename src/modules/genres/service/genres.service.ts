import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/service/base.service';
import { GenresEntity } from '../entity/genres.entity';

@Injectable()
export class GenresService extends BaseService<GenresEntity> {}
