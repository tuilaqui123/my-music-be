import { BaseEntity } from 'src/core/entity/base.entity';
import { PlaylistEntity } from 'src/modules/playlist/entity/playlist.entity';
import { TracksEntity } from 'src/modules/tracks/entity/tracks.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('playlist_track')
export class PlaylistTrackEntity extends BaseEntity {
  @ManyToOne(() => TracksEntity, (track) => track.playlistTrack, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'track_id' })
  track: TracksEntity;

  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.playlistTrack, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'playlist_id' })
  playlist: PlaylistEntity;

  @Column()
  track_id: string;

  @Column()
  playlist_id: string;
}
