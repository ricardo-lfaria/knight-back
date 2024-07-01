import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateAttributeDto {
  @IsNumber()
  @IsNotEmpty()
  strenght: number;

  @IsNumber()
  @IsNotEmpty()
  dexterity: number;

  @IsNumber()
  @IsNotEmpty()
  constitution: number;

  @IsNumber()
  @IsNotEmpty()
  intelligence: number;

  @IsNumber()
  @IsNotEmpty()
  wisdom: number;

  @IsNumber()
  @IsNotEmpty()
  charisma: number;
}
