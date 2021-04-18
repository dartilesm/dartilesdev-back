import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AuthService } from 'src/auth/auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserDocument, UserSchemaName } from './schemas/user.schema'

@Injectable()
export class UsersService {
  private readonly notFoundErrMsg = 'The user does not exist'
  private readonly invalidCredentialsErrMsg = 'Invalid credentials'

  constructor (
    @InjectModel(UserSchemaName) private readonly userModel: Model<UserDocument>,
    private readonly authService: AuthService
  ) {}

  private formatResponse (userDocument: Promise<UserDocument>, customError?: string) {
    const handleError = (err?: any) => { throw new Error(customError ?? err) }
    const response = userDocument
      .then((user: UserDocument) => {
        if (!user) handleError()
        const { password, ...userData } = user.toCustomJSON()
        return userData
      })
      .catch(handleError)
    return response
  }

  async create (createUserDto: CreateUserDto): Promise<User> {
    const passwordHashed = await this.authService.hashPassword(createUserDto.password)
    const userCreated = this.formatResponse(new this.userModel({
      ...createUserDto,
      password: passwordHashed
    }).save())
    return Promise.resolve(userCreated)
  }

  async login (user: User): Promise<User> {
    const currentUser = await this.userModel.findOne({ email: user.email }).exec()
    const currentUserFormatted = await this.formatResponse(Promise.resolve(currentUser), this.invalidCredentialsErrMsg)
    const isPasswordValid = await this.authService.comparePassword(user?.password, currentUser?.password)
    return isPasswordValid && this.authService.login(currentUserFormatted)
  }

  findOneById (id: string): Promise<User> {
    return this.formatResponse(this.userModel.findById(id).exec(), this.notFoundErrMsg)
  }

  async update (id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const dataToUpdate = {
      ...updateUserDto,
      ...updateUserDto.password && { password: await this.authService.hashPassword(updateUserDto.password) }
    }
    const currentUser = await this.formatResponse(this.userModel.findByIdAndUpdate(id, dataToUpdate).exec(), this.notFoundErrMsg)
    const { password, ...updatedData } = dataToUpdate
    const updatedUser: User = {
      ...currentUser,
      ...updatedData
    }
    return updatedUser
  }

  remove (id: string): Promise<User> {
    return this.formatResponse(this.userModel.findByIdAndRemove(id).exec(), this.notFoundErrMsg)
  }
}
