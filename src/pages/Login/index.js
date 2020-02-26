import React, { useCallback, useRef, useState } from 'react'
import { StatusBar } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import LoginImage from '@/assets/images/Login.jpg'
import LogoImage from '@/assets/images/Logo.png'
import { useTranslation } from 'react-i18next'
import { DefaultTextInput } from '@/components/TextInput'
import Label from '@/components/Label'
import { MAIN_COLORS } from '@/styles'
import {
  Container,
  Scroll,
  LoginBackground,
  LoginBox,
  AppNameContainer,
  AppLogo,
  AppName,
  LoginButton,
  LoginBoxContent,
  LoginInput,
} from './styles'

const Login = () => {
  const { t } = useTranslation(['Login', 'Common'])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isShowingPassword, setIsShowingPassword] = useState(false)
  const emailInput = useRef(null)
  const passwordInput = useRef(null)

  const onFocusEmailInput = useCallback(() => {
    emailInput.current.focus()
  }, [])

  const onFocusPasswordInput = useCallback(() => {
    passwordInput.current.focus()
  }, [])

  const onTogglePasswordVisibility = useCallback(() => {
    setIsShowingPassword(!isShowingPassword)
  }, [isShowingPassword])

  const onLogin = useCallback(() => {
    if (!email.trim()) {
      onFocusEmailInput()
      return
    }

    if (!password) {
      onFocusPasswordInput()
      // return
    }

    // TODO: LOGIN
  }, [email, onFocusEmailInput, onFocusPasswordInput, password])

  return (
    <LoginBackground source={LoginImage}>
      <StatusBar hidden />
      <Container>
        <Scroll>
          <LoginBox>
            <AppNameContainer>
              <AppLogo source={LogoImage} />
              <AppName>{t('Common:appName')}</AppName>
            </AppNameContainer>
            <LoginBoxContent>
              <LoginInput
                labelComponent={<Label label={t('emailLabel')} />}
                onLeftIconPress={onFocusEmailInput}
                inputComponent={
                  <DefaultTextInput
                    ref={emailInput}
                    placeholder={t('emailPlaceholder')}
                    value={email}
                    onChangeText={setEmail}
                  />
                }
                inputIconComponent={
                  <FontAwesomeIcon
                    size={14}
                    name="envelope"
                    color={MAIN_COLORS.accent}
                    solid
                  />
                }
              />

              <LoginInput
                labelComponent={<Label label={t('passwordLabel')} />}
                onLeftIconPress={onFocusPasswordInput}
                onActionPress={onTogglePasswordVisibility}
                showAction={!!password}
                inputComponent={
                  <DefaultTextInput
                    ref={passwordInput}
                    placeholder={t('passwordPlaceholder')}
                    secureTextEntry={!isShowingPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                }
                inputIconComponent={
                  <FontAwesomeIcon
                    size={14}
                    name="lock"
                    color={MAIN_COLORS.accent}
                  />
                }
                actionIconComponent={
                  <FontAwesomeIcon
                    size={14}
                    name={isShowingPassword ? 'eye-slash' : 'eye'}
                    color={MAIN_COLORS.secondaryText}
                  />
                }
              />

              <LoginButton
                text={t('loginButton')}
                onPress={onLogin}
                iconComponent={
                  <FontAwesomeIcon
                    size={14}
                    name="chevron-right"
                    color="white"
                  />
                }
              />
            </LoginBoxContent>
          </LoginBox>
        </Scroll>
      </Container>
    </LoginBackground>
  )
}

export default Login
