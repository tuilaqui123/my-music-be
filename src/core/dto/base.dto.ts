export abstract class BaseDto {
  id?: string;
  name?: string;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  description?: string;
}
