import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument, UserSchemaName } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchemaName) private readonly userModel: Model<UserDocument>,
    private readonly authService: AuthService
  ) {}

  create(createUserDto: CreateUserDto): Observable<CreateUserDto> {
    return this.authService.hashPaswword(createUserDto.password).pipe(
      switchMap((passwordHashed: string) => {
        const user = {
          ...createUserDto,
          password: passwordHashed
        }
        const createdUser = new this.userModel(user);

        return from(createdUser.save()).pipe(
          map(() => {
            const { password, ...response } = user
            return response
          }),
          catchError(err => throwError(err?.errors ?? err))
        )
      }),
      catchError(err => {
        const errorName = Object.keys(createUserDto)
          .find(key => err[key])
        return throwError(err[errorName] ?? err)
      })
    )
  }

  async login(user: User): Promise<User | any> {
    const currentUser = await this.findOne(user.email)
    const isPasswordValid = await this.authService.comparePassword(user?.password, currentUser?.password)
    return isPasswordValid && this.authService.login(user)
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string) {
    return await this.userModel.findOne({ email }).exec()
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
