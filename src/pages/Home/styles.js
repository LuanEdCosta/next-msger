import styled from 'styled-components/native'

import { PrimaryText, DefaultText } from '@/components/Text'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})``

export const Content = styled.View`
  padding: 16px 16px 0 16px;
`

export const WelcomeTitle = styled(PrimaryText)`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 8px;
`

export const WelcomeMessage = styled(DefaultText)``

export const AdContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`
