import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ButtonIcon, Fw5IconAccent } from '@/components/Fw5Icon'
import { WhiteSpinner } from '@/components/Spinner'
import Label from '@/components/Label'
import Header from '@/components/Header'
import { DefaultTextInput, DefaultTextInputMask } from '@/components/TextInput'
import InputError from '@/components/InputError'

import useRegisterCompany from './useRegisterCompany'
import {
  Container,
  Scroll,
  CreateAccountInput,
  Explanation,
  SaveButton,
} from './styles'

const CompanyRegistration = ({ navigation }) => {
  const { t } = useTranslation(['CompanyRegistration', 'Common', 'Error'])
  const onRegisterCompany = useRegisterCompany()

  const [companyName, setCompanyName] = useState('')
  const [fantasyName, setFantasyName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [companyOwnerName, setCompanyOwnerName] = useState('')
  const [companyOwnerPhone, setCompanyOwnerPhone] = useState('')
  const [companyOwnerCpf, setCompanyOwnerCpf] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [isShowingErrors, setIsShowingErrors] = useState(false)

  const companyNameInput = useRef(null)
  const fantasyNameInput = useRef(null)
  const cnpjInput = useRef(null)
  const companyOwnerNameInput = useRef(null)
  const companyOwnerPhoneInput = useRef(null)
  const companyOwnerCpfInput = useRef(null)
  const emailInput = useRef(null)
  const passwordInput = useRef(null)
  const passwordConfirmationInput = useRef(null)

  const onValidate = () => {
    const notEmptyStrings = [
      companyName,
      fantasyName,
      cnpj,
      companyOwnerName,
      companyOwnerPhone,
      companyOwnerCpf,
      email,
      password,
      passwordConfirmation,
    ]

    const hasNoneEmptyStrings = notEmptyStrings.every((str) => !!str.trim())
    const isPasswordsEqual = password === passwordConfirmation

    return hasNoneEmptyStrings && isPasswordsEqual
  }

  const onSaveButtonPressed = async () => {
    setIsShowingErrors(true)
    if (onValidate()) {
      const data = {
        companyName,
        fantasyName,
        cnpj,
        companyOwnerName,
        companyOwnerPhone,
        companyOwnerCpf,
        email,
        password,
      }

      await onRegisterCompany(data, setIsLoading, navigation)
    }
  }

  return (
    <Container>
      <Header
        i18Namespace="CompanyRegistration"
        i18Title="pageTitle"
        isStackPage
      />

      <Scroll>
        <CreateAccountInput
          labelComponent={
            <Label
              label={t('companyName')}
              iconComponent={<Fw5IconAccent name="file-alt" solid />}
              isRequired
            />
          }
          inputComponent={
            <DefaultTextInput
              ref={companyNameInput}
              returnKeyType="next"
              value={companyName}
              blurOnSubmit={false}
              editable={!isLoading}
              placeholder={t('companyNamePh')}
              onChangeText={setCompanyName}
              onSubmitEditing={() => {
                fantasyNameInput.current.focus()
                setFantasyName(companyName)
              }}
            />
          }
          errorComponent={<InputError show text={t('Error:emptyField')} />}
          showErrorComponent={isShowingErrors && !companyName.trim()}
        />

        <CreateAccountInput
          labelComponent={
            <Label
              label={t('fantasyName')}
              iconComponent={<Fw5IconAccent name="signature" solid />}
              isRequired
            />
          }
          inputComponent={
            <DefaultTextInput
              ref={fantasyNameInput}
              returnKeyType="next"
              value={fantasyName}
              blurOnSubmit={false}
              editable={!isLoading}
              placeholder={t('fantasyNamePh')}
              onChangeText={setFantasyName}
              onSubmitEditing={() => {
                cnpjInput.current.focus()
              }}
            />
          }
          errorComponent={<InputError show text={t('Error:emptyField')} />}
          showErrorComponent={isShowingErrors && !fantasyName.trim()}
        />

        <CreateAccountInput
          labelComponent={
            <Label
              label={t('cnpj')}
              iconComponent={<Fw5IconAccent name="file-contract" solid />}
              isRequired
            />
          }
          inputComponent={
            <DefaultTextInputMask
              refInput={(ref) => {
                cnpjInput.current = ref
              }}
              type="cnpj"
              returnKeyType="next"
              value={cnpj}
              blurOnSubmit={false}
              editable={!isLoading}
              placeholder={t('Common:cnpjPh')}
              onChangeText={setCnpj}
              onSubmitEditing={() => {
                companyOwnerNameInput.current.focus()
              }}
            />
          }
          errorComponent={<InputError show text={t('Error:emptyField')} />}
          showErrorComponent={isShowingErrors && !cnpj.trim()}
        />

        <CreateAccountInput
          labelComponent={
            <Label
              label={t('companyOwnerName')}
              iconComponent={<Fw5IconAccent name="user-tie" solid />}
              isRequired
            />
          }
          inputComponent={
            <DefaultTextInput
              ref={companyOwnerNameInput}
              returnKeyType="next"
              value={companyOwnerName}
              blurOnSubmit={false}
              editable={!isLoading}
              placeholder={t('companyOwnerNamePh')}
              onChangeText={setCompanyOwnerName}
              onSubmitEditing={() => {
                companyOwnerPhoneInput.current.focus()
              }}
            />
          }
          errorComponent={<InputError show text={t('Error:emptyField')} />}
          showErrorComponent={isShowingErrors && !companyOwnerName.trim()}
        />

        <CreateAccountInput
          labelComponent={
            <Label
              label={t('companyOwnerPhone')}
              iconComponent={<Fw5IconAccent name="mobile" solid />}
              isRequired
            />
          }
          inputComponent={
            <DefaultTextInputMask
              refInput={(ref) => {
                companyOwnerPhoneInput.current = ref
              }}
              type="cel-phone"
              returnKeyType="next"
              value={companyOwnerPhone}
              blurOnSubmit={false}
              editable={!isLoading}
              placeholder={t('companyOwnerPhonePh')}
              onChangeText={setCompanyOwnerPhone}
              onSubmitEditing={() => {
                companyOwnerCpfInput.current.focus()
              }}
            />
          }
          errorComponent={<InputError show text={t('Error:emptyField')} />}
          showErrorComponent={isShowingErrors && !companyOwnerPhone.trim()}
        />

        <CreateAccountInput
          labelComponent={
            <Label
              label={t('companyOwnerCpf')}
              iconComponent={<Fw5IconAccent name="id-card" solid />}
              isRequired
            />
          }
          inputComponent={
            <DefaultTextInputMask
              refInput={(ref) => {
                companyOwnerCpfInput.current = ref
              }}
              type="cpf"
              returnKeyType="next"
              value={companyOwnerCpf}
              blurOnSubmit={false}
              editable={!isLoading}
              placeholder={t('Common:cpfPh')}
              onChangeText={setCompanyOwnerCpf}
              onSubmitEditing={() => {
                emailInput.current.focus()
              }}
            />
          }
          errorComponent={<InputError show text={t('Error:emptyField')} />}
          showErrorComponent={isShowingErrors && !companyOwnerCpf.trim()}
        />

        <CreateAccountInput
          labelComponent={
            <Label
              label={t('email')}
              iconComponent={<Fw5IconAccent name="envelope" solid />}
              isRequired
            />
          }
          inputComponent={
            <DefaultTextInput
              ref={emailInput}
              returnKeyType="next"
              value={email}
              autoCapitalize={false}
              blurOnSubmit={false}
              editable={!isLoading}
              placeholder={t('emailPh')}
              onChangeText={setEmail}
              onSubmitEditing={() => {
                passwordInput.current.focus()
              }}
            />
          }
          errorComponent={<InputError show text={t('Error:emptyField')} />}
          showErrorComponent={isShowingErrors && !email.trim()}
        />

        <CreateAccountInput
          labelComponent={
            <Label
              label={t('password')}
              iconComponent={<Fw5IconAccent name="lock" solid />}
              isRequired
            />
          }
          inputComponent={
            <DefaultTextInput
              ref={passwordInput}
              returnKeyType="next"
              value={password}
              blurOnSubmit={false}
              editable={!isLoading}
              placeholder={t('passwordPh')}
              onChangeText={setPassword}
              onSubmitEditing={() => {
                passwordConfirmationInput.current.focus()
              }}
              secureTextEntry
            />
          }
          errorComponent={<InputError show text={t('Error:emptyField')} />}
          showErrorComponent={isShowingErrors && !password.trim()}
        />

        <CreateAccountInput
          labelComponent={
            <Label
              label={t('passwordConfirmation')}
              iconComponent={<Fw5IconAccent name="lock" solid />}
              isRequired
            />
          }
          inputComponent={
            <DefaultTextInput
              ref={passwordConfirmationInput}
              value={passwordConfirmation}
              editable={!isLoading}
              placeholder={t('passwordConfirmationPh')}
              onChangeText={setPasswordConfirmation}
              secureTextEntry
            />
          }
          errorComponent={
            <InputError
              show
              text={t(
                !passwordConfirmation.trim()
                  ? 'Error:emptyField'
                  : 'passwordsNotEqualError',
              )}
            />
          }
          showErrorComponent={
            isShowingErrors &&
            (!passwordConfirmation.trim() || password !== passwordConfirmation)
          }
        />

        <SaveButton
          onPress={onSaveButtonPressed}
          text={t('saveButton')}
          disabled={isLoading}
          iconComponent={
            isLoading ? <WhiteSpinner /> : <ButtonIcon name="check-circle" />
          }
        />

        <Explanation>{t('explanation')}</Explanation>
      </Scroll>
    </Container>
  )
}

CompanyRegistration.navigationOptions = () => ({
  headerShown: false,
})

export default CompanyRegistration
