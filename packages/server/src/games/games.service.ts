import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Game } from './games.entity'
import { User } from '../users/users.entity'

import { Vote } from '../votes/votes.entity'

import { Sport } from './enums'

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gamesRepository: Repository<Game>,
    @InjectRepository(Vote)
    private readonly votesRepository: Repository<Vote>
  ) {}

  getAll(sport: Sport) {
    if (sport) {
      return this.gamesRepository.find({
        where: { sport },
      })
    } else {
      return this.gamesRepository.find()
    }
  }

  async getAvailableToVote(user: User, sport: Sport) {
    const excludeSqlQuery = this.votesRepository
      .createQueryBuilder('vote')
      .innerJoin('vote.game', 'game')
      .where(`vote."userId" = ${user.id}`)
      .select('game.id')
      .getSql()

    const availableGames = await this.gamesRepository
      .createQueryBuilder('game')
      .where(`game.id NOT IN (${excludeSqlQuery})`)
      .where(`game.sport = :value`, { value: sport })
      .getMany()

    return availableGames
  }

  async getAlreadyVoted(user: User) {
    const includeSqlQuery = this.votesRepository
      .createQueryBuilder('vote')
      .innerJoin('vote.game', 'game')
      .where(`vote."userId" = ${user.id}`)
      .select('game.id')
      .getSql()

    const availableGames = await this.gamesRepository
      .createQueryBuilder('game')
      .where(`game.id IN (${includeSqlQuery})`)
      .innerJoinAndSelect('game.votes', 'vote')
      .getMany()

    return availableGames
  }
}
