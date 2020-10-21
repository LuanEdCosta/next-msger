import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import { ButtonIcon, Fw5IconAccent } from '@/components/Fw5Icon'
import { DefaultTextInput } from '@/components/TextInput'
import { WhiteSpinner } from '@/components/Spinner'
import { ADMOB_BANNER_ID } from '@/config/ads'
import Header from '@/components/Header'
import Button from '@/components/Button'
import Label from '@/components/Label'

import useSaveBirthdayMsgsConfig from './useSaveBirthdayMsgsConfig'
import useFetchBirthdayMsgsConfig from './useFetchBirthdayMsgsConfig'
import {
  Container,
  Scroll,
  Content,
  MsgConfigInput,
  ExplanationContainer,
  ExplanationText,
  ExplanationTitle,
  ExplanationSectionTitle,
} from './styles'

const BirthdayMessagesConfig = () => {
  const { t } = useTranslation('BirthdayMessagesConfig')

  const [isSaving, setIsSaving] = useState(false)

  const [birthdayMessage, setBirthdayMessage] = useState('')
  const [futureBirthdayMessage, setFutureBirthdayMessage] = useState('')
  const [delayedBirthdayMessage, setDelayedBirthdayMessage] = useState('')

  const onSaveBirthdayMsgsConfig = useSaveBirthdayMsgsConfig(setIsSaving)

  useFetchBirthdayMsgsConfig({
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

  return (
    <Container>
      <Header
        i18Namespace="NavigationDrawer"
        i18Title="birthdayMessagesConfig"
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
