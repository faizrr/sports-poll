import React, { useContext } from 'react'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'

// Components
import Input from './Input'
import { Button } from './AuthPopup'

// Validations
import { required } from '../helpers/formValidations'

// Contexts
import { AuthContext } from '../dataContexts/auth'

// Services
import Api from '../services/api'

const LoginForm = (props: { closePopup: () => void }) => {
  const { setToken } = useContext(AuthContext)

  const onSubmit = async (values: any) => {
    try {
      const { token } = await Api.login(values)
      setToken(token)
      props.closePopup()
    } catch (e) {
      if (e.response.status === 401) {
        return {
          [FORM_ERROR]: 'User not found',
        }
      } else {
        return {
          [FORM_ERROR]: 'Something went wrong',
        }
      }
    }
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        submitError,
        submitting,
        dirtySinceLastSubmit,
      }) => {
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

            <div>
              {!submitting && !dirtySinceLastSubmit && submitError
                ? submitError
                : null}
            </div>

            <Button loading={submitting} color="green" type="submit">
              Log in
            </Button>
          </form>
        )
      }}
    />
  )
}

export default LoginForm
