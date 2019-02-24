import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm'

import { Vote } from '../votes/votes.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  login: string

  @Column()
  passwordHash: string

  @CreateDateColumn()
  createdAt: string

  @OneToMany(type => Vote, vote => vote.user)
  votes: Promise<Vote[]>
}
