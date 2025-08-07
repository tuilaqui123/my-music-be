import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksEntity } from './entity/tracks.entity';
import { TracksController } from './controller/tracks.controller';
import { TracksService } from './service/tracks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TracksEntity])],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
