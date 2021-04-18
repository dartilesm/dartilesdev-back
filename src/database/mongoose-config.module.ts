import { Module } from '@nestjs/common'
import { MongooseConfigService } from './mongoose-config.service'

@Module({
  providers: [MongooseConfigService],
  exports: [MongooseConfigService]
})
export class MongooseConfigModule { }
