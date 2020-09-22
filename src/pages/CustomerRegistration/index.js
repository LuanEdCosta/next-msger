import React, { useCallback, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import Header from '@/components/Header'
import Button from '@/components/Button'
import { ButtonIcon, Fw5IconAccent } from '@/components/Fw5Icon'
import Label from '@/components/Label'
import { DefaultTextInput, DefaultTextInputMask } from '@/components/TextInput'
import InputError from '@/components/InputError'
import { WhiteSpinner } from '@/components/Spinner'
import { COLLECTIONS, CUSTOMER_DOC } from '@/config/database'
import { useErrorAlert, useUserData } from '@/hooks'
import { ADMOB_BANNER_ID } from '@/config/ads'

import { Container, Scroll, CustomerInput, Content } from './styles'

const CustomerRegistration = () => {
  const { t } = useTranslation(['CustomerRegistration', 'InputMasks'])
  const showErrorAlert = useErrorAlert()
  const { companyId } = useUserData()

  const [isShowingErrors, setIsShowingErrors] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [phone, setPhone] = useState('')

  const emailInput = useRef(null)
  let whatsappInput = useRef(null)
  let phoneInput = useRef(null)

  const onValidateInputs = useCallback(() => {
    const valuesArray = [name, email, whatsapp]
    return valuesArray.every((str) => !!str && !!str.trim())
  }, [email, name, whatsapp])

  const onClearData = useCallback(() => {
    setName('')
    setEmail('')
    setWhatsapp('')
    setPhone('')
    setIsShowingErrors(false)
  }, [])

  const onSaveCustomer = useCallback(async () => {
    if (!isShowingErrors) setIsShowingErrors(true)
    if (!onValidateInputs()) return
    setIsSaving(true)

    try {
      await firestore()
        .collection(COLLECTIONS.COMPANIES)
        .doc(companyId)
        .collection(COLLECTIONS.CUSTOMERS)
        .add({
          [CUSTOMER_DOC.NAME]: name,
          [CUSTOMER_DOC.EMAIL]: email,
          [CUSTOMER_DOC.WHATSAPP]: whatsapp,
          [CUSTOMER_DOC.PHONE]: phone,
          [CUSTOMER_DOC.CREATED_AT]: firestore.Timestamp.now(),
        })

      onClearData()
    } catch (e) {
      showErrorAlert()
    } finally {
      setIsSaving(false)
    }
  }, [
    companyId,
    email,
    isShowingErrors,
    name,
    onClearData,
    onValidateInputs,
    phone,
    showErrorAlert,
    whatsapp,
  ])

  return (
    <Container>
      <Header i18Namespace="NavigationDrawer" i18Title="customerRegistration" />

      <Scroll>
        <BannerAd
          unitId={ADMOB_BANNER_ID}
          size={BannerAdSize.SMART_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />

        <Content>
          <CustomerInput
            showErrorComponent={isShowingErrors && !name.trim()}
            errorComponent={<InputError />}
            labelComponent={
              <Label
                label={t('nameLabel')}
                isRequired
                iconComponent={<Fw5IconAccent name="signature" solid />}
              />
            }
            inputComponent={
              <DefaultTextInput
                placeholder={t('namePlaceholder')}
                returnKeyType="next"
                autoCapitalize="words"
                autoCompleteType="name"
                blurOnSubmit={false}
                onChangeText={setName}
                value={name}
                onSubmitEditing={() => {
                  emailInput.current.focus()
                }}
              />
            }
          />

          <CustomerInput
            showErrorComponent={isShowingErrors && !email.trim()}
            errorComponent={<InputError />}
            labelComponent={
              <Label
                label={t('emailLabel')}
                isRequired
                iconComponent={<Fw5IconAccent name="envelope" solid />}
              />
            }
            inputComponent={
              <DefaultTextInput
                ref={emailInput}
                placeholder={t('emailPlaceholder')}
                returnKeyType="next"
                autoCapitalize="none"
                autoCompleteType="email"
                blurOnSubmit={false}
                onChangeText={setEmail}
                value={email}
                onSubmitEditing={() => {
                  whatsappInput.focus()
                }}
              />
            }
          />

          <CustomerInput
            showErrorComponent={isShowingErrors && !whatsapp.trim()}
            errorComponent={<InputError />}
            labelComponent={
              <Label
                label={t('whatsappLabel')}
                isRequired
                iconComponent={<Fw5IconAccent name="mobile" solid />}
              />
            }
            inputComponent={
              <DefaultTextInputMask
                type="cel-phone"
                placeholder={t('InputMasks:cellphonePlaceholder')}
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={setWhatsapp}
                value={whatsapp}
                refInput={(ref) => {
                  whatsappInput = ref
                }}
                onSubmitEditing={() => {
                  phoneInput.focus()
                }}
              />
            }
          />

          <CustomerInput
            labelComponent={
              <Label
                label={t('phoneLabel')}
                iconComponent={<Fw5IconAccent name="phone" solid />}
              />
            }
            inputComponent={
              <DefaultTextInputMask
                type="cel-phone"
                placeholder={t('InputMasks:phonePlaceholder')}
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={setPhone}
                value={phone}
                refInput={(ref) => {
                  phoneInput = ref
                }}
              />
            }
          />

          <Button
            text={t('saveButton')}
            onPress={onSaveCustomer}
            disabled={isSaving}
            iconComponent={
              isSaving ? <WhiteSpinner /> : <ButtonIcon name="check" />
            }
          />
        </Content>
      </Scroll>
    </Container>
  )
}

export default CustomerRegistration
