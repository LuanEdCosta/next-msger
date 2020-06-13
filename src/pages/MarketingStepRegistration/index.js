import React, { useCallback, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'

import Header from '@/components/Header'
import { ButtonIcon, Fw5IconAccent } from '@/components/Fw5Icon'
import Label from '@/components/Label'
import { DefaultTextInput, DefaultTextInputMask } from '@/components/TextInput'
import InputError from '@/components/InputError'
import { WhiteSpinner } from '@/components/Spinner'
import { COLLECTIONS, MARKETING_STEP_DOC } from '@/config/database'
import { useErrorAlert } from '@/hooks'

import { Container, Scroll, MarketingStepInput, SaveButton } from './styles'

const MarketingStepRegistration = () => {
  const { t } = useTranslation('MarketingStepRegistration')
  const showAlert = useErrorAlert()

  const [isSaving, setIsSaving] = useState(false)
  const [isShowingErrors, setIsShowingErrors] = useState(false)
  const [marketingStepName, setMarketingStepName] = useState('')
  const [numOfDays, setNumOfDays] = useState('')
  const [observations, setObservations] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [whatsappMessage, setWhatsappMessage] = useState('')
  const [smsMessage, setSmsMessage] = useState('')

  let numOfDaysInput = useRef(null)
  const emailMessageInput = useRef(null)

  const onValidateRegistration = useCallback(() => {
    if (
      !marketingStepName ||
      !marketingStepName.trim() ||
      !numOfDays ||
      !numOfDays.trim() ||
      !emailMessage ||
      !emailMessage.trim() ||
      !whatsappMessage ||
      !whatsappMessage.trim() ||
      !smsMessage.trim()
    ) {
      return false
    }

    return true
  }, [emailMessage, marketingStepName, numOfDays, smsMessage, whatsappMessage])

  const onClearData = useCallback(() => {
    setIsSaving('')
    setIsShowingErrors('')
    setMarketingStepName('')
    setNumOfDays('')
    setObservations('')
    setEmailMessage('')
    setWhatsappMessage('')
    setSmsMessage('')
  }, [])

  const onSaveMarketingStep = useCallback(async () => {
    if (!isShowingErrors) setIsShowingErrors(true)
    if (!onValidateRegistration()) return
    setIsSaving(true)

    try {
      await firestore()
        .collection(COLLECTIONS.MARKETING_STEPS)
        .add({
          [MARKETING_STEP_DOC.NAME]: marketingStepName,
          [MARKETING_STEP_DOC.NUMBER_OF_DAYS]: Number(numOfDays),
          [MARKETING_STEP_DOC.EMAIL_MESSAGE]: emailMessage,
          [MARKETING_STEP_DOC.WHATSAPP_MESSAGE]: whatsappMessage,
          [MARKETING_STEP_DOC.SMS_MESSAGE]: smsMessage,
          [MARKETING_STEP_DOC.OBSERVATIONS]: observations,
          [MARKETING_STEP_DOC.CREATED_AT]: firestore.Timestamp.now(),
        })

      onClearData()
      setIsShowingErrors(false)
      setMarketingStepName('')
    } catch (e) {
      showAlert()
    }
    setIsSaving(false)
  }, [
    emailMessage,
    isShowingErrors,
    marketingStepName,
    numOfDays,
    observations,
    onClearData,
    onValidateRegistration,
    showAlert,
    smsMessage,
    whatsappMessage,
  ])

  const onFocusNumOfDaysInput = useCallback(() => {
    numOfDaysInput.focus()
  }, [])

  const onFocusEmailMessageInput = useCallback(() => {
    emailMessageInput.current.focus()
  }, [])

  return (
    <Container>
      <Header
        i18Namespace="NavigationDrawer"
        i18Title="marketingStepRegistration"
      />

      <Scroll>
        <MarketingStepInput
          errorComponent={
            <InputError show={isShowingErrors && !marketingStepName.trim()} />
          }
          labelComponent={
            <Label
              label={t('nameLabel')}
              iconComponent={<Fw5IconAccent name="file-alt" solid />}
              isRequired
            />
          }
          inputComponent={
            <DefaultTextInput
              placeholder={t('namePlaceholder')}
              autoCapitalize="words"
              textContentType="none"
              returnKeyType="next"
              onChangeText={setMarketingStepName}
              value={marketingStepName}
              onSubmitEditing={onFocusNumOfDaysInput}
              blurOnSubmit={false}
              autoCorrect
            />
          }
        />

        <MarketingStepInput
          errorComponent={
            <InputError show={isShowingErrors && !numOfDays.trim()} />
          }
          labelComponent={
            <Label
              label={t('numOfDaysLabel')}
              iconComponent={<Fw5IconAccent name="calendar-day" solid />}
              isRequired
            />
          }
          inputComponent={
            <DefaultTextInputMask
              refInput={(ref) => {
                numOfDaysInput = ref
              }}
              type="only-numbers"
              returnKeyType="next"
              placeholder={t('numOfDaysPlaceholder')}
              onSubmitEditing={onFocusEmailMessageInput}
              onChangeText={setNumOfDays}
              value={numOfDays}
              blurOnSubmit={false}
            />
          }
        />

        <MarketingStepInput
          errorComponent={
            <InputError show={isShowingErrors && !emailMessage.trim()} />
          }
          labelComponent={
            <Label
              label={t('emailMsgLabel')}
              iconComponent={<Fw5IconAccent name="envelope" solid />}
              description={t('emailMsgMaxLength', {
                length: emailMessage.length,
              })}
              isRequired
            />
          }
          inputComponent={
            <DefaultTextInput
              ref={emailMessageInput}
              style={{ textAlignVertical: 'top' }}
              placeholder={t('emailMsgPlaceholder')}
              autoCapitalize="sentences"
              onChangeText={setEmailMessage}
              value={emailMessage}
              maxLength={500}
              numberOfLines={5}
              multiline
              autoCorrect
            />
          }
        />

        <MarketingStepInput
          errorComponent={
            <InputError show={isShowingErrors && !whatsappMessage.trim()} />
          }
          labelComponent={
            <Label
              label={t('whatsappMsgLabel')}
              iconComponent={<Fw5IconAccent name="whatsapp" />}
              description={t('whatsappMsgMaxLength', {
                length: whatsappMessage.length,
              })}
              isRequired
            />
          }
          inputComponent={
            <DefaultTextInput
              style={{ textAlignVertical: 'top' }}
              placeholder={t('whatsappMsgPlaceholder')}
              autoCapitalize="sentences"
              onChangeText={setWhatsappMessage}
              value={whatsappMessage}
              maxLength={500}
              numberOfLines={5}
              multiline
              autoCorrect
            />
          }
        />

        <MarketingStepInput
          errorComponent={
            <InputError show={isShowingErrors && !smsMessage.trim()} />
          }
          labelComponent={
            <Label
              label={t('smsMsgLabel')}
              iconComponent={<Fw5IconAccent name="sms" />}
              description={t('smsMsgMaxLength', {
                length: smsMessage.length,
              })}
              isRequired
            />
          }
          inputComponent={
            <DefaultTextInput
              style={{ textAlignVertical: 'top' }}
              placeholder={t('smsMsgPlaceholder')}
              autoCapitalize="sentences"
              onChangeText={setSmsMessage}
              value={smsMessage}
              maxLength={500}
              numberOfLines={5}
              multiline
              autoCorrect
            />
          }
        />

        <MarketingStepInput
          labelComponent={
            <Label
              label={t('observationsLabel')}
              iconComponent={<Fw5IconAccent name="file-alt" solid />}
              description={t('observationsMaxLength', {
                length: observations.length,
              })}
            />
          }
          inputComponent={
            <DefaultTextInput
              style={{ textAlignVertical: 'top' }}
              placeholder={t('observationsPlaceholder')}
              autoCapitalize="sentences"
              onChangeText={setObservations}
              value={observations}
              maxLength={150}
              numberOfLines={3}
              multiline
              autoCorrect
            />
          }
        />

        <SaveButton
          text={t('saveButton')}
          onPress={onSaveMarketingStep}
          disabled={isSaving}
          iconComponent={
            isSaving ? <WhiteSpinner /> : <ButtonIcon name="check" />
          }
        />
      </Scroll>
    </Container>
  )
}

export default MarketingStepRegistration
