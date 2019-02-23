import React from 'react'
import styled from '@emotion/styled'
import { FieldRenderProps } from 'react-final-form'

import * as COLORS from '../constants/colors'

interface Props extends FieldRenderProps {
  label?: string
  type?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`
const Label = styled.label`
  font-size: 12px;
  text-align: left;
`
const ErrorLabel = styled(Label)`
  text-align: right;
  color: ${COLORS.RED};
`
const LabelsContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
      <LabelsContainer>
        <Label>{props.label}</Label>
        <ErrorLabel>
          {props.meta.touched && props.meta.error ? props.meta.error : ''}
        </ErrorLabel>
      </LabelsContainer>

      <Input {...props.input} type={props.type} />
    </Wrapper>
  )
}

export default StyledInput
