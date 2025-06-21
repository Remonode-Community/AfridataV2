import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';

@Controller('user')
@Serialize(UserDto)
export class UserController {
  constructor(private userService: UserService){}


  @Get('/:id')
  getUser(@Param('id') id:number){
    return this.userService.findById(id)
  }
}
