import styled from 'styled-components/native'

import Button from '@/components/Button'

export const Container = styled.View``

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 0,
  },
})``

export const ActionButton = styled(Button)`
  margin-right: 16px;
  height: 64px;
`
