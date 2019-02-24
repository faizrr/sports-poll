import React, { createContext } from 'react'
import useCookie from '../hooks/useCookie'

type Props = {
  children: any
}

// TODO: replace any with real types
export const AuthContext = createContext({
  token: '',
  setToken: (() => undefined) as any,
  removeToken: (() => undefined) as any,
})

export const AuthProvider = (props: Props) => {
  const [token, setToken, removeToken] = useCookie('authToken', '')

  return (
    <AuthContext.Provider value={{ token, setToken, removeToken }}>
      {props.children}
    </AuthContext.Provider>
  )
}
