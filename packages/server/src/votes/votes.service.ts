import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Vote } from './votes.entity'
import { User } from '../users/users.entity'
import { Game } from '../games/games.entity'

import { CreateVoteDto } from './dto/createVote.dto'

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private readonly votesRepository: Repository<Vote>,
    @InjectRepository(Game)
    private readonly gamesRepository: Repository<Game>
  ) {}

  async addVote(body: CreateVoteDto, user: User) {
    const game = await this.gamesRepository.findOne(body.gameId)

    if (!game) {
      throw new BadRequestException()
    }

    const vote = await this.votesRepository.findOne({ user, game })
    if (vote) {
      throw new ConflictException()
    }

    const newVote = new Vote()
    newVote.game = game
    newVote.user = user
    newVote.type = body.type

    return this.votesRepository.save(newVote)
  }
}
