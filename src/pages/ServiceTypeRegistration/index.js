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
import { COLLECTIONS, SERVICE_TYPE_DOC } from '@/config/database'
import { useErrorAlert } from '@/hooks'
import { Container, Scroll, ServiceTypeInput } from './styles'

const ServiceTypeRegistration = () => {
  const { t } = useTranslation(['ServiceTypeRegistration', 'InputMasks'])
  const showErrorAlert = useErrorAlert()

  const [isShowingErrors, setIsShowingErrors] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [serviceTypeName, setServiceTypeName] = useState('')

  const onSaveServiceType = useCallback(async () => {
    if (!isShowingErrors) setIsShowingErrors(true)
    if (!serviceTypeName && !serviceTypeName.trim()) return

    setIsSaving(true)
    try {
      await firestore()
        .collection(COLLECTIONS.SERVICE_TYPES)
        .add({
          [SERVICE_TYPE_DOC.NAME]: serviceTypeName,
          [SERVICE_TYPE_DOC.CREATED_AT]: firestore.Timestamp.now(),
        })

      setIsShowingErrors(false)
      setServiceTypeName('')
    } catch (e) {
      showErrorAlert()
    }
    setIsSaving(false)
  }, [isShowingErrors, serviceTypeName, showErrorAlert])

  return (
    <Container>
      <Header
        i18Namespace="NavigationDrawer"
        i18Title="serviceTypeRegistration"
      />

      <Scroll>
        <ServiceTypeInput
          errorComponent={
            <InputError show={isShowingErrors && !serviceTypeName.trim()} />
          }
          labelComponent={
            <Label
              label={t('serviceTypeLabel')}
              iconComponent={<Fw5IconAccent name="file-alt" solid />}
              isRequired
            />
          }
          inputComponent={
            <DefaultTextInput
              placeholder={t('serviceTypePlaceholder')}
              autoCapitalize="words"
              textContentType="none"
              onChangeText={setServiceTypeName}
              value={serviceTypeName}
              autoCorrect
            />
          }
        />

        <Button
          text={t('saveButton')}
          onPress={onSaveServiceType}
          disabled={isSaving}
          iconComponent={
            isSaving ? <WhiteSpinner /> : <ButtonIcon name="check" />
          }
        />
      </Scroll>
    </Container>
  )
}

export default ServiceTypeRegistration
