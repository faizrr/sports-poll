import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'

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
const Popup = styled.div``

const domNode = document.querySelector('#authPopup') as Element

const AuthPopup = () => {
  useEffect(() => {
    ;(document.querySelector('body') as HTMLElement).style.overflow = 'hidden'

    return () => {
      ;(document.querySelector('body') as HTMLElement).style.overflow = null
    }
  })

  return ReactDOM.createPortal(
    <Wrapper>
      <Popup>Auth: TODO</Popup>
    </Wrapper>,
    domNode
  )
}

export default AuthPopup
