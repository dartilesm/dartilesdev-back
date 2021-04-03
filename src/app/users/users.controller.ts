import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<any> {
    return this.usersService.create(createUserDto).pipe(
      catchError(error => {
        throw new HttpException({
          statusCode: HttpStatus.CONFLICT,
          message: error?.message ?? error,
        }, HttpStatus.CONFLICT);
      })
    );
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

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne({id});
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
