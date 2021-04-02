import { PartialType } from '@nestjs/mapped-types';
import { CreateSponsorDto } from './create-sponsor.dto';

export class UpdateSponsorDto extends PartialType(CreateSponsorDto) {}
