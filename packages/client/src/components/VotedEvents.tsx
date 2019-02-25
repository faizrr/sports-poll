import React, { useEffect, useContext } from 'react'
import styled from '@emotion/styled'

import EventBase from './Event'

import Api from '../services/api'

import { VotesContext } from '../dataContexts/votes'
import { AuthContext } from '../dataContexts/auth'

const Heading = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #fff;
  text-transform: uppercase;
`

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
  const { token } = useContext(AuthContext)

  const fetchData = async () => {
    const data = await Api.getVotes()
    set(data)
  }

  useEffect(() => {
    if (token) {
      fetchData()
    } else {
      set([])
    }
  }, [token])

  if (!list.length) {
    return null
  }

  return (
    <div>
      <Heading>Previously voted events</Heading>

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
