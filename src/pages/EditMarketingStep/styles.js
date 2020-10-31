import styled from 'styled-components/native'

import Input from '@/components/Input'
import Button from '@/components/Button'
import TouchableIcon from '@/components/TouchableIcon'
import { MAIN_COLORS } from '@/styles'
import { TimeBuilderItem } from '@/components/TimeBuilderModal'
import { DefaultText } from '@/components/Text'

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
  flex-direction: row;
  align-items: center;
  position: relative;
`

export const TimeText = styled(DefaultText)`
  flex: 1;
  padding: 8px 16px;
  line-height: 20px;
`

export const OpenTimeBuilderButton = styled(TouchableIcon)`
  background: ${MAIN_COLORS.accent};
  border-radius: 0;
`

export const TimeBuilderItemRow = styled.View`
  flex-direction: row;
  align-items: center;
`

export const StyledTimeBuilderItem = styled(TimeBuilderItem)``

export const TimeBuilderExplanation = styled(DefaultText)`
  line-height: 20px;
`
