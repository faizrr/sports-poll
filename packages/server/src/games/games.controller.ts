import { Controller, Get, UseGuards, Req, Query } from '@nestjs/common'
import { GamesService } from './games.service'
import { AuthGuard } from '@nestjs/passport'

import { GamesListDto } from './dto/list.dto'

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  getGames(@Query() params: GamesListDto) {
    return this.gamesService.getAll(params.sport)
  }

  @Get('availableToVote')
  @UseGuards(AuthGuard())
  getAvailableGames(@Req() request, @Query() params: GamesListDto) {
    return this.gamesService.getAvailableToVote(request.user, params.sport)
  }

  @Get('voted')
  @UseGuards(AuthGuard())
  getAlreadyVoted(@Req() request) {
    return this.gamesService.getAlreadyVoted(request.user)
  }
}
