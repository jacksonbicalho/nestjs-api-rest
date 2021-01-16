import { Injectable, Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User }  from './user.entity';
import { UserDto } from './user.dto';
import { default as Valida } from '../validation/valida';

@Injectable()
export class UserService {

  public constructor(
    @InjectRepository( User )
      public readonly userRepo: Repository<User>,

  ) {}

  async create(createUserDto: UserDto): Promise<User|any> {

    const valid = new Valida(createUserDto, UserDto);

    return await this.userRepo.save(createUserDto)
     .catch(() => valid.getErrors() );
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne(id: number) {
    return this.userRepo.findOne({ id });
  }

  async update(id: number, updateUserDto: UserDto) {
    await this.userRepo.update(id, updateUserDto);
    return this.findOne( id );
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }
}
