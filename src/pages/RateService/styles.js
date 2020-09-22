import styled from 'styled-components/native'

import Rating from '@/components/Rating'
import Button from '@/components/Button'
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

export const RatingStars = styled(Rating)`
  margin: 32px 0;
  justify-content: space-between;
`

export const SaveButton = styled(Button)`
  margin-bottom: 24px;
`

export const CommentInput = styled(Input)`
  margin-bottom: 24px;
`
