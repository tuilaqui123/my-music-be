import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from './entity/playlist.entity';
import { PlaylistController } from './controller/playlist.controller';
import { PlaylistService } from './service/playlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
