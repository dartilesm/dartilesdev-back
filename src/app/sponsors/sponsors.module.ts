import { SponsorSchema, SponsorSchemaName } from './schemas/sponsor.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { SponsorsService } from './sponsors.service';
import { SponsorsController } from './sponsors.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SponsorSchemaName,
        schema: SponsorSchema
      }
    ])
  ],
  controllers: [SponsorsController],
  providers: [SponsorsService]
})
export class SponsorsModule {}
