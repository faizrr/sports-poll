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
import * as MEDIA_QUERIES from './constants/mediaQueries'

// Images
import backgroundSrc from './background.jpg'

const Wrapper = styled.div`
  background: #000;
  height: 200vh;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;

  ${MEDIA_QUERIES.TABLET} {
    max-width: initial;
    margin: 0;
    padding: 0 40px;
    width: calc(100% - 80px);
  }

  ${MEDIA_QUERIES.MOBILE} {
    max-width: initial;
    margin: 0;
    padding: 0 10px;
    width: calc(100% - 20px);
  }
`
const FirstPageContent = styled.div`
  height: 100vh;
  min-height: 700px;
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

  ${MEDIA_QUERIES.MOBILE} {
    min-height: initial;
    padding-top: 70px;
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

  ${MEDIA_QUERIES.TABLET} {
    font-size: 40px;
  }

  ${MEDIA_QUERIES.MOBILE} {
    font-size: 29px;
  }
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
