import styled from 'styled-components/native'

import { UppercaseBoldText, AccentText, DefaultText } from '@/components/Text'
import { MAIN_COLORS } from '@/styles'
import { Fw5Icon } from '@/components/Fw5Icon'
import Button from '@/components/Button'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`

export const HomePageContent = styled.View`
  padding: 16px 16px 0 16px;
  border-top-width: 1px;
  border-color: ${MAIN_COLORS.lightGrey};
`

export const ActionsTitle = styled(UppercaseBoldText)`
  padding: 16px 16px 0 16px;
`

export const StatisticsTitle = styled(UppercaseBoldText)`
  margin-bottom: 16px;
`

export const StatisticsContainer = styled.View`
  margin-bottom: 8px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${MAIN_COLORS.lightGrey};
  flex-direction: row;
  align-items: center;
`

export const StatisticsItemTextContainer = styled.View`
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
  flex: 1;
`

export const StatisticsItemText = styled(DefaultText)`
  margin-left: 16px;
  padding-right: 8px;
`

export const StatisticsItemIcon = styled(Fw5Icon)`
  min-width: 17px;
`

export const StatisticsItemValue = styled(AccentText)`
  font-weight: bold;
  text-align: center;
  padding: 24px;
  background: ${MAIN_COLORS.snow};
  border-left-width: 1px;
  border-color: ${MAIN_COLORS.lightGrey};
  min-width: 46px;
`

export const NavigateToDashboardButton = styled(Button)`
  margin-top: 8px;
  margin-bottom: 16px;
  height: 56px;
`
