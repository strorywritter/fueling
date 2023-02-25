import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StationDocument = Station & Document

@Schema()
export class Station {
  
  @Prop()
  name: string;

  @Prop()
  district: string;

  @Prop()
  stock: number;

  @Prop()
  manager: string;
}


export const StationSchema = SchemaFactory.createForClass(Station)