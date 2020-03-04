import { useCallback } from 'react'
import { MAIN_COLORS } from '@/styles'

export default (fallbackColor = null) => {
  const onGetColor = useCallback(
    (color) => {
      if (!color) return fallbackColor
      const colorValue = MAIN_COLORS[color]
      if (!colorValue) return color
      return colorValue
    },
    [fallbackColor],
  )

  return onGetColor
}
