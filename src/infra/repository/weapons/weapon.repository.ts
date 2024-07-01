import { InjectModel } from '@nestjs/mongoose';
import { WeaponsEntity } from '../../entities/weapons.entity';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateWeapontDto } from '../../dto/create-weapon.dto';
import { WeaponsRepositoryInterface } from './weapon.repository.interface';

@Injectable()
export class WeaponRepository implements WeaponsRepositoryInterface {
  constructor(
    @InjectModel(WeaponsEntity.name)
    private readonly weaponModel: Model<WeaponsEntity>,
  ) {}

  async create(createweaponDto: CreateWeapontDto): Promise<WeaponsEntity> {
    const createweapon = new this.weaponModel(createweaponDto);
    return createweapon.save();
  }

  async save(weapon: WeaponsEntity): Promise<WeaponsEntity> {
    return weapon.save();
  }

  async remove(weapon: WeaponsEntity): Promise<void> {
    this.weaponModel.deleteOne({ _id: weapon._id }).exec();
  }
}
