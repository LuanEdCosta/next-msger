import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DefaultTextInput, DefaultTextInputMask } from '@/components/TextInput'
import { EDIT_COMPANY_PARAMS } from '@/config/navigation/RouteParams'
import { ButtonIcon, Fw5IconAccent } from '@/components/Fw5Icon'
import { WhiteSpinner } from '@/components/Spinner'
import InputError from '@/components/InputError'
import { COMPANY_DOC } from '@/config/database'
import Header from '@/components/Header'
import Label from '@/components/Label'

import useRegisterCompany from './useRegisterCompany'
import useEditCompany from './useEditCompany'
import {
  Container,
  Scroll,
  CreateAccountInput,
  Explanation,
  SaveButton,
} from './styles'

const CompanyRegistration = ({ navigation }) => {
  const companyData = navigation.getParam(EDIT_COMPANY_PARAMS.COMPANY_DATA)

  const { t } = useTranslation([
    'CompanyRegistration',
    'Common',
    'Error',
    'Company',
  ])

  const onRegisterCompany = useRegisterCompany()
  const onEditCompany = useEditCompany()

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

  const isEditing = useMemo(() => {
    return !!companyData
  }, [companyData])

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
    ]

    if (!isEditing) {
      notEmptyStrings.push(password, passwordConfirmation)
    }

    const hasNoneEmptyStrings = notEmptyStrings.every((str) => !!str.trim())
    const isPasswordsEqual = password === passwordConfirmation

    return hasNoneEmptyStrings && (isEditing || isPasswordsEqual)
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

      if (isEditing) {
        data.companyId = companyData[COMPANY_DOC.ID]
        await onEditCompany(data, setIsLoading, navigation)
      } else {
        await onRegisterCompany(data, setIsLoading, navigation)
      }
    }
  }

  useEffect(() => {
    if (isEditing) {
      const {
        [COMPANY_DOC.NAME]: currentCompanyName = '',
        [COMPANY_DOC.FANTASY_NAME]: currentFantasyName = '',
        [COMPANY_DOC.CNPJ]: currentCnpj = '',
        [COMPANY_DOC.OWNER_NAME]: currentCompanyOwnerName = '',
        [COMPANY_DOC.OWNER_PHONE]: currentCompanyOwnerPhone = '',
        [COMPANY_DOC.CNPJ]: currentCompanyOwnerCpf = '',
        [COMPANY_DOC.EMAIL]: currentCompanyEmail = '',
      } = companyData

      setCompanyName(currentCompanyName)
      setFantasyName(currentFantasyName)
      setCnpj(currentCnpj)
      setCompanyOwnerName(currentCompanyOwnerName)
      setCompanyOwnerPhone(currentCompanyOwnerPhone)
      setCompanyOwnerCpf(currentCompanyOwnerCpf)
      setEmail(currentCompanyEmail)
    }
  }, [companyData, isEditing])

  return (
    <Container>
      <Header
        i18Namespace="CompanyRegistration"
        i18Title={isEditing ? 'pageTitleWhenEditing' : 'pageTitle'}
        isStackPage
      />

      <Scroll>
        <CreateAccountInput
          labelComponent={
            <Label
              label={t('Company:companyName')}
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
          errorComponent={<InputError />}
          showErrorComponent={isShowingErrors && !companyName.trim()}
        />

        <CreateAccountInput
          labelComponent={
            <Label
              label={t('Company:fantasyName')}
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
          errorComponent={<InputError />}
          showErrorComponent={isShowingErrors && !fantasyName.trim()}
        />

        <CreateAccountInput
          labelComponent={
            <Label
              label={t('Company:cnpj')}
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
          errorComponent={<InputError />}
          showErrorComponent={isShowingErrors && !cnpj.trim()}
        />

        <CreateAccountInput
          labelComponent={
            <Label
              label={t('Company:companyOwnerName')}
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
          errorComponent={<InputError />}
          showErrorComponent={isShowingErrors && !companyOwnerName.trim()}
        />

        <CreateAccountInput
          labelComponent={
            <Label
              label={t('Company:companyOwnerPhone')}
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
          errorComponent={<InputError />}
          showErrorComponent={isShowingErrors && !companyOwnerPhone.trim()}
        />

        <CreateAccountInput
          labelComponent={
            <Label
              label={t('Company:companyOwnerCpf')}
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
          errorComponent={<InputError />}
          showErrorComponent={isShowingErrors && !companyOwnerCpf.trim()}
        />

        <CreateAccountInput
          labelComponent={
            <Label
              label={t('Company:email')}
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
          errorComponent={<InputError />}
          showErrorComponent={isShowingErrors && !email.trim()}
        />

        {!isEditing && (
          <>
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
              errorComponent={<InputError />}
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
                  text={t(
                    !passwordConfirmation.trim()
                      ? 'Error:emptyField'
                      : 'passwordsNotEqualError',
                  )}
                />
              }
              showErrorComponent={
                isShowingErrors &&
                (!passwordConfirmation.trim() ||
                  password !== passwordConfirmation)
              }
            />
          </>
        )}

        <SaveButton
          onPress={onSaveButtonPressed}
          text={t(isEditing ? 'editButton' : 'saveButton')}
          disabled={isLoading}
          iconComponent={
            isLoading ? <WhiteSpinner /> : <ButtonIcon name="check-circle" />
          }
        />

        {!isEditing && <Explanation>{t('explanation')}</Explanation>}
      </Scroll>
    </Container>
  )
}

CompanyRegistration.navigationOptions = () => ({
  headerShown: false,
})

export default CompanyRegistration
