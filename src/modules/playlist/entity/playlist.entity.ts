import { BaseEntity } from 'src/core/entity/base.entity';
import { PlaylistTrackEntity } from 'src/relations/playlist_track/playlist_track.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('playlist')
export class PlaylistEntity extends BaseEntity {
  @OneToMany(() => PlaylistTrackEntity, (pt) => pt.playlist)
  playlistTrack: PlaylistTrackEntity[];

  @Column({ type: 'bool', nullable: true, default: false })
  favourite: boolean;

  @Column({ type: 'text', nullable: true })
  type: string;

  @Column({ type: 'text', nullable: true })
  img_thumb: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  streaming_time: number;

  @Column({ type: 'float', nullable: true, default: 0 })
  total_minutes: number;
}
