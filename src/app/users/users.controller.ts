import { Body, ConflictException, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, UnauthorizedException } from '@nestjs/common';
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
        throw new ConflictException(error?.message ?? error)
      });
  }

  @Post('login')
  async login(@Body() user: User) {
    return this.usersService.login(user)
      .catch(error => {
        throw new UnauthorizedException(error?.message ?? error)
      });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id)
      .catch(error => {
        throw new NotFoundException(error?.message ?? error)
      });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
      .catch(error => {
        throw new NotFoundException(error?.message ?? error)
      });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id)
      .then(() => null)
      .catch(error => {
        throw new NotFoundException(error?.message ?? error)
      });
  }
}
