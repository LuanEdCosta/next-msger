import styled from 'styled-components/native'

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
})`
  flex: 1;
  background-color: white;
`
