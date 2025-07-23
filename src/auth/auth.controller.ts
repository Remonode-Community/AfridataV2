import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/user/dto/user.dto';


@Controller('api/v2/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ){}
  
  @Post('signup')
  @Serialize(UserDto)
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto)
  }

  @Post('login')
  // @UseGuards(LocalGuard)
  login(@Body() authpayload: AuthPayloadDto) {
    return this.authService.signin(authpayload)
  }
}
