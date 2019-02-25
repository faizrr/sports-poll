import React, { useContext, useState } from 'react'
import styled from '@emotion/styled'

// Components
import ButtonBase from './Button'
import AuthPopup from './AuthPopup'

// Constants
import * as COLORS from '../constants/colors'
import * as MEDIA_QUERIES from '../constants/mediaQueries'

// Contexts
import { AuthContext } from '../dataContexts/auth'

type VoteButtonProps = {
  votesNumber: number
  children: any
  className?: string
  onSubmit?: () => void
}

// const VotesNumber = styled.div`
//   padding-top: 10px;
//   font-size: 10px;
//   color: ${COLORS.GRAY};
//   text-align: center;
// `
const Button = styled(ButtonBase)`
  width: 100%;

  ${MEDIA_QUERIES.MOBILE} {
    height: 50px;
    font-size: 14px;
  }
`

const VoteButton = (props: VoteButtonProps) => {
  const { token } = useContext(AuthContext)
  const [showPopup, changePopupState] = useState(false)

  const onSubmit = token
    ? props.onSubmit
    : () => {
        changePopupState(true)
      }

  return (
    <div className={props.className}>
      {showPopup ? (
        <AuthPopup closePopup={() => changePopupState(false)} />
      ) : null}

      <Button onClick={onSubmit} color="green">
        {props.children}
      </Button>
      {/* <VotesNumber>{props.votesNumber} votes</VotesNumber> */}
    </div>
  )
}

export default VoteButton
