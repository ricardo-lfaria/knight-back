import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AttributeEntity extends Document {
  @Prop({ required: true })
  strenght: number;

  @Prop({ required: true })
  dexterity: number;

  @Prop({ required: true })
  constitution: number;

  @Prop({ required: true })
  intelligence: number;

  @Prop({ required: true })
  wisdom: number;

  @Prop({ required: true })
  charisma: number;
}

export const AttributeSchema = SchemaFactory.createForClass(AttributeEntity);
