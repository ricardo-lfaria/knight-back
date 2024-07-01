import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { WeaponsEntity } from './weapons.entity';
import { AttributeEntity } from './attributes.entity';
import { keyAttributes } from '../enums/key-attributes.enum';

@Schema()
export class KnightEntity extends Document {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ unique: true, required: true })
  nickname: string;

  @Prop({ required: true })
  birthday: number;

  @Prop({ required: true })
  keyAttribute: keyAttributes;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WeaponsEntity' }],
    required: true,
  })
  weapons: WeaponsEntity[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AttributeEntity',
    required: true,
  })
  attributes: AttributeEntity;

  @Prop({ required: true })
  hero: boolean;
}

export const KnightSchema = SchemaFactory.createForClass(KnightEntity);
