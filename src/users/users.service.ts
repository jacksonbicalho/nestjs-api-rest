import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Valid } from '../decorators'
import { CreateUserDto, FindOneParamsDTO } from './users.dto';
import { User }  from './user.entity';
import { Cryptography } from '../libs/cryptography'

@Injectable()
export class UsersService {

  public constructor(
    @InjectRepository( User )
      public readonly usersRepo: Repository<User>,
      public readonly cryptography: Cryptography,
  ) { }

  @Valid(CreateUserDto)
  async create(createUserDto: CreateUserDto): Promise<User|any> {
    const encrypt = this.cryptography.encrypt(createUserDto.password)
    createUserDto.password = encrypt.text
    createUserDto.salt = encrypt.salt
    return await this.usersRepo.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepo.find();
  }

  async findByUsername(username: string) {
    return await this.usersRepo.findOne({
      "username": username
    },{
      "select": ['username', 'password', 'salt' ]
    });
  }

  @Valid(FindOneParamsDTO)
  async findOne(id: number) {
    return await this.usersRepo.findOne( { id } );
  }

  async update(id: number, updateUserDto: CreateUserDto) {
    await this.usersRepo.update(id, updateUserDto);
    return this.findOne( id );
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepo.delete(id);
  }
}
