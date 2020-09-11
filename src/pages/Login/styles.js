import styled from 'styled-components/native'

import { UppercaseBoldText, DefaultText } from '@/components/Text'
import { MAIN_COLORS, FONT_SIZES } from '@/styles'
import Button from '@/components/Button'
import Input from '@/components/Input'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
`
export const LoginBackground = styled.ImageBackground`
  flex: 1;
`

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
})``

export const LoginBox = styled.View`
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  margin: 0 24px;
`

export const AppNameContainer = styled.View`
  padding: 8px;
  flex-direction: row;
  align-items: center;
  background-color: ${MAIN_COLORS.snowLight};
  border-bottom-width: 1px;
  border-bottom-color: ${MAIN_COLORS.snow};
`

export const AppLogo = styled.Image`
  height: 40px;
  width: 40px;
`

export const AppName = styled(UppercaseBoldText)`
  color: ${MAIN_COLORS.primaryText};
  font-size: ${FONT_SIZES.FONT_SIZE_3}px;
  margin-left: 16px;
`

export const LoginBoxContent = styled.View`
  padding: 16px;
`

export const EmailInput = styled(Input)`
  margin-bottom: 16px;
`

export const PasswordInput = styled(Input)``

export const LoginErrorText = styled(DefaultText)`
  color: ${MAIN_COLORS.danger};
  flex: 1;
  margin-left: 8px;
`

export const LoginErrorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`

export const ForgotPassword = styled(DefaultText)`
  text-decoration: underline;
  align-self: flex-end;
  margin-bottom: 16px;
  padding: 8px;
`

export const LoginButton = styled(Button)`
  height: 50px;
  margin-bottom: 8px;
`

export const CreateAccountButton = styled(Button).attrs({
  textStyle: {
    color: MAIN_COLORS.accent,
  },
})`
  height: 50px;
  background: white;
  border: 2px ${MAIN_COLORS.accent};
`
