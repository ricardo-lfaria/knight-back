import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateKnightDto {
  @IsString()
  @IsNotEmpty()
  readonly nickname: string;
}
