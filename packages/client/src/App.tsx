import React, { Component } from 'react'
import styled from '@emotion/styled'

import Button from './components/Button'

import * as COLORS from './constants/colors'

import backgroundSrc from './background.jpg'

const Wrapper = styled.div`
  background-image: url(${backgroundSrc});
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`
const Content = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding-top: 120px;
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
      <Wrapper>
        <Content>
          <Title>Who would win?</Title>

          <Button color="green">foobar</Button>
        </Content>
      </Wrapper>
    )
  }
}

export default App
