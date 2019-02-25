import Event from './event'

export enum VoteType {
  home = 'HOME',
  draw = 'DRAW',
  away = 'AWAY',
}

export type Vote = {
  event: Event
  voteType: VoteType
}
