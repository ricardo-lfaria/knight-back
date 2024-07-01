import { IsBoolean, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  readonly page?: number;

  @IsOptional()
  @IsPositive()
  readonly limit?: number;

  @IsOptional()
  @IsBoolean()
  readonly hero?: boolean;
}
