import { BaseEntity } from 'src/core/entity/base.entity';
import { TrackArtistEntity } from 'src/relations/track_artist/track_artist.entity';
import { TrackGenreEntity } from 'src/relations/track_genre/track_genre.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('genres')
export class GenresEntity extends BaseEntity {
  @OneToMany(() => TrackGenreEntity, (at) => at.genre)
  trackGenres: TrackGenreEntity[];

  @Column({ type: 'bool', nullable: true, default: false })
  favourite: boolean;

  @Column({ type: 'text', nullable: true })
  img_thumb: string;

  @Column({ type: 'int', nullable: true })
  total_tracks: number;

  @Column({ type: 'float', nullable: true, default: 0 })
  total_minutes: number;
}
