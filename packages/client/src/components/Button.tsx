import { css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { lighten, darken } from 'polished'

import * as COLORS from '../constants/colors'

type ButtonProps = {
  color: 'green' | 'white'
  loading?: boolean
}

const greenColors = css`
  background-color: ${COLORS.GREEN};
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

const animation = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 80px 0;
  }
`
const loadingCss = css`
  background-size: 80px 80px;
  background-image: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.2) 25%,
    rgba(0, 0, 0, 0) 25%,
    rgba(0, 0, 0, 0) 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    rgba(0, 0, 0, 0) 75%,
    rgba(0, 0, 0, 0)
  );
  animation: ${animation} 1s linear infinite;
  pointer-events: none;
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

  ${(props: ButtonProps) => props.loading && loadingCss};

  &:focus {
    outline: 0;
  }
`

export default Button
