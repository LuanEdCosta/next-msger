import styled from 'styled-components/native'

import Rating from '@/components/Rating'
import Button from '@/components/Button'
import { DefaultText, BoldText } from '@/components/Text'
import { MAIN_COLORS } from '@/styles'

export const Title = styled(BoldText)`
  font-size: 24px;
  color: ${MAIN_COLORS.primaryText};
  margin-bottom: 8px;
`
export const Subtitle = styled(DefaultText)`
  margin-bottom: 32px;
`

export const RatingData = styled.View`
  margin-bottom: 32px;
  flex: 1;
`

export const RatingStars = styled(Rating)`
  margin-bottom: 16px;
`

export const Comment = styled(DefaultText)``

export const EditButton = styled(Button)``
