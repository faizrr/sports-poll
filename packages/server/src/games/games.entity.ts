import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm'

import { Sport, State } from './enums'
import { Vote } from '../votes/votes.entity'

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  awayName: string

  @Column()
  groupName: string

  @Column()
  homeName: string

  @Column()
  name: string

  @Column({ type: 'enum', enum: Sport })
  sport: string

  @Column()
  country: string

  @Column({ type: 'enum', enum: State })
  state: string

  @CreateDateColumn()
  createdAt: string

  @OneToMany(type => Vote, vote => vote.user)
  votes: Vote[]
}
