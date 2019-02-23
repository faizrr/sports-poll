import React, { createContext, useState } from 'react'

type Props = {
  children: any
}

export const AuthContext = createContext({
  token: '',
  setToken: function() {} as React.Dispatch<React.SetStateAction<string>>,
})

export const AuthProvider = (props: Props) => {
  const [token, setToken] = useState('')

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  )
}
