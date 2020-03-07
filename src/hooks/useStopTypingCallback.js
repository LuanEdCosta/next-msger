import { useState, useCallback } from 'react'

export default ({ onSetText, onStartTyping, onStopTyping, delay = 600 }) => {
  const [timer, setTimer] = useState(0)

  const onChangeText = useCallback(
    (text) => {
      clearTimeout(timer)

      if (onStartTyping) onStartTyping(text)
      if (onSetText) onSetText(text)

      setTimer(
        setTimeout(() => {
          if (onStopTyping) onStopTyping(text)
        }, delay),
      )
    },
    [delay, onSetText, onStartTyping, onStopTyping, timer],
  )

  return onChangeText
}
