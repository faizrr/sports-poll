import React, { createContext, useState } from 'react'

type Props = {
  children: any
}

export const AuthContext = createContext({
  token: null,
  setToken: function() {} as React.Dispatch<React.SetStateAction<null>>,
})

export const AuthProvider = (props: Props) => {
  const [token, setToken] = useState(null)

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  )
}
