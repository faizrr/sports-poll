import React, { createContext } from 'react'
import { useList } from 'react-use'
import { Actions } from 'react-use/lib/useList'

import { Vote } from '../types/vote'

type Props = {
  children: any
}

export const VotesContext = createContext({
  list: [] as Vote[],
  actions: {} as Actions<Vote>,
})

export const VotesProvider = (props: Props) => {
  const [list, actions] = useList<Vote>()

  return (
    <VotesContext.Provider value={{ list, actions }}>
      {props.children}
    </VotesContext.Provider>
  )
}
