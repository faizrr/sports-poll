import React from 'react'
import { Form, Field } from 'react-final-form'

// Components
import Input from './Input'
import { Button } from './AuthPopup'

// Validations
import {
  required,
  shouldMatch,
  combineValidations,
} from '../helpers/formValidations'

const SignUpForm = () => {
  const onSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field
              name="login"
              label="Login"
              validate={required}
              component={Input}
            />
            <Field
              name="password"
              label="Password"
              component={Input}
              validate={required}
              type="password"
            />
            <Field
              name="passwordConfirmation"
              label="Password confirmation"
              component={Input}
              validate={combineValidations([
                required,
                shouldMatch(values.password),
              ])}
              type="password"
            />

            <Button color="green" type="submit">
              Sign up
            </Button>
          </form>
        )
      }}
    />
  )
}

export default SignUpForm
