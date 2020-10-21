import styled from 'styled-components/native'

import Input from '@/components/Input'
import { MAIN_COLORS } from '@/styles'
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
