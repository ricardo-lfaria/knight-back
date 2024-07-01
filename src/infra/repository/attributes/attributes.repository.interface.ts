import { AttributeEntity } from 'src/infra/entities/attributes.entity';
import { CreateAttributeDto } from 'src/infra/dto/create-attributes.dto';

export interface AttributeRepositoryInterface {
  create(createAttributeDto: CreateAttributeDto): Promise<AttributeEntity>;
  save(weapons: AttributeEntity): Promise<AttributeEntity>;
  remove(weapons: AttributeEntity): Promise<void>;
}
