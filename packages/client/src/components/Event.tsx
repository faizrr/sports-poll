import React from 'react'
import styled from '@emotion/styled'

import * as COLORS from '../constants/colors'

import VoteButtonBase from './VoteButton'
import TeamCard from './TeamCard'

import EventType from '../types/event'
import VoteType from '../types/vote'

interface EventProps extends EventType {
  withVoteButtons: boolean
  voteType?: VoteType['voteType']
  className?: string
}

const Container = styled.div`
  padding: 20px;

  background: ${COLORS.WHITE};
  border-radius: 15px;
`
const GameDetails = styled.div`
  display: flex;
  justify-content: space-between;
`
const GameMeta = styled.div`
  text-align: center;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`
const VoteButton = styled(VoteButtonBase)`
  width: 40%;
  margin-left: 15px;

  &:first-child {
    margin-left: 0;
  }

  &:nth-child(2) {
    width: 20%;
  }
`

const Event = (props: EventProps) => {
  return (
    <Container className={props.className}>
      <GameDetails>
        <TeamCard
          imgSrc="http://cdn0.sbnation.com/imported_assets/1109827/Sharks_01.gif"
          name={props.homeName}
        />
        <GameMeta>
          <div>{props.group}</div>
          <div>{props.country}</div>
        </GameMeta>
        <TeamCard
          imgSrc="https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Football_Association_of_Wales_logo.svg/1200px-Football_Association_of_Wales_logo.svg.png"
          name={props.awayName}
        />
      </GameDetails>

      {props.withVoteButtons ? (
        <ButtonsWrapper>
          <VoteButton votesNumber={10}>home team</VoteButton>
          <VoteButton votesNumber={20}>draw</VoteButton>
          <VoteButton votesNumber={40}>away team</VoteButton>
        </ButtonsWrapper>
      ) : (
        <div>You voted for:</div>
      )}
    </Container>
  )
}

export default Event
