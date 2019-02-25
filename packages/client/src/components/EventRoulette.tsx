import React, { useEffect, useReducer, useContext } from 'react'
import styled from '@emotion/styled'

// constants
import * as COLORS from '../constants/colors'
import * as MEDIA_QUERIES from '../constants/mediaQueries'

// types
import EventType, { SportTypes } from '../types/event'

// services
import Api from '../services/api'

// Components
import Event from './Event'
import ButtonBase from './Button'

// Contexts
import { AuthContext } from '../dataContexts/auth'

const Category = styled.div`
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 700;
  color: ${COLORS.WHITE};
  text-align: center;
  margin-bottom: 20px;
`
const Placeholder = styled.div`
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 700;
  color: ${COLORS.WHITE};
  text-align: center;
  margin-bottom: 20px;

  ${MEDIA_QUERIES.TABLET} {
    font-size: 20px;
  }

  ${MEDIA_QUERIES.MOBILE} {
    font-size: 15px;
  }
`
const NoGamesWrapper = styled.div``
const Button = styled(ButtonBase)`
  margin: 0 auto;
  margin-top: 20px;
  width: 100px;
  display: block;
`

type State = {
  loaded: boolean
  list: EventType[]
  category: SportTypes | null
  eventIndex: number
}

enum ActionType {
  startLoading,
  setData,
  nextEvent,
}
type SetDataAction = {
  type: ActionType.setData
  list: EventType[]
  category: SportTypes
}
type RestAction = {
  type: ActionType.startLoading | ActionType.nextEvent
}
type Action = SetDataAction | RestAction

const initialState = {
  loaded: false,
  list: [] as EventType[],
  category: null,
  eventIndex: 0,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.setData:
      return {
        loaded: true,
        list: action.list,
        category: action.category,
        eventIndex: 0,
      }
    case ActionType.startLoading:
      return initialState
    case ActionType.nextEvent:
      return { ...state, eventIndex: state.eventIndex + 1 }
    default:
      throw new Error()
  }
}

const getHumanReadableCategory = (sport: SportTypes | null) => {
  switch (sport) {
    case SportTypes.Football:
      return 'Football'
    case SportTypes.Handball:
      return 'Handball'
    case SportTypes.IceHockey:
      return 'Ice hockey'
    case SportTypes.Tennis:
      return 'Tennis'
    case SportTypes.Snooker:
      return 'Snooker'
    default:
      return ''
  }
}

const EventRoulette = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { token } = useContext(AuthContext)

  const loadGames = async () => {
    dispatch({ type: ActionType.startLoading })

    let data
    if (token) {
      data = await Api.getAvailableGames()
    } else {
      data = await Api.getAllGames()
    }

    const { list, category } = data

    dispatch({
      type: ActionType.setData,
      list,
      category,
    })
  }

  useEffect(() => {
    loadGames()
  }, [token])

  if (!state.loaded) {
    return <Placeholder>loading...</Placeholder>
  }

  const game = state.list[state.eventIndex]
  if (!game) {
    return (
      <NoGamesWrapper>
        <Placeholder>
          no games left.
          <br />
          do you want to check other category?
        </Placeholder>

        <Button color="green" onClick={() => loadGames()}>
          YES
        </Button>
      </NoGamesWrapper>
    )
  }

  return (
    <>
      <Category>Category: {getHumanReadableCategory(state.category)}</Category>

      <Event
        awayName={game.awayName}
        homeName={game.homeName}
        groupName={game.groupName}
        country={game.country}
        sport={game.sport}
        state={game.state}
        withVoteButtons
        onSubmit={() => dispatch({ type: ActionType.nextEvent })}
      />
    </>
  )
}

export default EventRoulette
