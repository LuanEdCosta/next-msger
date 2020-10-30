import styled from 'styled-components/native'

import Input from '@/components/Input'
import Button from '@/components/Button'
import { MAIN_COLORS } from '@/styles'
import { PrimaryText } from '@/components/Text'
import TouchableIcon from '@/components/TouchableIcon'
import { TimeBuilderItem } from '@/components/TimeBuilderModal'

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})``

export const Content = styled.View`
  padding: 16px;
`

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`

export const MarketingStepInput = styled(Input)`
  margin-bottom: 16px;
`

export const SaveButton = styled(Button)``

export const TimeContainer = styled.View`
  background: ${MAIN_COLORS.snow};
  flex-direction: row;
  align-items: center;
  height: 46px;
  position: relative;
`

export const TimeText = styled(PrimaryText)`
  border-radius: 5px;
  flex: 1;
  padding: 0 16px;
`

export const OpenTimeBuilderButton = styled(TouchableIcon)`
  background: ${MAIN_COLORS.accent};
  position: absolute;
  right: -8px;
`

export const TimeBuilderItemRow = styled.View`
  flex-direction: row;
  align-items: center;
`

export const StyledTimeBuilderItem = styled(TimeBuilderItem)``
