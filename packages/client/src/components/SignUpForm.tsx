import React, { useContext } from 'react'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'

// Components
import Input from './Input'
import { Button } from './AuthPopup'

// Validations
import {
  required,
  shouldMatch,
  combineValidations,
} from '../helpers/formValidations'

// Contexts
import { AuthContext } from '../dataContexts/auth'

// Services
import Api from '../services/api'

const SignUpForm = (props: { closePopup: () => void }) => {
  const { setToken } = useContext(AuthContext)

  const onSubmit = async (values: any) => {
    try {
      const { token } = await Api.signUp(values)
      setToken(token)
      props.closePopup()
    } catch (e) {
      return {
        [FORM_ERROR]: 'oops',
      }
    }
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
