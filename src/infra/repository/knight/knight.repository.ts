import { InjectModel } from '@nestjs/mongoose';
import { KnightEntity } from '../../entities/knight.entity';
import { KnightRepositoryInterface } from './knight.repository.interface';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateKnightDto } from '../../dto/create-knight.dto';
import { UpdateKnightDto } from '../../dto/update-knight.dto';
import { PaginationDto } from '../../dto/pagination.dto';

@Injectable()
export class KnightRepository implements KnightRepositoryInterface {
  constructor(
    @InjectModel(KnightEntity.name)
    private readonly knightModel: Model<KnightEntity>,
  ) {}

  index(paginationDto: PaginationDto): Promise<KnightEntity[]> {
    const { page = 1, limit = 10, hero } = paginationDto;
    const skip = (page - 1) * limit;
    const filter = hero !== undefined ? { hero } : {};
    return this.knightModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .populate(['weapons', 'attributes'])
      .exec();
  }
  async findOne(id: string): Promise<KnightEntity> {
    let knightFound = null;
    try {
      knightFound = await this.knightModel
        .findById(id)
        .populate(['weapons', 'attributes'])
        .exec();
    } catch (error) {
      throw new Error(`Knight id ${id} not found`);
    } finally {
      return knightFound;
    }
  }

  async create(createKnightDto: CreateKnightDto): Promise<KnightEntity> {
    const createKnight = new this.knightModel(createKnightDto);
    return createKnight.save();
  }

  async updateNickName(
    id: string,
    updateKnightDto: UpdateKnightDto,
  ): Promise<KnightEntity> {
    const { nickname } = updateKnightDto;
    return await this.knightModel
      .findByIdAndUpdate(id, { nickname }, { new: true })
      .exec();
  }

  async save(knight: KnightEntity): Promise<KnightEntity> {
    return knight.save();
  }

  async sendToHallOfHeroes(knight: KnightEntity, hero: boolean): Promise<void> {
    this.knightModel
      .updateOne({ _id: knight._id }, { hero: hero }, { new: true })
      .exec();
  }
}
