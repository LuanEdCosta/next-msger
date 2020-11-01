import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import { ButtonIcon, Fw5IconAccent, Fw5IconPrimary } from '@/components/Fw5Icon'
import { DefaultTextInput } from '@/components/TextInput'
import { WhiteSpinner } from '@/components/Spinner'
import { testMessageWithMacros } from '@/utils'
import { ADMOB_BANNER_ID } from '@/config/ads'
import Header from '@/components/Header'
import Button from '@/components/Button'
import Label from '@/components/Label'
import SelectMacroModal from '@/components/SelectMacroModal'
import ViewTextModal from '@/components/ViewTextModal'
import { MACROS_FOR_BIRTHDAY_MESSAGES } from '@/config/macros'

import useSaveBirthdayMsgsConfig from './useSaveBirthdayMsgsConfig'
import useSetBirthdayMsgsConfig from './useSetBirthdayMsgsConfig'
import {
  Container,
  Scroll,
  Content,
  MsgConfigInput,
  ExplanationContainer,
  ExplanationText,
  ExplanationTitle,
  ExplanationSectionTitle,
  InputActions,
  InputActionButton,
} from './styles'

const BirthdayMessagesConfig = () => {
  const { t } = useTranslation('BirthdayMessagesConfig')

  const [isSaving, setIsSaving] = useState(false)

  const [birthdayMessage, setBirthdayMessage] = useState('')
  const [futureBirthdayMessage, setFutureBirthdayMessage] = useState('')
  const [delayedBirthdayMessage, setDelayedBirthdayMessage] = useState('')

  const [macroModalsConfig, setMacroModalsConfig] = useState({
    isShowingAddMacroModal: false,
    isShowingSeeMsgModal: false,
    setMessage: null,
    message: null,
    title: null,
  })

  const onSaveBirthdayMsgsConfig = useSaveBirthdayMsgsConfig(setIsSaving)

  useSetBirthdayMsgsConfig({
    setBirthdayMessage,
    setFutureBirthdayMessage,
    setDelayedBirthdayMessage,
  })

  const onSaveBirthdayMessageConfig = useCallback(async () => {
    await onSaveBirthdayMsgsConfig({
      birthdayMessage,
      futureBirthdayMessage,
      delayedBirthdayMessage,
    })
  }, [
    birthdayMessage,
    delayedBirthdayMessage,
    futureBirthdayMessage,
    onSaveBirthdayMsgsConfig,
  ])

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
    setMacroModalsConfig((currentConfig) => ({
      ...currentConfig,
      isShowingAddMacroModal: false,
      isShowingSeeMsgModal: false,
    }))
  }, [])

  return (
    <Container>
      <Header
        i18Namespace="NavigationDrawer"
        i18Title="birthdayMessagesConfig"
      />

      <SelectMacroModal
        isShowing={macroModalsConfig.isShowingAddMacroModal}
        setMessage={macroModalsConfig.setMessage}
        modalTitle={t('addMacroModalTitle')}
        onCloseModal={onCloseMacroModal}
        macros={MACROS_FOR_BIRTHDAY_MESSAGES}
      />

      <ViewTextModal
        isShowing={macroModalsConfig.isShowingSeeMsgModal}
        text={macroModalsConfig.message}
        title={macroModalsConfig.title}
        onCloseModal={onCloseMacroModal}
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
          <MsgConfigInput
            labelComponent={
              <Label
                label={t('birthdayMsgLabel')}
                iconComponent={<Fw5IconAccent name="birthday-cake" solid />}
                description={t('birthdayMsgMaxLength', {
                  length: birthdayMessage.length,
                })}
              />
            }
            inputComponent={
              <>
                <DefaultTextInput
                  style={{ textAlignVertical: 'top' }}
                  placeholder={t('birthdayMsgPh')}
                  autoCapitalize="sentences"
                  onChangeText={setBirthdayMessage}
                  value={birthdayMessage}
                  maxLength={500}
                  numberOfLines={5}
                  multiline
                  autoCorrect
                />

                <InputActions>
                  <InputActionButton
                    text={t('seeMessageButton')}
                    iconComponent={<Fw5IconPrimary name="eye" />}
                    onPress={onOpenModalToSeeMessage(
                      birthdayMessage,
                      t('birthdayMsgLabel'),
                    )}
                  />

                  <InputActionButton
                    text={t('addMacroButton')}
                    onPress={onOpenModalToAddMacro(setBirthdayMessage)}
                    iconComponent={<Fw5IconPrimary name="plus-circle" />}
                  />
                </InputActions>
              </>
            }
          />

          <MsgConfigInput
            labelComponent={
              <Label
                label={t('delayedBirthdayMsgLabel')}
                iconComponent={<Fw5IconAccent name="calendar-times" solid />}
                description={t('delayedBirthdayMsgMaxLength', {
                  length: delayedBirthdayMessage.length,
                })}
              />
            }
            inputComponent={
              <>
                <DefaultTextInput
                  style={{ textAlignVertical: 'top' }}
                  placeholder={t('delayedBirthdayMsgPh')}
                  autoCapitalize="sentences"
                  onChangeText={setDelayedBirthdayMessage}
                  value={delayedBirthdayMessage}
                  maxLength={500}
                  numberOfLines={5}
                  multiline
                  autoCorrect
                />

                <InputActions>
                  <InputActionButton
                    text={t('seeMessageButton')}
                    iconComponent={<Fw5IconPrimary name="eye" />}
                    onPress={onOpenModalToSeeMessage(
                      delayedBirthdayMessage,
                      t('delayedBirthdayMsgLabel'),
                    )}
                  />

                  <InputActionButton
                    text={t('addMacroButton')}
                    onPress={onOpenModalToAddMacro(setDelayedBirthdayMessage)}
                    iconComponent={<Fw5IconPrimary name="plus-circle" />}
                  />
                </InputActions>
              </>
            }
          />

          <MsgConfigInput
            labelComponent={
              <Label
                label={t('futureBirthdayMsgLabel')}
                iconComponent={<Fw5IconAccent name="calendar-day" solid />}
                description={t('futureBirthdayMsgMaxLength', {
                  length: futureBirthdayMessage.length,
                })}
              />
            }
            inputComponent={
              <>
                <DefaultTextInput
                  style={{ textAlignVertical: 'top' }}
                  placeholder={t('futureBirthdayMsgPh')}
                  autoCapitalize="sentences"
                  onChangeText={setFutureBirthdayMessage}
                  value={futureBirthdayMessage}
                  maxLength={500}
                  numberOfLines={5}
                  multiline
                  autoCorrect
                />

                <InputActions>
                  <InputActionButton
                    text={t('seeMessageButton')}
                    iconComponent={<Fw5IconPrimary name="eye" />}
                    onPress={onOpenModalToSeeMessage(
                      futureBirthdayMessage,
                      t('futureBirthdayMsgLabel'),
                    )}
                  />

                  <InputActionButton
                    text={t('addMacroButton')}
                    onPress={onOpenModalToAddMacro(setFutureBirthdayMessage)}
                    iconComponent={<Fw5IconPrimary name="plus-circle" />}
                  />
                </InputActions>
              </>
            }
          />

          <Button
            text={t('saveButton')}
            onPress={onSaveBirthdayMessageConfig}
            disabled={isSaving}
            iconComponent={
              isSaving ? <WhiteSpinner /> : <ButtonIcon name="check" />
            }
          />
        </Content>

        <ExplanationContainer>
          <ExplanationSectionTitle>{t('explanation')}</ExplanationSectionTitle>

          <ExplanationTitle>
            {t('explanationTitles.birthdayMessage')}
          </ExplanationTitle>

          <ExplanationText>
            {t('explanationMessages.birthdayMessage')}
          </ExplanationText>

          <ExplanationTitle>
            {t('explanationTitles.delayedBirthdayMessage')}
          </ExplanationTitle>

          <ExplanationText>
            {t('explanationMessages.delayedBirthdayMessage')}
          </ExplanationText>

          <ExplanationTitle>
            {t('explanationTitles.futureBirthdayMessage')}
          </ExplanationTitle>

          <ExplanationText>
            {t('explanationMessages.futureBirthdayMessage')}
          </ExplanationText>
        </ExplanationContainer>
      </Scroll>
    </Container>
  )
}

export default BirthdayMessagesConfig
