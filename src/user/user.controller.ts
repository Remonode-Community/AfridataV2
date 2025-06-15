import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

  @Get('/:id')
  getUser(@Param('id') id:number){
    return this.userService.findById(id)
  }
}
