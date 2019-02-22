import Event from './event'

type Vote = {
  event: Event
  voteType: 'home' | 'draw' | 'away'
}

export default Vote
