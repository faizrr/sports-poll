import React from 'react'
import { render, waitForElement } from 'react-testing-library'

import VoteButton from '../VoteButton'
import AuthPopup from '../AuthPopup'

import { AuthContext } from '../../dataContexts/auth'
import { VoteType } from '../../types/vote'

const defaultContextValues = {
  token: '',
  setToken: (() => undefined) as any,
  removeToken: (() => undefined) as any,
}

describe('VoteButton', () => {
  it('pass children to button', () => {
    const { getByText } = render(
      <AuthContext.Provider value={defaultContextValues}>
        <VoteButton votesNumber={10} onSubmit={jest.fn()} type={VoteType.home}>
          foo
        </VoteButton>
      </AuthContext.Provider>
    )
    const submitButtonNode = getByText(/foo/i)

    expect(submitButtonNode).toBeTruthy()
  })

  describe('click', () => {
    it('opens auth popup for unauthorized users', async () => {
      const onSubmitMock = jest.fn()

      const { getByText, getByTestId } = render(
        <AuthContext.Provider value={{ ...defaultContextValues }}>
          <VoteButton
            votesNumber={10}
            onSubmit={onSubmitMock}
            type={VoteType.home}
          >
            foo
          </VoteButton>
        </AuthContext.Provider>
      )
      const submitButtonNode = getByText(/foo/i)
      submitButtonNode.click()

      const popupNode = waitForElement(() => {
        return getByTestId('authPopup')
      })

      expect(popupNode).toBeTruthy()
      expect(onSubmitMock).not.toBeCalled()
    })

    it('fires onSubmit event', () => {
      const onSubmitMock = jest.fn()

      const { getByText, getByTestId } = render(
        <AuthContext.Provider
          value={{ ...defaultContextValues, token: 'foobar' }}
        >
          <VoteButton
            votesNumber={10}
            onSubmit={onSubmitMock}
            type={VoteType.home}
          >
            foo
          </VoteButton>
        </AuthContext.Provider>
      )
      const submitButtonNode = getByText(/foo/i)
      submitButtonNode.click()

      expect(onSubmitMock).toBeCalled()
    })
  })
})
