import React from 'react'
import styled from '@emotion/styled'
import { FieldRenderProps } from 'react-final-form'

interface Props extends FieldRenderProps {
  label?: string
  type?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
  font-size: 12px;
`
const Input = styled.input`
  height: 21px;
  border-radius: 3px;
  border: 1px solid #dedede;
  padding: 5px;
`

const StyledInput: React.FunctionComponent<Props> = props => {
  return (
    <Wrapper>
      <Label>{props.label}</Label>
      <Input {...props.input} type={props.type} />
    </Wrapper>
  )
}

export default StyledInput
