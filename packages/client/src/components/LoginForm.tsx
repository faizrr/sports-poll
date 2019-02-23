import React from 'react'
import { Form, Field } from 'react-final-form'

// Components
import Input from './Input'
import { Button } from './AuthPopup'

// Validations
import { required } from '../helpers/formValidations'

const LoginForm = () => {
  const onSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field
              name="login"
              validate={required}
              label="Login"
              component={Input}
            />
            <Field
              name="password"
              validate={required}
              label="Password"
              component={Input}
              type="password"
            />

            <Button color="green" type="submit">
              Log in
            </Button>
          </form>
        )
      }}
    />
  )
}

export default LoginForm
