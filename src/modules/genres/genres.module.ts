import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresEntity } from './entity/genres.entity';
import { GenresController } from './controller/genres.controller';
import { GenresService } from './service/genres.service';

@Module({
  imports: [TypeOrmModule.forFeature([GenresEntity])],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
