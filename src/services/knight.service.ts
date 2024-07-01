import { GetKnightResponseDto } from './../infra/dto/get-knight.response.dto';
import { PaginationDto } from 'src/infra/dto/pagination.dto';
import { KnightEntity } from 'src/infra/entities/knight.entity';
import { KnightRepositoryInterface } from '../infra/repository/knight/knight.repository.interface';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateKnightDto } from 'src/infra/dto/update-knight.dto';
import { CreateKnightDto } from 'src/infra/dto/create-knight.dto';
import { WeaponsRepositoryInterface } from 'src/infra/repository/weapons/weapon.repository.interface';
import { AttributeRepositoryInterface } from 'src/infra/repository/attributes/attributes.repository.interface';
import { attributeModifier } from 'src/common/utils/attribute-modifier';

@Injectable()
export class KnightService {
  constructor(
    @Inject('KnightRepositoryInterface')
    private readonly knightRepository: KnightRepositoryInterface,
    @Inject('WeaponsRepositoryInterface')
    private readonly weaponsRepository: WeaponsRepositoryInterface,
    @Inject('AttributesRepositoryInterface')
    private readonly attributesRepository: AttributeRepositoryInterface,
  ) {}

  async index(paginationDto: PaginationDto): Promise<GetKnightResponseDto[]> {
    const knights = await this.knightRepository.index(paginationDto);
    const finalKnights = knights.map((knight) => {
      const item = this.getKnight(knight);
      return item;
    });
    console.log(finalKnights);
    return finalKnights;
  }

  async findOne(id: string): Promise<KnightEntity> {
    const knight = await this.knightRepository.findOne(id);
    if (!knight) {
      throw new NotFoundException(`Knight with ID ${id} not found`);
    }
    const finalKnight = this.getKnight(knight);
    return knight;
  }

  async create({
    weapons,
    attributes,
    ...createKnightDto
  }: CreateKnightDto): Promise<KnightEntity> {
    try {
      const knightWeapons = await Promise.all(
        weapons.map(async (weapon) => {
          const item = await this.weaponsRepository.create(weapon);
          return item;
        }),
      );
      const knightAttributes =
        await this.attributesRepository.create(attributes);
      console.log(knightAttributes, knightWeapons);
      const knight = await this.knightRepository.create({
        ...createKnightDto,
        weapons: knightWeapons,
        attributes: knightAttributes,
      });
      console.log(knight);
      return knight;
    } catch (error) {
      throw new BadRequestException(
        `Not possible to create the knight: ${error.message}`,
      );
    }
  }

  async updateNickName(
    id: string,
    updateKnightDto: UpdateKnightDto,
  ): Promise<KnightEntity> {
    try {
      const updatedEntity = await this.knightRepository.updateNickName(
        id,
        updateKnightDto,
      );
      if (!updatedEntity) {
        throw new NotFoundException(`Knight with ID ${id} not found`);
      }
      return this.knightRepository.save(updatedEntity);
    } catch (error) {
      throw new BadRequestException(
        `Not possible to create the knight: ${error.message}`,
      );
    }
  }

  async sendToHallOfHeroes(id: string): Promise<void> {
    const knight = await this.knightRepository.findOne(id);
    if (!knight) {
      throw new NotFoundException('Knight not found');
    }
    await this.knightRepository.sendToHallOfHeroes(knight, true);
  }

  private calculateAttack(knight: KnightEntity): number {
    const attr = attributeModifier(knight.attributes[knight.keyAttribute]);
    console.log('knight', knight)
    console.log('attr', attr);
    const equippedWeapon = knight.weapons.find((weapon) => {
      weapon.equipped;
    });
    const equippedWeaponMod = equippedWeapon ? equippedWeapon.mod : 0;
    console.log('equippedWeapon', equippedWeapon);
    console.log('equippedWeaponMod', equippedWeaponMod);
    const attack = 10 + attr + equippedWeaponMod;
    return attack;
  }

  private calculateExp(knight: KnightEntity): number {
    let exp = 0;
    if (knight.birthday >= 7) {
      exp = Math.floor((knight.birthday - 7) * Math.pow(22, 1.45));
    }
    return exp;
  }

  private getKnight(knight: KnightEntity): GetKnightResponseDto {
    const weaponsCount = knight.weapons.length;
    const attack = this.calculateAttack(knight);
    const exp = this.calculateExp(knight);
    const finalKnight: GetKnightResponseDto = {
      _id: String(knight._id),
      name: knight.name,
      birthday: knight.birthday,
      weapons: weaponsCount,
      keyAttribute: knight.keyAttribute,
      attack,
      exp,
      hero: knight.hero,
    };
    return finalKnight;
  }
}
