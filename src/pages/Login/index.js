import React, { useCallback } from 'react'
import { StatusBar } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import LoginImage from '@/assets/images/Login.jpg'
import LogoImage from '@/assets/images/Logo.png'
import { useTranslation } from 'react-i18next'
import { DefaultTextInput } from '@/components/TextInput'
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

  const onLogin = useCallback(() => {}, [])

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
                inputComponent={
                  <DefaultTextInput placeholder={t('emailPlaceholder')} />
                }
              />

              <LoginInput
                inputComponent={
                  <DefaultTextInput
                    placeholder={t('passwordLabel')}
                    secureTextEntry
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
