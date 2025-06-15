import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service'
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
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
    const token = await this.validateUser(authPayloadDto)
    return { id: user?.id, token: token }
  }

  async validateUser(authPayload: AuthPayloadDto) {
    const { email, password } = authPayload
    console.log(email, password)
    const user = await this.userService.findByEmail(email)

    if(!user) {
      throw new BadRequestException('User not found')
    }

    console.log(user.password)
    // console.log(user)
    const isPasswordValid = await compare(password, user.password)
    if(!isPasswordValid) {
      throw new BadRequestException("Invalid credentials")
    }
    console.log(isPasswordValid)

    const payLoad = { sub: user.id, email:user.email }
    return this.jwtService.sign(payLoad)
  }
}
