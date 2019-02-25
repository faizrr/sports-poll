import { useState } from 'react'
import * as Cookies from 'js-cookie'

const defaultOptions = {
  expires: 7,
}

export function useCookie(
  key: string,
  initialValue: string
): [
  string,
  (value: string, options: object) => void,
  (options: object) => void
] {
  const [item, setInnerValue] = useState(() => {
    return Cookies.get(key) || initialValue
  })

  const setValue = (value: string, options: object) => {
    setInnerValue(value)
    Cookies.set(key, value, { ...defaultOptions, ...options })
  }

  const removeValue = (options: object) => {
    setInnerValue('')
    Cookies.remove(key, { ...defaultOptions, ...options })
  }

  return [item, setValue, removeValue]
}

export default useCookie
