import Event from './event'

export enum VoteType {
  home = 'home',
  draw = 'draw',
  away = 'away',
}

export type Vote = {
  event: Event
  voteType: VoteType
}
