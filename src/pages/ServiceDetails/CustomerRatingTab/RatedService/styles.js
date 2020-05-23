import styled from 'styled-components/native'

import Rating from '@/components/Rating'
import Button from '@/components/Button'
import { DefaultText, BoldText } from '@/components/Text'
import { MAIN_COLORS } from '@/styles'
import TouchableIcon from '@/components/TouchableIcon'

export const Title = styled(BoldText)`
  font-size: 24px;
  color: ${MAIN_COLORS.primaryText};
  margin-bottom: 8px;
`
export const Subtitle = styled(DefaultText)`
  margin-bottom: 16px;
`

export const RatingData = styled.View`
  margin-bottom: 32px;
  flex: 1;
  border-top-width: 1px;
  border-color: ${MAIN_COLORS.lightGrey};
  padding-top: 16px;
`

export const RatingStars = styled(Rating)`
  margin-bottom: 16px;
`

export const Comment = styled(DefaultText)`
  line-height: 20px;
`

export const ActionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const EditButton = styled(Button)`
  flex: 1;
`

export const DeleteButton = styled(TouchableIcon)`
  margin-left: 8px;
`
