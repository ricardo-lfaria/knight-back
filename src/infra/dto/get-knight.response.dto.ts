import { IsString, IsNumber, IsEnum, IsBoolean } from 'class-validator';
import { keyAttributes } from '../enums/key-attributes.enum';

export class GetKnightResponseDto {
  @IsString()
  readonly _id: string;

  @IsString()
  readonly name: string;

  @IsNumber()
  readonly birthday: number;

  @IsNumber()
  readonly weapons: number;

  @IsEnum(keyAttributes)
  readonly keyAttribute: keyAttributes;

  @IsNumber()
  readonly attack: number;

  @IsNumber()
  readonly exp: number;

  @IsBoolean()
  readonly hero: boolean;
}
