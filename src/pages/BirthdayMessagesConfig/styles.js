import styled from 'styled-components/native'

import Input from '@/components/Input'
import { MAIN_COLORS } from '@/styles'
import Button from '@/components/Button'
import { DefaultText, PrimaryText } from '@/components/Text'

export const Container = styled.View`
  flex: 1;
  background-color: white;
`

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})``

export const Content = styled.View`
  padding: 16px;
`

export const MsgConfigInput = styled(Input)`
  margin-bottom: 16px;
`

export const ExplanationContainer = styled.View`
  padding: 16px 16px 0 16px;
  background: ${MAIN_COLORS.snowLight};
  border-top-width: 1px;
  border-color: ${MAIN_COLORS.lightGrey};
`

export const ExplanationSectionTitle = styled(PrimaryText)`
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
`

export const ExplanationTitle = styled(PrimaryText)`
  font-weight: bold;
`

export const ExplanationText = styled(DefaultText)`
  margin-bottom: 16px;
`

export const InputActions = styled.View`
  flex-direction: row;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${MAIN_COLORS.darkGrey};
`

export const InputActionButton = styled(Button).attrs({
  textStyle: {
    color: MAIN_COLORS.primaryText,
    fontSize: 12,
  },
})`
  flex: 1;
  line-height: 20px;
  background: ${MAIN_COLORS.snowLight};
  height: 40px;
  border-radius: 0;
`
