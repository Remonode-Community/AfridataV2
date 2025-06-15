import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private UserRepo: Repository<User>){}

  async create(createUserDto: CreateUserDto){
    const user = this.UserRepo.create(createUserDto)
    return await this.UserRepo.save(user)
  }

  async findByEmail(email: string) {
    return await this.UserRepo.findOne({
      where: {email}
    })
  }

  async findById(id: number) {
    return await this.UserRepo.findOne({
      where: {id}
    })
  }
}
