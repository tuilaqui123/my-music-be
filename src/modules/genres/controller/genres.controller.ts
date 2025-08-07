import { Controller, Injectable } from '@nestjs/common';
import { BaseController } from 'src/core/controller/base.controller';
import { GenresEntity } from '../entity/genres.entity';
import { GenresService } from '../service/genres.service';

@Controller('genres')
@Injectable()
export class GenresController extends BaseController<GenresEntity> {
  constructor(protected readonly appService: GenresService) {
    super(appService);
  }
}
