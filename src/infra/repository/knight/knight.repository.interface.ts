import { PaginationDto } from '../../dto/pagination.dto';
import { CreateKnightDto } from '../../dto/create-knight.dto';
import { UpdateKnightDto } from '../../dto/update-knight.dto';
import { KnightEntity } from '../../entities/knight.entity';

export interface KnightRepositoryInterface {
  index(paginationDto: PaginationDto): Promise<KnightEntity[] | null>;
  findOne(id: string): Promise<KnightEntity | null>;
  create(createKnightDto: CreateKnightDto): Promise<KnightEntity>;
  updateNickName(
    id: string,
    updateKnightDto: UpdateKnightDto,
  ): Promise<KnightEntity | null>;
  save(knight: KnightEntity): Promise<KnightEntity>;
  sendToHallOfHeroes(knight: KnightEntity, hero: boolean): Promise<void>;
}
