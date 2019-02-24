import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'

import { Vote } from './votes.entity'
import { VotesService } from './votes.service'
import { VotesController } from './votes.controller'

import { Game } from '../games/games.entity'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Vote, Game]),
  ],
  providers: [VotesService],
  exports: [TypeOrmModule, VotesService],
  controllers: [VotesController],
})
export class VotesModule {}
