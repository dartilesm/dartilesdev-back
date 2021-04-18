import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from '../app/users/schemas/user.schema'

@Injectable()
export class AuthService {
  constructor (private jwtService: JwtService) {}

  login (user: User): Promise<any> {
    const response = {
      access_token: this.jwtService.sign(user)
    }
    return Promise.resolve(response)
  }

  hashPassword (password: string): Promise<string> {
    return bcrypt.hash(password, 12)
      .then(passwordHashed => passwordHashed)
      .catch(() => { throw new Error('An password need to be provided') })
  }

  async comparePassword (newPassword: string, passwordHash: string): Promise<any | boolean> {
    return bcrypt.compare(newPassword, passwordHash)
      .then(isPasswordValid => isPasswordValid || (() => { throw new Error('Invalid credentials') })())
      .catch(() => { throw new Error('Invalid credentials') })
  }
}
