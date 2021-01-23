import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: "users"})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, unique: true })
  username: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 128, nullable: false, select: false })
  password: string;

  @Column({ length: 255, nullable: false, select: false })
  salt: string;

  @CreateDateColumn({name: 'created_at'})
  created_at: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updated_at: number;
}