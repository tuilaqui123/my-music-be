import { BaseEntity } from 'src/core/entity/base.entity';
import { GenresEntity } from 'src/modules/genres/entity/genres.entity';
import { TracksEntity } from 'src/modules/tracks/entity/tracks.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('track_genre')
export class TrackGenreEntity extends BaseEntity {
  @ManyToOne(() => TracksEntity, (track) => track.trackGenre, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'track_id' })
  track: TracksEntity;

  @ManyToOne(() => GenresEntity, (genre) => genre.trackGenres, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'genre_id' })
  genre: GenresEntity;

  @Column()
  track_id: string;

  @Column()
  genre_id: string;
}
