import { BaseEntity } from 'src/core/entity/base.entity';
import { ArtistsEntity } from 'src/modules/artists/entity/artists.entity';
import { TracksEntity } from 'src/modules/tracks/entity/tracks.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('track_artist')
export class TrackArtistEntity extends BaseEntity {
  @ManyToOne(() => TracksEntity, (track) => track.trackArtist, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'track_id' })
  track: TracksEntity;

  @ManyToOne(() => ArtistsEntity, (artist) => artist.trackArtist, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'artist_id' })
  artist: ArtistsEntity;

  @Column()
  track_id: string;

  @Column()
  artist_id: string;
}
