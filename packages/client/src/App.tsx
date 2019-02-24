import React, { Component } from 'react'
import styled from '@emotion/styled'

// Components
import VotedEvents from './components/VotedEvents'
import EventRoulette from './components/EventRoulette'
import LoginButton from './components/LoginButton'

// Contexts
import { VotesProvider } from './dataContexts/votes'
import { AuthProvider } from './dataContexts/auth'

// Constants
import * as COLORS from './constants/colors'

// Images
import backgroundSrc from './background.jpg'

const Wrapper = styled.div`
  background: #000;
  height: 200vh;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`
const FirstPageContent = styled.div`
  height: 100vh;
  position: relative;
  z-index: 1;

  padding-top: 100px;

  &:after {
    display: block;
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    height: 100%;
    width: 100vw;
    transform: translateX(-50%);
    z-index: -1;
    background-image: url(${backgroundSrc});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`
const Title = styled.h1`
  text-transform: uppercase;
  font-size: 72px;
  font-weight: 700;
  color: ${COLORS.WHITE};
  margin: 0;
  padding: 0;
  text-align: center;
`

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <VotesProvider>
          <Wrapper>
            <FirstPageContent>
              <Title>Who would win?</Title>

              <EventRoulette />
            </FirstPageContent>

            <div>
              <VotedEvents />
            </div>
          </Wrapper>

          <LoginButton />
        </VotesProvider>
      </AuthProvider>
    )
  }
}

export default App
