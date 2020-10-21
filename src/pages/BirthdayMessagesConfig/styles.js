import styled from 'styled-components/native'

import Input from '@/components/Input'

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
