import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { UppercaseBoldText } from '@/components/Text'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { MAIN_COLORS, FONT_SIZES } from '@/styles'

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
})

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
`
export const LoginBackground = styled.ImageBackground`
  flex: 1;
`

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: styles.scrollView,
})``

export const LoginBox = styled.View`
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  max-height: 400px;
  margin: 0 24px;
`

export const AppNameContainer = styled.View`
  padding: 8px;
  flex-direction: row;
  align-items: center;
  background-color: ${MAIN_COLORS.snowLight};
`

export const AppLogo = styled.Image`
  height: 40px;
  width: 40px;
`

export const AppName = styled(UppercaseBoldText)`
  color: ${MAIN_COLORS.accent};
  font-size: ${FONT_SIZES.FONT_SIZE_3}px;
  margin-left: 16px;
`

export const LoginBoxContent = styled.View`
  padding: 16px;
`

export const LoginButton = styled(Button)``
export const LoginInput = styled(Input)`
  margin-bottom: 16px;
`
