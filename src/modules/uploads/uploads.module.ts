import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { StorageService } from 'src/modules/storage/storage.service';

@Module({
  imports: [],
  controllers: [],
  providers: [UploadsService, StorageService],
  exports: [UploadsService],
})
export class UploadsModule {}
