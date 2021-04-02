import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigOptions, EnvConfig } from './interfaces';

@Injectable()
export class ConfigService implements MongooseOptionsFactory {
  private readonly envConfig: EnvConfig;

  constructor(@Inject('CONFIG_OPTIONS') options: ConfigOptions) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.get('MONGOOSE_URI'),
    };
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
