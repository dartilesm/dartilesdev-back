import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class User {

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  username?: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password?: string;
}

export type UserDocument = User & Document & UserMethods;
export const UserSchemaName = 'User'

export const UserSchema = SchemaFactory.createForClass(
  User
)

interface UserMethods {
  toCustomJSON: () => User
}

UserSchema.method('toCustomJSON', function() {
  const obj = this.toObject()
  const { __v, _id, ...response } = obj
  return { id: _id, ...response }
})