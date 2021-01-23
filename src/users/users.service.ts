import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User }  from './user.entity';
import { CreateUserDto } from './users.dto';
import { Valid, FindOneParams } from '../decorators'
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

@Injectable()
export class UsersService {

  private ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)

  private IV_LENGTH = 16; // For AES, this is always 16

  public constructor(
    @InjectRepository( User )
      public readonly userRepo: Repository<User>,
  ) { }

  @Valid(CreateUserDto)
  async create(createUserDto: CreateUserDto): Promise<User|any> {
    const encrypt = this.encrypt(createUserDto.password)
    createUserDto.password = encrypt.password
    createUserDto.salt = encrypt.salt
    return await this.userRepo.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findByUsername(username: string) {
    return await this.userRepo.findOne({
      "username": username
    },{
      "select": ['username', 'password', 'salt' ]
    });
  }

  @Valid(FindOneParams)
  async findOne(id: number) {
    return await this.userRepo.findOne( { id } );
  }

  async update(id: number, updateUserDto: CreateUserDto) {
    await this.userRepo.update(id, updateUserDto);
    return this.findOne( id );
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }

  private algorithm = 'aes-256-cbc';
  encrypt(text: string){

    console.log(this.ENCRYPTION_KEY)

    let iv = randomBytes(this.IV_LENGTH);
    let cipher = createCipheriv(this.algorithm, Buffer.from(this.ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {salt: iv.toString('hex'),   password: encrypted.toString('hex')};
  }
  decrypt(text: string) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = createDecipheriv(this.algorithm, Buffer.from(this.ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

}
