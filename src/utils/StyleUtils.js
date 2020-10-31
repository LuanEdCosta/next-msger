import { MAIN_COLORS } from '@/styles'

export const getColor = (color) => {
  if (color.includes('#') || !color) return color
  const colorValue = MAIN_COLORS[color]
  if (colorValue) return colorValue
  return null
}
