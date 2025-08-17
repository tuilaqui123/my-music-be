import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { StorageService } from 'src/modules/storage/storage.service';
import { TracksEntity } from '../tracks/entity/tracks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TracksEntity]),
  ],
  controllers: [],
  providers: [UploadsService, StorageService],
  exports: [UploadsService],
})
export class UploadsModule {}
