import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ){}
  
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto)
  }

  @Post('login')
  // @UseGuards(LocalGuard)
  login(@Body() authpayload: AuthPayloadDto) {
    return this.authService.signin(authpayload)
  }
}
