import React, { useCallback, useRef, useState, useEffect } from 'react'
import { StatusBar } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import { firebase } from '@react-native-firebase/auth'
import LoginImage from '@/assets/images/Login.jpg'
import LogoImage from '@/assets/images/Logo.png'
import { useTranslation } from 'react-i18next'
import { DefaultTextInput } from '@/components/TextInput'
import { WhiteSpinner } from '@/components/Spinner'
import Label from '@/components/Label'
import { MAIN_COLORS } from '@/styles'
import { DRAWER_ROUTES } from '@/config/navigation/ScreenRoutes'
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
  LoginErrorText,
  LoginErrorContainer,
} from './styles'

const Login = ({ navigation }) => {
  const { t } = useTranslation(['Login', 'Common'])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isShowingPassword, setIsShowingPassword] = useState(false)
  const [isShowingError, setIsShowingError] = useState(false)
  const [isPerformingLogin, setIsPerformingLogin] = useState(false)
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

  const onLogin = useCallback(async () => {
    try {
      if (!email.trim()) {
        onFocusEmailInput()
        return
      }

      if (!password) {
        onFocusPasswordInput()
        return
      }

      setIsPerformingLogin(true)
      await firebase.auth().signInWithEmailAndPassword(email, password)
      navigation.navigate(DRAWER_ROUTES.HOME)
    } catch (e) {
      setIsShowingError(true)
    }
    setIsPerformingLogin(false)
  }, [email, navigation, onFocusEmailInput, onFocusPasswordInput, password])

  useEffect(() => {
    setIsShowingError(false)
  }, [email, password])

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
              {isShowingError && (
                <LoginErrorContainer>
                  <FontAwesomeIcon
                    size={14}
                    name="exclamation-circle"
                    color={MAIN_COLORS.danger}
                  />
                  <LoginErrorText>{t('wrongEmailOrPassword')}</LoginErrorText>
                </LoginErrorContainer>
              )}

              <LoginInput
                labelComponent={<Label label={t('emailLabel')} />}
                onLeftIconPress={onFocusEmailInput}
                inputComponent={
                  <DefaultTextInput
                    ref={emailInput}
                    placeholder={t('emailPlaceholder')}
                    returnKeyType="next"
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    onSubmitEditing={onFocusPasswordInput}
                    editable={!isPerformingLogin}
                    onChangeText={setEmail}
                    value={email}
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
                    editable={!isPerformingLogin}
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
                disabled={isPerformingLogin}
                iconComponent={
                  isPerformingLogin ? (
                    <WhiteSpinner />
                  ) : (
                    <FontAwesomeIcon
                      size={14}
                      name="chevron-right"
                      color="white"
                    />
                  )
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
