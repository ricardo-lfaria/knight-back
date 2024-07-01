import { Module } from '@nestjs/common';
import { AttributesRepository } from './repository/attributes/atributtes.repository';
import { WeaponRepository } from './repository/weapons/weapon.repository';
import { KnightRepository } from './repository/knight/knight.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightEntity, KnightSchema } from './entities/knight.entity';
import { AttributeEntity, AttributeSchema } from './entities/attributes.entity';
import { WeaponsEntity, WeaponsSchema } from './entities/weapons.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: KnightEntity.name, schema: KnightSchema },
      { name: AttributeEntity.name, schema: AttributeSchema },
      { name: WeaponsEntity.name, schema: WeaponsSchema },
    ]),
  ],
  providers: [
    { provide: 'KnightRepositoryInterface', useClass: KnightRepository },
    {
      provide: 'AttributesRepositoryInterface',
      useClass: AttributesRepository,
    },
    { provide: 'WeaponsRepositoryInterface', useClass: WeaponRepository },
  ],
  exports: [
    'KnightRepositoryInterface',
    'AttributesRepositoryInterface',
    'WeaponsRepositoryInterface',
  ],
})
export class InfraModule {}
