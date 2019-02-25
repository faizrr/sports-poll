import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'

// Constants
import * as COLORS from '../constants/colors'
import * as MEDIA_QUERIES from '../constants/mediaQueries'

// Components
import ButtonBase from './Button'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

type Props = {
  closePopup: () => void
}
enum FormType {
  SignIn,
  SignUp,
}

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100000;
  overflow: none;
`
const Popup = styled.div`
  width: 300px;
  border-radius: 15px;
  background: ${COLORS.WHITE};
  padding: 15px;
  text-align: center;

  ${MEDIA_QUERIES.MOBILE} {
    width: calc(100% - 60px);
  }
`
const Title = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
`
const BottomText = styled.div`
  margin-top: 20px;
  display: inline-block;
  text-transform: uppercase;
  font-size: 12px;
  color: ${COLORS.GRAY};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
export const Button = styled(ButtonBase)`
  width: 100%;
  margin-top: 20px;
  height: 50px;
  font-size: 15px;
`

const AuthPopup = (props: Props) => {
  let node = document.createElement('div')

  useEffect(() => {
    node.dataset.testid = 'authPortal'
    document.body.prepend(node)
    ;(document.querySelector('body') as HTMLElement).style.overflow = 'hidden'

    return () => {
      if (node && node.parentNode) {
        node.parentNode.removeChild(node)
      }
      ;(document.querySelector('body') as HTMLElement).style.overflow = null
    }
  })

  const [currentForm, changeCurrentForm] = useState(FormType.SignIn)
  const onChangeFromClick = () => {
    if (currentForm === FormType.SignIn) {
      changeCurrentForm(FormType.SignUp)
    } else if (currentForm === FormType.SignUp) {
      changeCurrentForm(FormType.SignIn)
    }
  }

  const onBackgroundClick = function(event: React.MouseEvent<HTMLElement>) {
    if (event.target === event.currentTarget) {
      props.closePopup()
    }
  }

  return ReactDOM.createPortal(
    <Wrapper onClick={onBackgroundClick} data-testid="authPopup">
      <Popup>
        <Title>
          {currentForm === FormType.SignIn ? 'Sign in' : 'Register'}
        </Title>

        {currentForm === FormType.SignIn ? (
          <LoginForm closePopup={props.closePopup} />
        ) : null}
        {currentForm === FormType.SignUp ? (
          <SignUpForm closePopup={props.closePopup} />
        ) : null}

        <BottomText onClick={onChangeFromClick}>
          {currentForm === FormType.SignIn ? 'Register' : 'Sign in'}
        </BottomText>
      </Popup>
    </Wrapper>,
    node
  )
}

export default AuthPopup
