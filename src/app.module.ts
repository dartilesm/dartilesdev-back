import { ConfigService } from './config/config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { ConfigModule } from './config/config.module';

const ConfigModuleRegister = ConfigModule.register({ folder: './config' })
@Module({
  imports: [
    BlogModule,
    ConfigModuleRegister,
    MongooseModule.forRootAsync({
      imports: [ConfigModuleRegister],
      useExisting: ConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
