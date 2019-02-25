import jsonExample from '@sportspoll/common/example.json'
import { SportTypes } from '../types/event'

import Event from '../types/event'
import { Vote, VoteType } from '../types/vote'

function getRandomSportType(): SportTypes {
  const values = Object.values(SportTypes)
  return values[Math.floor(Math.random() * values.length)]
}

const API_BASE = `http://localhost:5000`

// just to demonstrate loaders
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

class HttpError extends Error {
  constructor(m: string) {
    super(m)
    Object.setPrototypeOf(this, HttpError.prototype)
  }

  response: any
}

function handleErrors(response: any) {
  if (!response.ok) {
    const e = new HttpError(response.statusText)
    e.response = response
    throw e
  }

  return response
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

  async login(values: {
    login: string
    password: string
  }): Promise<{ token: string }> {
    await sleep(2000)

    const response = await fetch(`${API_BASE}/auth/signIn`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login: values.login, password: values.password }),
    })
    handleErrors(response)
    const { token } = await response.json()

    return {
      token,
    }
  }

  async signUp(values: { login: string; password: string }) {
    await sleep(2000)

    const response = await fetch(`${API_BASE}/auth/signUp`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login: values.login, password: values.password }),
    })
    handleErrors(response)
    const { token } = await response.json()

    return {
      token,
    }
  }
}

export default new API()
