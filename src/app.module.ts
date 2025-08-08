import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksModule } from './modules/tracks/tracks.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { GenresModule } from './modules/genres/genres.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { UploadsService } from './modules/uploads/uploads.service';
import { UploadsModule } from './modules/uploads/uploads.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'my_music',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TracksModule,
    PlaylistModule,
    GenresModule,
    ArtistsModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
