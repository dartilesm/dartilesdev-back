import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppModule } from './app/app.module'
import { CoreModule } from './core/core.module'
import { MongooseConfigModule } from './database/mongoose-config.module'
import { MongooseConfigService } from './database/mongoose-config.service'
import { AuthModule } from './auth/auth.module'

const ENVIRONMENT = `${process.env.NODE_ENV}`.replace(/^((?!(development|production)).)*$/g, 'development')

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `./config/${ENVIRONMENT}.env`
    }),
    MongooseModule.forRootAsync({
      imports: [MongooseConfigModule],
      useExisting: MongooseConfigService
    }),
    AppModule,
    CoreModule,
    AuthModule
  ]
})
export class MainModule {}
