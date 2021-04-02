import { SchemaFactory, Schema } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Sponsor {
  name: string;
}

export type SponsorDocument = Sponsor & Document;
export const SponsorSchemaName = 'Sponsor'

export const SponsorSchema = SchemaFactory.createForClass(
  Sponsor
)
