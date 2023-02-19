import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConsumerDocument = Request & Document

@Schema()
export class FuelRequest {
  
  @Prop()
  amount: number;

  @Prop()
  station: string
  
  @Prop()
  date: Date

  @Prop()
  vehicleNumber: string

  @Prop()
  status: string
}


export const RequestSchema = SchemaFactory.createForClass(FuelRequest)