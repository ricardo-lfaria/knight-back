import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class WeaponsEntity extends Document {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ required: true })
  mod: number;

  @Prop({ required: true })
  attr: string;

  @Prop({ required: true })
  equipped: boolean;
}

export const WeaponsSchema = SchemaFactory.createForClass(WeaponsEntity);
