import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import { Form, Field } from 'react-final-form'

// Constants
import * as COLORS from '../constants/colors'

// Components
import Input from './Input'
import ButtonBase from './Button'

type Props = {
  onBackgroundClick: () => void
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
`
const Title = styled.div`
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;
`
const Button = styled(ButtonBase)`
  width: 100%;
  margin-top: 20px;
  height: 50px;
  font-size: 15px;
`

const domNode = document.querySelector('#authPopup') as Element

const AuthPopup = (props: Props) => {
  useEffect(() => {
    ;(document.querySelector('body') as HTMLElement).style.overflow = 'hidden'

    return () => {
      ;(document.querySelector('body') as HTMLElement).style.overflow = null
    }
  })

  const onSubmit = (values: any) => {
    console.log(values)
  }

  const onBackgroundClick = function(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault()
    if (event.target === event.currentTarget) {
      props.onBackgroundClick()
    }
  }

  return ReactDOM.createPortal(
    <Wrapper onClick={onBackgroundClick}>
      <Popup>
        <Title>Log in</Title>

        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Field name="login" label="Login" component={Input} />
                <Field
                  name="password"
                  label="Password"
                  component={Input}
                  type="password"
                />

                <Button color="green" type="submit">
                  Log in
                </Button>
              </form>
            )
          }}
        />
      </Popup>
    </Wrapper>,
    domNode
  )
}

export default AuthPopup
