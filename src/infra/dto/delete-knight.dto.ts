import { IsNotEmpty, IsBoolean } from 'class-validator';

export class DeleteKnightDto {
  @IsBoolean()
  @IsNotEmpty()
  readonly hero: boolean;
}
