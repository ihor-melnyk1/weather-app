import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Weather extends Document {
  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  lon: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  state?: string;

  @Prop()
  temp: number;

  @Prop({ type: Object })
  weather: object;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
