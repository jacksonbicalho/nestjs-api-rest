import { Injectable, Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User }  from './user.entity';
import { CreateUserDto } from './user.dto';
import { default as Valid } from '../decorator/valida'

@Injectable()
export class UserService {

  public constructor(
    @InjectRepository( User )
      public readonly userRepo: Repository<User>,

  ) {}

  @Valid(CreateUserDto)
  async create(createUserDto: CreateUserDto): Promise<User|any> {
    return await this.userRepo.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne(id: number) {
    return this.userRepo.findOne({ id });
  }

  async update(id: number, updateUserDto: CreateUserDto) {
    await this.userRepo.update(id, updateUserDto);
    return this.findOne( id );
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }
}
