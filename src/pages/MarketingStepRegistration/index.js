import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import Header from '@/components/Header'
import Button from '@/components/Button'
import { ButtonIcon, Fw5IconAccent } from '@/components/Fw5Icon'
import Label from '@/components/Label'
import { DefaultTextInput } from '@/components/TextInput'
import InputError from '@/components/InputError'
import { WhiteSpinner } from '@/components/Spinner'
import { COLLECTIONS, MARKETING_STEP_DOC } from '@/config/database'
import { useErrorAlert } from '@/hooks'
import { Container, Scroll, MarketingStepInput } from './styles'

const MarketingStepRegistration = () => {
  const { t } = useTranslation('MarketingStepRegistration')
  const showAlert = useErrorAlert()

  const [isSaving, setIsSaving] = useState(false)
  const [isShowingErrors, setIsShowingErrors] = useState(false)
  const [marketingStepName, setMarketingStepName] = useState('')
  const [numOfDays, setNumOfDays] = useState('')

  const onValidateRegistration = useCallback(() => {
    if (!marketingStepName && !marketingStepName.trim()) return false
    return true
  }, [marketingStepName])

  const onSaveMarketingStep = useCallback(async () => {
    if (!isShowingErrors) setIsShowingErrors(true)
    if (!onValidateRegistration()) return
    setIsSaving(true)

    try {
      await firestore()
        .collection(COLLECTIONS.MARKETING_STEPS)
        .add({
          [MARKETING_STEP_DOC.NAME]: marketingStepName,
          [MARKETING_STEP_DOC.CREATED_AT]: firestore.Timestamp.now(),
        })

      setIsShowingErrors(false)
      setMarketingStepName('')
    } catch (e) {
      showAlert()
    }
    setIsSaving(false)
  }, [isShowingErrors, marketingStepName, onValidateRegistration, showAlert])

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
              onChangeText={setMarketingStepName}
              value={marketingStepName}
              autoCorrect
            />
          }
        />

        <MarketingStepInput
          errorComponent={
            <InputError show={isShowingErrors && !marketingStepName.trim()} />
          }
          labelComponent={
            <Label
              label={t('numOfDaysLabel')}
              iconComponent={<Fw5IconAccent name="calendar-day" solid />}
              isRequired
            />
          }
          inputComponent={
            <DefaultTextInput
              placeholder={t('numOfDaysPlaceholder')}
              keyboardType="numeric"
              onChangeText={setNumOfDays}
              value={numOfDays}
              autoCorrect={false}
            />
          }
        />

        <Button
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
