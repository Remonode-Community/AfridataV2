import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';

@Controller('api/v2/user')
export class UserController {
  constructor(private userService: UserService){}


  @Get('/:id')
  @Serialize(UserDto)
  getUser(@Param('id') id:number){
    return this.userService.findById(id)
  }
}
