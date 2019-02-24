import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm'

import { User } from '../users/users.entity'
import { Game } from '../games/games.entity'

import { VoteType } from './voteTypes'

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'enum', enum: VoteType })
  type: string

  @ManyToOne(type => User, user => user.votes)
  user: User

  @ManyToOne(type => Game, game => game.votes)
  game: Game
}
