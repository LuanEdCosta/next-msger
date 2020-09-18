import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: white;
`

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  flex: 1;
`

export const AdContainer = styled.View`
  margin: 16px;
  align-items: center;
`
