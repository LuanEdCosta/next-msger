import styled from 'styled-components/native'

import Input from '@/components/Input'
import Checkbox from '@/components/Checkbox'
import { DefaultText } from '@/components/Text'

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

export const CustomerCheckbox = styled(Checkbox)`
  margin-bottom: 16px;
`

export const CustomerCheckboxText = styled(DefaultText)`
  margin-left: 16px;
`

export const Content = styled.View`
  padding: 16px;
`
