import { Controller, Injectable } from '@nestjs/common';
import { BaseController } from 'src/core/controller/base.controller';
import { ArtistsEntity } from '../entity/artists.entity';
import { ArtistsService } from '../service/artists.service';

@Controller('artists')
@Injectable()
export class ArtistsController extends BaseController<ArtistsEntity> {
  constructor(protected readonly appService: ArtistsService) {
    super(appService);
  }
}
