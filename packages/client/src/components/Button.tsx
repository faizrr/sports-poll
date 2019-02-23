import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { lighten, darken } from 'polished'

import * as COLORS from '../constants/colors'

type ButtonProps = {
  color: 'green' | 'white'
}

const greenColors = css`
  background: ${COLORS.GREEN};
  color: ${COLORS.WHITE};

  &:hover {
    background: ${lighten(0.1, COLORS.GREEN)};
  }

  &:active {
    background: ${darken(0.1, COLORS.GREEN)};
  }
`
const whiteColors = css`
  background: ${COLORS.WHITE};

  &:hover {
    background: ${darken(0.1, COLORS.WHITE)};
  }

  &:active {
    background: ${darken(0.2, COLORS.WHITE)};
  }
`

const Button = styled.button`
  height: 60px;
  border: 0px;
  border-radius: 15px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
  text-transform: uppercase;

  ${(props: ButtonProps) => props.color === 'white' && whiteColors};
  ${(props: ButtonProps) => props.color === 'green' && greenColors};

  &:focus {
    outline: 0;
  }
`

export default Button
