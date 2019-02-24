import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'

import { Game } from './games.entity'
import { GamesService } from './games.service'
import { GamesController } from './games.controller'

import { Vote } from '../votes/votes.entity'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Game, Vote]),
  ],
  providers: [GamesService],
  exports: [TypeOrmModule, GamesService],
  controllers: [GamesController],
})
export class GamesModule {}
