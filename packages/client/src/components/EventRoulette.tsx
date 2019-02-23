import React, { useContext, useEffect, useState } from 'react'
import { useList } from 'react-use'
import styled from '@emotion/styled'
import Event from './Event'

// constants
import * as COLORS from '../constants/colors'

// types
import EventType from '../types/event'

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

const EventRoulette = () => {
  const [list, { set }] = useList<EventType>()
  const [category, setCategory] = useState('')

  const [index, setIndex] = useState(0)

  const loadGames = async () => {
    const { list, category: newCategory } = await Api.getGames()

    set(list)
    setCategory(newCategory)
  }

  useEffect(() => {
    loadGames()
  }, [])

  if (!list.length) {
    return <div>loading...</div>
  }

  const game = list[index]
  if (!game) {
    return <div>no games. do you want to check other category?</div>
  }

  return (
    <>
      <Category>Category: {category}</Category>

      <Event
        awayName={game.awayName}
        homeName={game.homeName}
        group={game.group}
        country={game.country}
        sport={game.sport}
        withVoteButtons
        onSubmit={() => setIndex(index + 1)}
      />
    </>
  )
}

export default EventRoulette
