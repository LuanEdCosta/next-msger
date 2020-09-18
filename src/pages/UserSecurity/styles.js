import styled from 'styled-components/native'

import NavigationOption from '@/components/NavigationOption'

export const Container = styled.View`
  flex: 1;
  background-color: white;
`

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    padding: 16,
  },
})`
  flex: 1;
`

export const Option = styled(NavigationOption)`
  border-width: 1px;
  border-radius: 5px;
`

export const AdContainer = styled.View`
  align-items: center;
  margin: 16px;
`
