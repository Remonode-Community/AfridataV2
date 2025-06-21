import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  getUser(@Param('id') id:number){
    return this.userService.findById(id)
  }
}
