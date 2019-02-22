import React from 'react'
import styled from '@emotion/styled'

import EventBase from './Event'
import Vote from '../types/vote'

type VotedEventsProps = {
  votes: Array<Vote>
}

const Event = styled(EventBase)`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

const VotedEvents = (props: VotedEventsProps) => {
  return (
    <div>
      {props.votes.map(({ event, voteType }) => (
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
