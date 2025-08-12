import { BaseEntity } from 'src/core/entity/base.entity';
import { PlaylistTrackEntity } from 'src/relations/playlist_track/playlist_track.entity';
import { TrackArtistEntity } from 'src/relations/track_artist/track_artist.entity';
import { TrackGenreEntity } from 'src/relations/track_genre/track_genre.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('tracks')
export class TracksEntity extends BaseEntity {
  @OneToMany(() => TrackArtistEntity, (at) => at.track)
  trackArtist: TrackArtistEntity[];

  @OneToMany(() => TrackGenreEntity, (ag) => ag.genre)
  trackGenre: TrackGenreEntity[];

  @OneToMany(() => PlaylistTrackEntity, (pt) => pt.playlist)
  playlistTrack: PlaylistTrackEntity[];

  @Column({ type: 'text', nullable: true })
  link: string;

  @Column({ type: 'text', nullable: false })
  file_path: string;

  @Column({ type: 'bool', nullable: true, default: false })
  favourite: boolean;

  @Column({ type: 'text', nullable: true })
  img_thumb: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  streaming_time: number;

  @Column({ type: 'float', nullable: true, default: 0 })
  total_minutes: number;
}
