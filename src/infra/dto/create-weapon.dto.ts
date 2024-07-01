import { IsString, IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateWeapontDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  mod: number;

  @IsString()
  @IsNotEmpty()
  attr: string;

  @IsBoolean()
  @IsNotEmpty()
  equipped: boolean;
}
