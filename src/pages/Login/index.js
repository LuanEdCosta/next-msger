import React, { useCallback, useRef, useState, useEffect } from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import { firebase } from '@react-native-firebase/auth'
import { useTranslation } from 'react-i18next'
import { TouchableWithoutFeedback } from 'react-native'

import LoginImage from '@/assets/images/Login.jpg'
import LogoImage from '@/assets/images/Logo.png'
import { DefaultTextInput } from '@/components/TextInput'
import { WhiteSpinner } from '@/components/Spinner'
import Label from '@/components/Label'
import { MAIN_COLORS } from '@/styles'
import { DRAWER_ROUTES, LOGIN_ROUTES } from '@/config/navigation/ScreenRoutes'
import { FORGOT_PASSWORD_PARAMS } from '@/config/navigation/RouteParams'
import { Fw5IconAccent } from '@/components/Fw5Icon'

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
  EmailInput,
  PasswordInput,
  LoginErrorText,
  LoginErrorContainer,
  ForgotPassword,
  CreateAccountButton,
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

  const onNavigateToRecoverPassPage = useCallback(() => {
    navigation.navigate(LOGIN_ROUTES.FORGOT_PASSWORD, {
      [FORGOT_PASSWORD_PARAMS.LOGIN_EMAIL]: email,
    })
  }, [email, navigation])

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

  const onCreateCompany = useCallback(() => {
    navigation.navigate(LOGIN_ROUTES.COMPANY_REGISTRATION)
  }, [navigation])

  return (
    <LoginBackground source={LoginImage}>
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

              <EmailInput
                labelComponent={<Label label={t('emailLabel')} />}
                onLeftIconPress={onFocusEmailInput}
                inputComponent={
                  <DefaultTextInput
                    ref={emailInput}
                    placeholder={t('emailPlaceholder')}
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCompleteType="email"
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

              <PasswordInput
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

              <TouchableWithoutFeedback onPress={onNavigateToRecoverPassPage}>
                <ForgotPassword>{t('forgotPassword')}</ForgotPassword>
              </TouchableWithoutFeedback>

              <LoginButton
                text={t('loginButton')}
                onPress={onLogin}
                disabled={isPerformingLogin}
                iconComponent={
                  isPerformingLogin ? (
                    <WhiteSpinner />
                  ) : (
                    <FontAwesomeIcon
                      size={16}
                      name="chevron-right"
                      color="white"
                    />
                  )
                }
              />

              <CreateAccountButton
                onPress={onCreateCompany}
                text={t('createCompanyButton')}
                iconComponent={<Fw5IconAccent size={16} name="plus-circle" />}
              />
            </LoginBoxContent>
          </LoginBox>
        </Scroll>
      </Container>
    </LoginBackground>
  )
}

export default Login
