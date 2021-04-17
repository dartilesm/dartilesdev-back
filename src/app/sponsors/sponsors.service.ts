import { SponsorDocument, SponsorSchemaName } from './schemas/sponsor.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';

@Injectable()
export class SponsorsService {
  constructor(
    @InjectModel(SponsorSchemaName) private sponsorModel: Model<SponsorDocument>,
  ) {}

  create(createSponsorDto: CreateSponsorDto) {
    return 'This action adds a new sponsor';
  }

  async findAll() {
    const allSponsors = await this.sponsorModel.find().exec()
    return allSponsors;
  }

  findOne(id: number) {
    return `This action returns a #${id} sponsor`;
  }

  update(id: number, updateSponsorDto: UpdateSponsorDto) {
    return `This action updates a #${id} sponsor`;
  }

  remove(id: number) {
    return `This action removes a #${id} sponsor`;
  }
}
