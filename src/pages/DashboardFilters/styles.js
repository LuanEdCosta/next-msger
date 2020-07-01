import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background: white;
`

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    padding: 16,
  },
})``
