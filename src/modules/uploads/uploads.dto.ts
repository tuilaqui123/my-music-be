export class UploadsDto {
  track_name: string;
  link: string;
  artist: { id: number; name: string }[];
  genres: { id: number; name: string }[];
}
