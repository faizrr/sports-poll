import jsonExample from '@sportspoll/common/example.json'
import { SportTypes } from '../types/event'

import Event from '../types/event'
import { Vote, VoteType } from '../types/vote'

import Cookie from 'js-cookie'

import { AUTH_COOKIE_KEY } from '../dataContexts/auth'

// TODO: refactor random generator
let prevType: SportTypes
function getRandomSportType(): SportTypes {
  const values = Object.values(SportTypes)
  const newValue = values[Math.floor(Math.random() * values.length)]

  if (prevType === newValue) {
    return getRandomSportType()
  } else {
    prevType = newValue
    return newValue
  }
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
  async getAllGames(): Promise<{ list: Array<Event>; category: SportTypes }> {
    await sleep(2000)

    const sportType = getRandomSportType()
    const response = await fetch(`${API_BASE}/games?sport=${sportType}`)
    handleErrors(response)
    const list = await response.json()

    return {
      list: list,
      category: sportType,
    }
  }

  async getAvailableGames(): Promise<{
    list: Array<Event>
    category: SportTypes
  }> {
    await sleep(2000)

    const token = Cookie.get(AUTH_COOKIE_KEY)
    const sportType = getRandomSportType()
    const response = await fetch(
      `${API_BASE}/games/availableToVote?sport=${sportType}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    handleErrors(response)
    const list = await response.json()

    return {
      list: list,
      category: sportType,
    }
  }

  async getVotes(): Promise<Vote[]> {
    await sleep(2000)

    const token = Cookie.get(AUTH_COOKIE_KEY)
    const response = await fetch(`${API_BASE}/games/voted`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    handleErrors(response)
    const list = await response.json()

    return list.map((game: Event) => ({
      event: game,
      voteType: (game as any).votes[0].type,
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
