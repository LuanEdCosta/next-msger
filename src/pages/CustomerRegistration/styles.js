import styled from 'styled-components/native'

import Input from '@/components/Input'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})``

export const CustomerInput = styled(Input)`
  margin-bottom: 16px;
`

export const Content = styled.View`
  padding: 16px;
`
