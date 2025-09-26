import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service'
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { compare } from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { email } = createUserDto
    const user = await this.userService.findByEmail(email)

    if(user) throw new BadRequestException('User already exist')

    const newUser = await this.userService.create(createUserDto) 

    return newUser
  }

  async signin(authPayloadDto: AuthPayloadDto) {
    const user = await this.userService.findByEmail(authPayloadDto.email)
    if (!user) {
      throw new UnauthorizedException()
    }
    const payload = { sub: user.id, email:user.email }
    const token = await this.validateUser(authPayloadDto)
    return {
      id: user?.id, 
      token: token,
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' })
    }
  }

  // async signout(userId: number){
  //   const logOutUser = this.userService.findById(userId)
  //   return logOutUser
  // }

  async refreshToken(authPayloadDto: AuthPayloadDto) {
    const user = await this.userService.findByEmail(authPayloadDto.email)
    if (!user) {
      throw new UnauthorizedException()
    }
    const payload = { sub: user.id, email:user.email }
    const token = await this.validateUser(authPayloadDto)
    return {
      id: user?.id, 
      accessToken: this.jwtService.sign(payload)
    }
  }

  async validateUser(authPayload: AuthPayloadDto) {
    const { email, password } = authPayload
    const user = await this.userService.findByEmail(email)

    if(!user) {
      throw new NotFoundException('User not found')
    }

    const isPasswordValid = await compare(password, user.password)
    if(!isPasswordValid) {
      throw new BadRequestException("Invalid credentials")
    }

    const payLoad = { sub: user.id, email:user.email }
    return this.jwtService.sign(payLoad)
  }
}
