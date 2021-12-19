import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VerificationDocument = Verification & Document;

@Schema()
export class Verification {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  domain: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  status: number;
}

export const VerificationSchema = SchemaFactory.createForClass(Verification);
