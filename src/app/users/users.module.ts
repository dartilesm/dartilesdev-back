import { UserSchema, UserSchemaName } from './schemas/user.schema';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import * as MongooseUniqueValidator from 'mongoose-unique-validator'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: UserSchemaName,
        useFactory: () => {
          const schema = UserSchema
          schema.plugin(MongooseUniqueValidator, { message: '{PATH} already in use' })
          return schema
        }
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
