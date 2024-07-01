import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateKnightDto } from 'src/infra/dto/create-knight.dto';
import { PaginationDto } from 'src/infra/dto/pagination.dto';
import { UpdateKnightDto } from 'src/infra/dto/update-knight.dto';
import { KnightService } from 'src/services/knight.service';

@Controller('knights')
export class KnightController {
  constructor(private readonly knightService: KnightService) {}

  @Get()
  async index(@Query() paginationDto: PaginationDto) {
    console.log(paginationDto);
    return this.knightService.index(paginationDto);
  }

  @Get(':id')
  async getKnight(@Param('id') id: string) {
    return this.knightService.findOne(id);
  }

  @Post()
  async createKnight(
    @Body() createknightDto: CreateKnightDto,
  ): Promise<{ message: string }> {
    this.knightService.create(createknightDto);
    return { message: 'Knight succesfully created' };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateKnight(
    @Param('id') id: string,
    @Body() updateknightDto: UpdateKnightDto,
  ) {
    return this.knightService.updateNickName(id, updateknightDto);
  }

  @Patch(':id/hall')
  @HttpCode(HttpStatus.OK)
  async removeKnight(@Param('id') id: string): Promise<{ message: string }> {
    await this.knightService.sendToHallOfHeroes(id);
    return { message: 'Knight succesfully sent to the Hall of Heroes' };
  }
}
