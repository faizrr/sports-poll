import React, { useEffect, useContext } from 'react'
import styled from '@emotion/styled'

import EventBase from './Event'

import Api from '../services/api'

import { VotesContext } from '../dataContexts/votes'

const Event = styled(EventBase)`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

const VotedEvents = () => {
  const {
    list,
    actions: { set },
  } = useContext(VotesContext)

  const fetchData = async () => {
    const data = await Api.getVotes()
    set(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      {list.map(({ event, voteType }) => (
        <Event
          key={event.id}
          withVoteButtons={false}
          voteType={voteType}
          {...event}
        />
      ))}
    </div>
  )
}

export default VotedEvents
