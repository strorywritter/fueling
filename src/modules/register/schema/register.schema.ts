import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegisterDocument = register & Document

@Schema()
export class register {
  
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: string;

  @Prop({ unique: true })
  vehicleNumber: string;

  @Prop({ default: 20 })
  weeklyQuato: number;
}


export const registerSchema = SchemaFactory.createForClass(register)