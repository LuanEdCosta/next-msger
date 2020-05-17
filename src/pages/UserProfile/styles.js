import styled from 'styled-components/native'

import { MAIN_COLORS } from '@/styles'
import InitialsBox from '@/components/InitialsBox'
import { UppercaseBoldText, DefaultText } from '@/components/Text'
import Button from '@/components/Button'

export const Container = styled.View`
  flex: 1;
  background-color: white;
`

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})``

export const ProfileHeader = styled.View`
  height: 150px;
  position: relative;
`

export const ProfileHeaderBackground = styled.View`
  background-color: ${MAIN_COLORS.accent};
  height: 100px;
`

export const InitialsComponent = styled(InitialsBox)`
  position: absolute;
  top: 50px;
  margin-left: 16px;
  height: 100px;
  width: 100px;
  border-width: 3px;
`

export const Content = styled.View`
  padding: 16px;
  flex: 1;
`

export const UserName = styled(UppercaseBoldText)`
  font-size: 16px;
  color: ${MAIN_COLORS.primaryText};
  margin-bottom: 8px;
`

export const UserEmail = styled(DefaultText)`
  margin-bottom: 16px;
`

export const SignOutButton = styled(Button)`
  margin: 16px;
`
