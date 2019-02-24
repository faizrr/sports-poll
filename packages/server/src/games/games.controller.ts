import { Controller, Get, UseGuards, Req } from '@nestjs/common'
import { GamesService } from './games.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  getGames() {
    return this.gamesService.getAll()
  }

  @Get('availableToVote')
  @UseGuards(AuthGuard())
  getAvailableGames(@Req() request) {
    return this.gamesService.getAvailableToVote(request.user)
  }
}
