import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UploadsService } from './modules/uploads/uploads.service';
import { UploadsDto } from './modules/uploads/uploads.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly uploadService: UploadsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/upload')
  uploadLink(@Body() body): any {
    return this.uploadService.uploads(body);
  }
}
