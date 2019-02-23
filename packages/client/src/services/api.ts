import jsonExample from '@sportspoll/common/example.json'
import { SportTypes } from '../types/event'

import Event from '../types/event'
import { Vote, VoteType } from '../types/vote'

function getRandomSportType(): SportTypes {
  const values = Object.values(SportTypes)
  return values[Math.floor(Math.random() * values.length)]
}

class API {
  getGames(): { list: Array<Event>; category: SportTypes } {
    const type = getRandomSportType()

    return {
      list: (jsonExample as Event[]).filter(e => e.sport === type),
      category: type,
    }
  }

  getVotes(): Array<Vote> {
    return ((jsonExample as unknown) as Event[]).map((e: Event) => ({
      event: e,
      voteType: VoteType.home,
    }))
  }
}

export default new API()
