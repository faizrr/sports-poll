import { Controller, UseGuards, Post, Req, Body } from '@nestjs/common'
import { VotesService } from './votes.service'
import { AuthGuard } from '@nestjs/passport'

import { CreateVoteDto } from './dto/createVote.dto'

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  @UseGuards(AuthGuard())
  async addVote(@Req() request, @Body() body: CreateVoteDto) {
    await this.votesService.addVote(body, request.user)
  }
}
