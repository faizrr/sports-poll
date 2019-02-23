import React, { useEffect, useReducer } from 'react'
import styled from '@emotion/styled'
import Event from './Event'

// constants
import * as COLORS from '../constants/colors'

// types
import EventType, { SportTypes } from '../types/event'

// services
import Api from '../services/api'

const Category = styled.div`
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 700;
  color: ${COLORS.WHITE};
  text-align: center;
  margin-bottom: 20px;
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

const EventRoulette = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const loadGames = async () => {
    const { list, category } = await Api.getGames()

    dispatch({
      type: ActionType.setData,
      list,
      category,
    })
  }

  useEffect(() => {
    loadGames()
  }, [])

  if (!state.loaded) {
    return <div>loading...</div>
  }

  const game = state.list[state.eventIndex]
  if (!game) {
    return <div>no games. do you want to check other category?</div>
  }

  return (
    <>
      <Category>Category: {state.category}</Category>

      <Event
        awayName={game.awayName}
        homeName={game.homeName}
        group={game.group}
        country={game.country}
        sport={game.sport}
        withVoteButtons
        onSubmit={() => dispatch({ type: ActionType.nextEvent })}
      />
    </>
  )
}

export default EventRoulette
