import { VoteType } from '../voteTypes'

export class CreateVoteDto {
  readonly gameId: number
  readonly type: VoteType
}
