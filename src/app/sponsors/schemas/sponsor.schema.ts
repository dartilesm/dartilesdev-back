import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Sponsor {
  @Prop()
  name: string;
}

export type SponsorDocument = Sponsor & Document;
export const SponsorSchemaName = 'Sponsor'

export const SponsorSchema = SchemaFactory.createForClass(
  Sponsor
)
