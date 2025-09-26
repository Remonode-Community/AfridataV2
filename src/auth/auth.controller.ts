import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/user/dto/user.dto';
import { JwtGuard } from './guards/jwt.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth';


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

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user)
  }

  // @Post('logout')
  // @UseGuards(JwtGuard)
  // logout(userId: number) {
  //   return this.authService.signout(userId)
  // }

}
