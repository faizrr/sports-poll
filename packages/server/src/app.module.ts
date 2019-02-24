import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { AuthModule } from './auth/auth.module'
import { GamesModule } from './games/games.module'
import { VotesModule } from './votes/votes.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST || 'localhost',
      username: 'postgres',
      database: process.env.PG_DB || 'sports-poll',
      synchronize: true,
      entities: [
        process.env.NODE_ENV === 'production'
          ? 'dist/**/**.entity{.ts,.js}'
          : 'src/**/**.entity{.ts,.js}',
      ],
    }),
    AuthModule,
    GamesModule,
    VotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
