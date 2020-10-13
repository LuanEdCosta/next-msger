import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import Header from '@/components/Header'
import { ButtonIcon, Fw5IconAccent } from '@/components/Fw5Icon'
import Label from '@/components/Label'
import { DefaultTextInput, DefaultTextInputMask } from '@/components/TextInput'
import InputError from '@/components/InputError'
import { WhiteSpinner } from '@/components/Spinner'
import { COLLECTIONS, MARKETING_STEP_DOC } from '@/config/database'
import { EDIT_MARKETING_STEP_PARAMS } from '@/config/navigation/RouteParams'
import { useErrorAlert, useUserData } from '@/hooks'
import { ADMOB_BANNER_ID } from '@/config/ads'

import {
  Container,
  Scroll,
  MarketingStepInput,
  SaveButton,
  Content,
} from './styles'

const EditMarketingStep = ({ navigation }) => {
  const marketingStep = navigation.getParam(
    EDIT_MARKETING_STEP_PARAMS.MARKETING_STEP_DATA,
  )

  const { t } = useTranslation('EditMarketingStep')
  const { companyId } = useUserData()
  const showAlert = useErrorAlert()

  const [isEditing, setIsEditing] = useState(false)
  const [isShowingErrors, setIsShowingErrors] = useState(false)
  const [marketingStepName, setMarketingStepName] = useState('')
  const [numOfDays, setNumOfDays] = useState('')
  const [observations, setObservations] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [whatsappMessage, setWhatsappMessage] = useState('')
  const [smsMessage, setSmsMessage] = useState('')

  let numOfDaysInput = useRef(null)
  const emailMessageInput = useRef(null)

  useEffect(() => {
    if (marketingStep) {
      const {
        [MARKETING_STEP_DOC.NAME]: currentMarketingStepName = '',
        [MARKETING_STEP_DOC.NUMBER_OF_DAYS]: currentNumOfDays = '',
        [MARKETING_STEP_DOC.EMAIL_MESSAGE]: currentEmailMessage = '',
        [MARKETING_STEP_DOC.WHATSAPP_MESSAGE]: currentWhatsappMessage = '',
        [MARKETING_STEP_DOC.SMS_MESSAGE]: currentSmsMessage = '',
        [MARKETING_STEP_DOC.OBSERVATIONS]: currentObservations = '',
      } = marketingStep

      setMarketingStepName(currentMarketingStepName)
      setNumOfDays(currentNumOfDays)
      setEmailMessage(currentEmailMessage)
      setWhatsappMessage(currentWhatsappMessage)
      setSmsMessage(currentSmsMessage)
      setObservations(currentObservations)
    } else {
      navigation.goBack()
    }
  }, [marketingStep, navigation])

  const marketingStepId = useMemo(() => {
    if (!marketingStep) return ''
    return marketingStep[MARKETING_STEP_DOC.ID]
  }, [marketingStep])

  const onValidate = useCallback(() => {
    if (
      !marketingStepId ||
      !marketingStepName ||
      !marketingStepName.trim() ||
      !numOfDays ||
      !emailMessage ||
      !emailMessage.trim() ||
      !whatsappMessage ||
      !whatsappMessage.trim() ||
      !smsMessage.trim()
    ) {
      return false
    }

    return true
  }, [
    emailMessage,
    marketingStepId,
    marketingStepName,
    numOfDays,
    smsMessage,
    whatsappMessage,
  ])

  const onEditSuccess = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const onSaveMarketingStep = useCallback(async () => {
    if (!isShowingErrors) setIsShowingErrors(true)
    if (!onValidate()) return

    try {
      setIsEditing(true)

      await firestore()
        .collection(COLLECTIONS.COMPANIES)
        .doc(companyId)
        .collection(COLLECTIONS.MARKETING_STEPS)
        .doc(marketingStepId)
        .update({
          [MARKETING_STEP_DOC.NAME]: marketingStepName,
          [MARKETING_STEP_DOC.NUMBER_OF_DAYS]: Number(numOfDays),
          [MARKETING_STEP_DOC.EMAIL_MESSAGE]: emailMessage,
          [MARKETING_STEP_DOC.WHATSAPP_MESSAGE]: whatsappMessage,
          [MARKETING_STEP_DOC.SMS_MESSAGE]: smsMessage,
          [MARKETING_STEP_DOC.OBSERVATIONS]: observations,
        })

      onEditSuccess()
    } catch (e) {
      showAlert()
    } finally {
      setIsEditing(false)
    }
  }, [
    companyId,
    emailMessage,
    isShowingErrors,
    marketingStepId,
    marketingStepName,
    numOfDays,
    observations,
    onEditSuccess,
    onValidate,
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
      <Header i18Namespace="EditMarketingStep" i18Title="pageTitle" />

      <Scroll>
        <BannerAd
          unitId={ADMOB_BANNER_ID}
          size={BannerAdSize.SMART_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />

        <Content>
          <MarketingStepInput
            showErrorComponent={isShowingErrors && !marketingStepName.trim()}
            errorComponent={<InputError />}
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
            showErrorComponent={isShowingErrors && !numOfDays}
            errorComponent={<InputError />}
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
            showErrorComponent={isShowingErrors && !emailMessage.trim()}
            errorComponent={<InputError />}
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
            showErrorComponent={isShowingErrors && !whatsappMessage.trim()}
            errorComponent={<InputError />}
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
            showErrorComponent={isShowingErrors && !smsMessage.trim()}
            errorComponent={<InputError />}
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
            text={t('editButton')}
            onPress={onSaveMarketingStep}
            disabled={isEditing}
            iconComponent={
              isEditing ? <WhiteSpinner /> : <ButtonIcon name="pen" />
            }
          />
        </Content>
      </Scroll>
    </Container>
  )
}

EditMarketingStep.navigationOptions = () => ({
  headerShown: false,
})

export default EditMarketingStep
