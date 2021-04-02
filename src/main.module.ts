import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from './app/app.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './database/mongoose-config.service';
import { MongooseConfigModule } from './database/mongoose-config.module';

const ENVIRONMENT = `${process.env.NODE_ENV}`.replace(/^((?!(development|production)).)*$/g, 'development')

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `./config/${ENVIRONMENT}.env`,
    }),
    MongooseModule.forRootAsync({
      imports: [MongooseConfigModule],
      useExisting: MongooseConfigService,
    }),
    AppModule,
  ]
})
export class MainModule {}
