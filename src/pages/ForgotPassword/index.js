import React, { useState, useCallback } from 'react'
import auth from '@react-native-firebase/auth'
import { useTranslation } from 'react-i18next'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import Header from '@/components/Header'
import { useErrorAlert } from '@/hooks'
import { DefaultTextInput } from '@/components/TextInput'
import Label from '@/components/Label'
import { WhiteSpinner } from '@/components/Spinner'
import { ButtonIcon, Fw5IconAccent } from '@/components/Fw5Icon'
import { FORGOT_PASSWORD_PARAMS } from '@/config/navigation/RouteParams'
import { ADMOB_BANNER_ID } from '@/config/ads'

import {
  Container,
  Scroll,
  EmailInput,
  SendButton,
  Explanation,
} from './styles'

const ForgotPassword = ({ navigation }) => {
  const loginEmail = navigation.getParam(FORGOT_PASSWORD_PARAMS.LOGIN_EMAIL, '')
  const { t } = useTranslation('ForgotPassword')
  const showError = useErrorAlert()

  const [email, setEmail] = useState(loginEmail)
  const [isSending, setIsSending] = useState(false)

  const onSendPasswordResetEmail = useCallback(async () => {
    try {
      setIsSending(true)
      await auth().sendPasswordResetEmail(email)
      navigation.goBack()
    } catch (e) {
      showError()
    } finally {
      setIsSending(false)
    }
  }, [email, navigation, showError])

  return (
    <Container>
      <Header i18Namespace="ForgotPassword" i18Title="pageTitle" isStackPage />

      <Scroll>
        <BannerAd
          unitId={ADMOB_BANNER_ID}
          size={BannerAdSize.SMART_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />

        <Explanation>{t('explanation')}</Explanation>

        <EmailInput
          labelComponent={
            <Label
              label={t('emailLabel')}
              iconComponent={<Fw5IconAccent name="envelope" solid />}
              isRequired
            />
          }
          inputComponent={
            <DefaultTextInput
              placeholder={t('emailPh')}
              returnKeyType="next"
              autoCapitalize="none"
              autoCompleteType="email"
              blurOnSubmit={false}
              editable={!isSending}
              onChangeText={setEmail}
              value={email}
            />
          }
        />

        <SendButton
          disabled={isSending}
          text={t('sendButton')}
          onPress={onSendPasswordResetEmail}
          iconComponent={
            isSending ? (
              <WhiteSpinner />
            ) : (
              <ButtonIcon name="paper-plane" solid />
            )
          }
        />
      </Scroll>
    </Container>
  )
}

ForgotPassword.navigationOptions = () => ({
  headerShown: false,
})

export default ForgotPassword
