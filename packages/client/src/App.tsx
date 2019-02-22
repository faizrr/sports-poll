import React, { Component } from 'react'
import styled from '@emotion/styled'

import Event from './components/Event'
import VotedEvents from './components/VotedEvents'

import * as COLORS from './constants/colors'

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
const Category = styled.div`
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 700;
  color: ${COLORS.WHITE};
  text-align: center;
  margin-bottom: 20px;
`

class App extends Component {
  render() {
    return (
      <Wrapper>
        <FirstPageContent>
          <Title>Who would win?</Title>
          <Category>Category: football</Category>

          <Event
            awayName="Panthrakikos Komotini"
            homeName="Chania FC"
            group="Greek Cup"
            country="ENGLAND"
            withVoteButtons
          />
        </FirstPageContent>

        <div>
          <VotedEvents
            votes={[
              {
                event: {
                  awayName: 'foo',
                  homeName: 'bar',
                  group: 'aaa',
                  country: 'SE',
                },
                voteType: 'home',
              },
              {
                event: {
                  awayName: 'foo',
                  homeName: 'bar',
                  group: 'aaa',
                  country: 'SE',
                },
                voteType: 'home',
              },
              {
                event: {
                  awayName: 'foo',
                  homeName: 'bar',
                  group: 'aaa',
                  country: 'SE',
                },
                voteType: 'home',
              },
            ]}
          />
        </div>
      </Wrapper>
    )
  }
}

export default App
