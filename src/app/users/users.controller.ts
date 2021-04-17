import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.create(createUserDto)
      .catch(error => {
        throw new HttpException({
          statusCode: HttpStatus.CONFLICT,
          message: error?.message ?? error,
        }, HttpStatus.CONFLICT);
      });
  }

  @Post('login')
  login(@Body() user: User) {
    return this.usersService.login(user)
      .catch(error => {
        throw new HttpException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: error?.message ?? error,
        }, HttpStatus.UNAUTHORIZED);
      });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id)
      .catch(error => {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error?.message ?? error,
        }, HttpStatus.NOT_FOUND);
      });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
      .catch(error => {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error?.message ?? error,
        }, HttpStatus.NOT_FOUND);
      });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
      .then(() => null)
      .catch(error => {
        throw new HttpException({
          statusCode: HttpStatus.NOT_FOUND,
          message: error?.message ?? error,
        }, HttpStatus.NOT_FOUND);
      });
  }
}
