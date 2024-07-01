import { WeaponsEntity } from '../../entities/weapons.entity';
import { CreateWeapontDto } from '../../dto/create-weapon.dto';

export interface WeaponsRepositoryInterface {
  create(createWeaponDto: CreateWeapontDto): Promise<WeaponsEntity>;
  save(weapons: WeaponsEntity): Promise<WeaponsEntity>;
  remove(weapons: WeaponsEntity): Promise<void>;
}
