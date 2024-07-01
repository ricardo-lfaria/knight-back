import { AttributeEntity } from './../../entities/attributes.entity';
import { CreateAttributeDto } from './../../dto/create-attributes.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AttributeRepositoryInterface } from './attributes.repository.interface';

@Injectable()
export class AttributesRepository implements AttributeRepositoryInterface {
  constructor(
    @InjectModel(AttributeEntity.name)
    private readonly attributeModel: Model<AttributeEntity>,
  ) {}

  async create(
    createAttributetDto: CreateAttributeDto,
  ): Promise<AttributeEntity> {
    const createAttributes = new this.attributeModel(createAttributetDto);
    return createAttributes.save();
  }

  async save(attributes: AttributeEntity): Promise<AttributeEntity> {
    return attributes.save();
  }

  async remove(attributes: AttributeEntity): Promise<void> {
    this.attributeModel.deleteOne({ _id: attributes._id }).exec();
  }
}
