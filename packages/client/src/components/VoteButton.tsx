import React from 'react'
import styled from '@emotion/styled'

import ButtonBase from './Button'

import * as COLORS from '../constants/colors'

type VoteButtonProps = {
  votesNumber: number
  children: any
  className?: string
}

const VotesNumber = styled.div`
  padding-top: 10px;
  font-size: 10px;
  color: ${COLORS.GRAY};
  text-align: center;
`
const Button = styled(ButtonBase)`
  width: 100%;
`

const VoteButton = (props: VoteButtonProps) => {
  return (
    <div className={props.className}>
      <Button color="green">{props.children}</Button>
      <VotesNumber>{props.votesNumber} votes</VotesNumber>
    </div>
  )
}

export default VoteButton
