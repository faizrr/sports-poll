import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Game } from './games.entity'
import { User } from '../users/users.entity'

import { Vote } from '../votes/votes.entity'

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gamesRepository: Repository<Game>,
    @InjectRepository(Vote)
    private readonly votesRepository: Repository<Vote>
  ) {}

  getAll() {
    return this.gamesRepository.find()
  }

  async getAvailableToVote(user: User) {
    const excludeSqlQuery = this.votesRepository
      .createQueryBuilder('vote')
      .innerJoin('vote.game', 'game')
      .where(`vote."userId" = ${user.id}`)
      .select('game.id')
      .getSql()

    const availableGames = await this.gamesRepository
      .createQueryBuilder('game')
      .where(`game.id NOT IN (${excludeSqlQuery})`)
      .getMany()

    return availableGames
  }
}
