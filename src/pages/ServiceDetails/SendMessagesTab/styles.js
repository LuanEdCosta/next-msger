import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

import { BoldText, DefaultText } from '@/components/Text'
import { MAIN_COLORS } from '@/styles'
import TouchableIcon from '@/components/TouchableIcon'

export const List = styled(FlatList).attrs({
  contentContainerStyle: {
    flexGrow: 1,
    padding: 16,
  },
})`
  flex: 1;
  background-color: white;
`

export const ListHint = styled(DefaultText)`
  margin-bottom: 16px;
  line-height: 20px;
`

export const ItemContainer = styled.View`
  margin-bottom: 12px;
  border-radius: 5px;
  border: 1px ${MAIN_COLORS.lightGrey};
`

export const ItemHeader = styled.View`
  padding: 8px 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${MAIN_COLORS.lightGrey};
  background-color: ${MAIN_COLORS.snowLight};
`

export const MarketingStepName = styled(BoldText)`
  color: ${MAIN_COLORS.primaryText};
`

export const MarketingStepDays = styled(DefaultText)``

export const ItemContent = styled.View`
  flex-direction: row;
  justify-content: center;
`

export const SendMessageButton = styled(TouchableIcon).attrs({
  size: 56,
})`
  margin: 8px;
  background-color: ${({ wasSent }) =>
    wasSent ? MAIN_COLORS.success : 'transparent'};
`

export const SendMessageIcon = styled(FontAwesome5Icon).attrs(
  ({ wasSent }) => ({
    size: 32,
    color: wasSent ? MAIN_COLORS.white : MAIN_COLORS.secondaryText,
  }),
)``
