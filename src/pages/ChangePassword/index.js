import React, { useState, useRef, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import Header from '@/components/Header'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import { Fw5IconAccent, ButtonIcon } from '@/components/Fw5Icon'
import { WhiteSpinner } from '@/components/Spinner'

import {
  Container,
  Scroll,
  Input,
  TextInput,
  ChangePasswordButton,
} from './styles'
import useChangePassword from './useChangePassword'

const ChangePassword = ({ navigation }) => {
  const { t } = useTranslation(['ChangePassword', 'Error'])

  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isShowingErrors, setIsShowingErrors] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')

  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const onChangePassword = useChangePassword(setIsChangingPassword, navigation)

  const isPasswordsEqual = useMemo(() => {
    return password === confirmPassword
  }, [confirmPassword, password])

  const onValidate = useCallback(() => {
    const isValid =
      !!currentPassword.trim() &&
      !!password.trim() &&
      !!confirmPassword.trim() &&
      isPasswordsEqual

    setIsShowingErrors(!isValid)
    if (!isValid) return

    onChangePassword(currentPassword, password)
  }, [
    confirmPassword,
    currentPassword,
    isPasswordsEqual,
    onChangePassword,
    password,
  ])

  return (
    <Container>
      <Header i18Namespace="ChangePassword" i18Title="pageTitle" isStackPage />

      <Scroll>
        <Input
          showErrorComponent={isShowingErrors && !currentPassword.trim()}
          errorComponent={<InputError />}
          labelComponent={
            <Label
              label={t('currentPassword')}
              iconComponent={<Fw5IconAccent name="key" solid />}
              isRequired
            />
          }
          inputComponent={
            <TextInput
              placeholder={t('currentPasswordPh')}
              keyboardType="password"
              returnKeyType="next"
              blurOnSubmit={false}
              onChangeText={setCurrentPassword}
              value={currentPassword}
              secureTextEntry
              onSubmitEditing={() => {
                passwordRef.current.focus()
              }}
            />
          }
        />

        <Input
          showErrorComponent={isShowingErrors && !password.trim()}
          errorComponent={<InputError />}
          labelComponent={
            <Label
              label={t('password')}
              iconComponent={<Fw5IconAccent name="lock" solid />}
              isRequired
            />
          }
          inputComponent={
            <TextInput
              ref={passwordRef}
              placeholder={t('passwordPh')}
              keyboardType="password"
              returnKeyType="next"
              blurOnSubmit={false}
              onChangeText={setPassword}
              value={password}
              secureTextEntry
              onSubmitEditing={() => {
                confirmPasswordRef.current.focus()
              }}
            />
          }
        />

        <Input
          showErrorComponent={
            isShowingErrors && (!confirmPassword.trim() || !isPasswordsEqual)
          }
          errorComponent={
            <InputError
              text={t(
                !confirmPassword.trim()
                  ? 'Error:emptyField'
                  : 'passwordsNotEqualError',
              )}
            />
          }
          labelComponent={
            <Label
              label={t('confirmPassword')}
              iconComponent={<Fw5IconAccent name="unlock-alt" solid />}
              isRequired
            />
          }
          inputComponent={
            <TextInput
              ref={confirmPasswordRef}
              placeholder={t('confirmPasswordPh')}
              returnKeyType="done"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry
            />
          }
        />

        <ChangePasswordButton
          text={t('changePassButton')}
          onPress={onValidate}
          iconComponent={
            isChangingPassword ? (
              <WhiteSpinner />
            ) : (
              <ButtonIcon name="check-circle" />
            )
          }
        />
      </Scroll>
    </Container>
  )
}

ChangePassword.navigationOptions = () => ({
  headerShown: false,
})

export default ChangePassword
