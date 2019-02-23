import jsonExample from '@sportspoll/common/example.json'

import Event from '../types/event'
import { Vote, VoteType } from '../types/vote'

class API {
  getGames(): Array<Event> {
    return jsonExample
  }

  getVotes(): Array<Vote> {
    return jsonExample.map((e: Event) => ({
      event: e,
      voteType: VoteType.home,
    }))
  }
}

export default new API()
