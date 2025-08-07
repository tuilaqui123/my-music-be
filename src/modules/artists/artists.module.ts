import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsEntity } from './entity/artists.entity';
import { ArtistsController } from './controller/artists.controller';
import { ArtistsService } from './service/artists.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistsEntity])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
