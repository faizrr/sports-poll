import React, { useContext, useState } from 'react'
import styled from '@emotion/styled'

// Components
import ButtonBase from './Button'
import AuthPopup from './AuthPopup'

// Contexts
import { AuthContext } from '../dataContexts/auth'

// Constants
import * as MEDIA_QUERIES from '../constants/mediaQueries'

const Button = styled(ButtonBase)`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
  width: 130px;

  ${MEDIA_QUERIES.MOBILE} {
    font-size: 17px;
    height: 50px;
  }
`

const LoginButton = () => {
  const { token, removeToken } = useContext(AuthContext)
  const [showPopup, changePopupState] = useState(false)

  const onClick = token ? removeToken : () => changePopupState(true)

  return (
    <>
      {showPopup ? (
        <AuthPopup closePopup={() => changePopupState(false)} />
      ) : null}

      <Button onClick={onClick} color="white">
        {token ? 'Log out' : 'Log in'}
      </Button>
    </>
  )
}

export default LoginButton
