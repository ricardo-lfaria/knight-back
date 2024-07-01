import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsEnum,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { WeaponsEntity } from '../entities/weapons.entity';
import { AttributeEntity } from '../entities/attributes.entity';
import { keyAttributes } from '../enums/key-attributes.enum';

export class CreateKnightDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly nickname: string;

  @IsNumber()
  @IsNotEmpty()
  readonly birthday: number;

  @IsEnum(keyAttributes)
  @IsNotEmpty()
  readonly keyAttribute: keyAttributes;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WeaponsEntity)
  @IsNotEmpty()
  readonly weapons?: WeaponsEntity[];

  @ValidateNested()
  @Type(() => AttributeEntity)
  @IsNotEmpty()
  readonly attributes?: AttributeEntity;

  @IsBoolean()
  @IsNotEmpty()
  readonly hero: boolean;
}
