import styled from 'styled-components/native'

import Input from '@/components/Input'
import Button from '@/components/Button'

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
