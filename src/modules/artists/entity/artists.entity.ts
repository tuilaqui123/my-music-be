import { BaseEntity } from 'src/core/entity/base.entity';
import { TrackArtistEntity } from 'src/relations/track_artist/track_artist.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('artists')
export class ArtistsEntity extends BaseEntity {
  @OneToMany(() => TrackArtistEntity, (at) => at.artist)
  trackArtist: TrackArtistEntity[];

  @Column({ type: 'bool', nullable: true, default: false })
  favourite: boolean;

  @Column({ type: 'text', nullable: true })
  img_thumb: string;

  @Column({ type: 'int', nullable: true })
  total_tracks: number;
}
