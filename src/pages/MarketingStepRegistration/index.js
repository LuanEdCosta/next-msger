import React, { useCallback, useState, useRef, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import Header from '@/components/Header'
import { ButtonIcon, Fw5IconAccent, Fw5IconPrimary } from '@/components/Fw5Icon'
import Label from '@/components/Label'
import { DefaultTextInput } from '@/components/TextInput'
import InputError from '@/components/InputError'
import { WhiteSpinner } from '@/components/Spinner'
import { COLLECTIONS, MARKETING_STEP_DOC } from '@/config/database'
import { useErrorAlert, useUserData } from '@/hooks'
import { ADMOB_BANNER_ID } from '@/config/ads'
import { TimeBuilderModal } from '@/components/TimeBuilderModal'
import { MILLISECONDS } from '@/config/constants'
import { getTimePartsFromMilliseconds, testMessageWithMacros } from '@/utils'
import SelectMacroModal from '@/components/SelectMacroModal'
import ViewTextModal from '@/components/ViewTextModal'

import {
  Container,
  Scroll,
  MarketingStepInput,
  SaveButton,
  Content,
  OpenTimeBuilderButton,
  TimeText,
  TimeContainer,
  TimeBuilderItemRow,
  StyledTimeBuilderItem,
  TimeBuilderExplanation,
  InputActions,
  InputActionButton,
} from './styles'

const MarketingStepRegistration = () => {
  const { t } = useTranslation([
    'MarketingStepRegistration',
    'TimeBuilder',
    'Glossary',
  ])

  const { companyId } = useUserData()
  const showAlert = useErrorAlert()

  const [isSaving, setIsSaving] = useState(false)
  const [isShowingErrors, setIsShowingErrors] = useState(false)
  const [isTimeBuilderVisible, setIsTimeBuilderVisible] = useState(false)

  const [marketingStepName, setMarketingStepName] = useState('')
  const [milliseconds, setMilliseconds] = useState(0)
  const [observations, setObservations] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [whatsappMessage, setWhatsappMessage] = useState('')
  const [smsMessage, setSmsMessage] = useState('')

  const [macroModalsConfig, setMacroModalsConfig] = useState({
    isShowingAddMacroModal: false,
    isShowingSeeMsgModal: false,
    setMessage: null,
    message: null,
    title: null,
  })

  const emailMessageInput = useRef(null)

  const onOpenTimeBuilder = useCallback(() => {
    setIsTimeBuilderVisible(true)
  }, [])

  const onCloseTimeBuilderModal = useCallback(() => {
    setIsTimeBuilderVisible(false)
  }, [])

  const onOpenModalToAddMacro = useCallback(
    (setMessage) => () => {
      setMacroModalsConfig({
        isShowingAddMacroModal: true,
        setMessage,
      })
    },
    [],
  )

  const onOpenModalToSeeMessage = useCallback(
    (message, title) => () => {
      setMacroModalsConfig({
        title,
        isShowingSeeMsgModal: true,
        message: testMessageWithMacros(message),
      })
    },
    [],
  )

  const onCloseMacroModal = useCallback(() => {
    setMacroModalsConfig({
      isShowingAddMacroModal: false,
      isShowingSeeMsgModal: false,
      message: null,
      setMessage: null,
      title: null,
    })
  }, [])

  const onValidateRegistration = useCallback(() => {
    if (
      !marketingStepName ||
      !marketingStepName.trim() ||
      !emailMessage ||
      !emailMessage.trim() ||
      !whatsappMessage ||
      !whatsappMessage.trim() ||
      !smsMessage.trim()
    ) {
      return false
    }

    return true
  }, [emailMessage, marketingStepName, smsMessage, whatsappMessage])

  const onClearData = useCallback(() => {
    setIsSaving('')
    setIsShowingErrors('')
    setMarketingStepName('')
    setMilliseconds(0)
    setObservations('')
    setEmailMessage('')
    setWhatsappMessage('')
    setSmsMessage('')
  }, [])

  const onSaveMarketingStep = useCallback(async () => {
    if (!isShowingErrors) setIsShowingErrors(true)
    if (!onValidateRegistration()) return

    try {
      setIsSaving(true)

      await firestore()
        .collection(COLLECTIONS.COMPANIES)
        .doc(companyId)
        .collection(COLLECTIONS.MARKETING_STEPS)
        .add({
          [MARKETING_STEP_DOC.NAME]: marketingStepName,
          [MARKETING_STEP_DOC.MILLISECONDS]: milliseconds,
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
    } finally {
      setIsSaving(false)
    }
  }, [
    companyId,
    emailMessage,
    isShowingErrors,
    marketingStepName,
    milliseconds,
    observations,
    onClearData,
    onValidateRegistration,
    showAlert,
    smsMessage,
    whatsappMessage,
  ])

  const builtTimeText = useMemo(() => {
    if (!milliseconds) return t('Glossary:always')
    const timeParts = getTimePartsFromMilliseconds(milliseconds)
    return t('TimeBuilder:afterTimeTextVerbose', timeParts)
  }, [milliseconds, t])

  return (
    <Container>
      <Header
        i18Namespace="NavigationDrawer"
        i18Title="marketingStepRegistration"
      />

      <SelectMacroModal
        isShowing={macroModalsConfig.isShowingAddMacroModal}
        setMessage={macroModalsConfig.setMessage}
        modalTitle={t('addMacroModalTitle')}
        onCloseModal={onCloseMacroModal}
      />

      <ViewTextModal
        isShowing={macroModalsConfig.isShowingSeeMsgModal}
        text={macroModalsConfig.message}
        title={macroModalsConfig.title}
        onCloseModal={onCloseMacroModal}
      />

      <TimeBuilderModal
        isVisible={isTimeBuilderVisible}
        setIsVisible={setIsTimeBuilderVisible}
        onConfirm={onCloseTimeBuilderModal}
        title={t('marketingStepTime')}
        milliseconds={milliseconds}
        setMilliseconds={setMilliseconds}
        renderItems={(onAddMilliseconds) => {
          return (
            <>
              <TimeBuilderItemRow>
                <StyledTimeBuilderItem
                  onPress={() => onAddMilliseconds(MILLISECONDS.MINUTE)}
                  text={t('TimeBuilder:+1minute')}
                />

                <StyledTimeBuilderItem
                  onPress={() => onAddMilliseconds(MILLISECONDS.HOUR)}
                  text={t('TimeBuilder:+1hour')}
                />

                <StyledTimeBuilderItem
                  onPress={() => onAddMilliseconds(MILLISECONDS.DAY)}
                  text={t('TimeBuilder:+1day')}
                />
              </TimeBuilderItemRow>

              <TimeBuilderItemRow>
                <StyledTimeBuilderItem
                  onPress={() => onAddMilliseconds(MILLISECONDS.WEEK)}
                  text={t('TimeBuilder:+1week')}
                />

                <StyledTimeBuilderItem
                  onPress={() => onAddMilliseconds(MILLISECONDS.MONTH)}
                  text={t('TimeBuilder:+1month')}
                />

                <StyledTimeBuilderItem
                  onPress={() => onAddMilliseconds(MILLISECONDS.YEAR)}
                  text={t('TimeBuilder:+1year')}
                />
              </TimeBuilderItemRow>
            </>
          )
        }}
      />

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
                placeholder={t('namePh')}
                autoCapitalize="words"
                textContentType="none"
                onChangeText={setMarketingStepName}
                value={marketingStepName}
                autoCorrect
              />
            }
          />

          <MarketingStepInput
            showErrorComponent
            labelComponent={
              <Label
                label={t('timeLabel')}
                iconComponent={<Fw5IconAccent name="calendar-day" solid />}
              />
            }
            inputComponent={
              <TimeContainer>
                <TimeText>{builtTimeText}</TimeText>
                <OpenTimeBuilderButton onPress={onOpenTimeBuilder} size={56}>
                  <ButtonIcon name="clock" solid />
                </OpenTimeBuilderButton>
              </TimeContainer>
            }
            errorComponent={
              <TimeBuilderExplanation>
                {t('timeBuilderExplanation')}
              </TimeBuilderExplanation>
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
              <>
                <DefaultTextInput
                  ref={emailMessageInput}
                  style={{ textAlignVertical: 'top' }}
                  placeholder={t('emailMsgPh')}
                  autoCapitalize="sentences"
                  onChangeText={setEmailMessage}
                  value={emailMessage}
                  maxLength={2000}
                  numberOfLines={5}
                  multiline
                  autoCorrect
                />

                <InputActions>
                  <InputActionButton
                    text={t('seeMessageButton')}
                    iconComponent={<Fw5IconPrimary name="eye" />}
                    onPress={onOpenModalToSeeMessage(
                      emailMessage,
                      t('emailMsgLabel'),
                    )}
                  />

                  <InputActionButton
                    text={t('addMacroButton')}
                    onPress={onOpenModalToAddMacro(setEmailMessage)}
                    iconComponent={<Fw5IconPrimary name="plus-circle" />}
                  />
                </InputActions>
              </>
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
              <>
                <DefaultTextInput
                  style={{ textAlignVertical: 'top' }}
                  placeholder={t('whatsappMsgPh')}
                  autoCapitalize="sentences"
                  onChangeText={setWhatsappMessage}
                  value={whatsappMessage}
                  maxLength={2000}
                  numberOfLines={5}
                  multiline
                  autoCorrect
                />

                <InputActions>
                  <InputActionButton
                    text={t('seeMessageButton')}
                    iconComponent={<Fw5IconPrimary name="eye" />}
                    onPress={onOpenModalToSeeMessage(
                      whatsappMessage,
                      t('whatsappMsgLabel'),
                    )}
                  />

                  <InputActionButton
                    text={t('addMacroButton')}
                    onPress={onOpenModalToAddMacro(setWhatsappMessage)}
                    iconComponent={<Fw5IconPrimary name="plus-circle" />}
                  />
                </InputActions>
              </>
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
              <>
                <DefaultTextInput
                  style={{ textAlignVertical: 'top' }}
                  placeholder={t('smsMsgPh')}
                  autoCapitalize="sentences"
                  onChangeText={setSmsMessage}
                  value={smsMessage}
                  maxLength={2000}
                  numberOfLines={5}
                  multiline
                  autoCorrect
                />

                <InputActions>
                  <InputActionButton
                    text={t('seeMessageButton')}
                    iconComponent={<Fw5IconPrimary name="eye" />}
                    onPress={onOpenModalToSeeMessage(
                      smsMessage,
                      t('smsMsgLabel'),
                    )}
                  />

                  <InputActionButton
                    text={t('addMacroButton')}
                    onPress={onOpenModalToAddMacro(smsMessage)}
                    iconComponent={<Fw5IconPrimary name="plus-circle" />}
                  />
                </InputActions>
              </>
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
                placeholder={t('observationsPh')}
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
        </Content>
      </Scroll>
    </Container>
  )
}

export default MarketingStepRegistration
