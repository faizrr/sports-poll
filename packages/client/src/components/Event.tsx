import React from 'react'
import styled from '@emotion/styled'

// Constants
import * as COLORS from '../constants/colors'
import * as MEDIA_QUERIES from '../constants/mediaQueries'

// Components
import VoteButtonBase from './VoteButton'
import TeamCard from './TeamCard'

// Types
import EventType from '../types/event'
import { VoteType, Vote as VoteInterface } from '../types/vote'

interface EventProps extends EventType {
  withVoteButtons: boolean
  voteType?: VoteInterface['voteType']
  className?: string
  onSubmit?: (voteType: VoteType) => Promise<void>
}

const Container = styled.div`
  padding: 20px;

  background: ${COLORS.WHITE};
  border-radius: 15px;

  ${MEDIA_QUERIES.MOBILE} {
    font-size: 12px;
  }
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

  ${MEDIA_QUERIES.MOBILE} {
    margin-left: 8px;
  }

  &:first-child {
    margin-left: 0;
  }

  &:nth-child(2) {
    width: 20%;
  }
`

const defaultOnSubmit: any = () => {}

const Event = (props: EventProps) => {
  return (
    <Container className={props.className}>
      <GameDetails>
        <TeamCard
          imgSrc="http://cdn0.sbnation.com/imported_assets/1109827/Sharks_01.gif"
          name={props.homeName}
        />
        <GameMeta>
          <div>{props.groupName}</div>
          <div>{props.country}</div>
        </GameMeta>
        <TeamCard
          imgSrc="https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Football_Association_of_Wales_logo.svg/1200px-Football_Association_of_Wales_logo.svg.png"
          name={props.awayName}
        />
      </GameDetails>

      {props.withVoteButtons ? (
        <ButtonsWrapper>
          <VoteButton
            onSubmit={props.onSubmit || defaultOnSubmit}
            votesNumber={10}
            type={VoteType.home}
          >
            home team
          </VoteButton>
          <VoteButton
            onSubmit={props.onSubmit || defaultOnSubmit}
            votesNumber={20}
            type={VoteType.draw}
          >
            draw
          </VoteButton>
          <VoteButton
            onSubmit={props.onSubmit || defaultOnSubmit}
            votesNumber={40}
            type={VoteType.away}
          >
            away team
          </VoteButton>
        </ButtonsWrapper>
      ) : (
        <>
          <div>You voted for: {props.voteType}</div>
          <div>Game state: {props.state}</div>
        </>
      )}
    </Container>
  )
}

export default Event
