import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import { COLLECTIONS, SERVICE_TYPE_DOC } from '@/config/database'
import { ButtonIcon, Fw5IconAccent } from '@/components/Fw5Icon'
import { DefaultTextInput } from '@/components/TextInput'
import { useErrorAlert, useUserData } from '@/hooks'
import { WhiteSpinner } from '@/components/Spinner'
import InputError from '@/components/InputError'
import { ADMOB_BANNER_ID } from '@/config/ads'
import Header from '@/components/Header'
import Button from '@/components/Button'
import Label from '@/components/Label'

import { Container, Scroll, ServiceTypeInput, Content } from './styles'

const ServiceTypeRegistration = () => {
  const { t } = useTranslation(['ServiceTypeRegistration', 'InputMasks'])
  const showErrorAlert = useErrorAlert()
  const { companyId } = useUserData()

  const [isShowingErrors, setIsShowingErrors] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [serviceTypeName, setServiceTypeName] = useState('')
  const [description, setDescription] = useState('')

  const onSaveServiceType = useCallback(async () => {
    if (!isShowingErrors) setIsShowingErrors(true)
    if (!serviceTypeName && !serviceTypeName.trim()) return

    setIsSaving(true)
    try {
      await firestore()
        .collection(COLLECTIONS.COMPANIES)
        .doc(companyId)
        .collection(COLLECTIONS.SERVICE_TYPES)
        .add({
          [SERVICE_TYPE_DOC.NAME]: serviceTypeName,
          [SERVICE_TYPE_DOC.DESCRIPTION]: description,
          [SERVICE_TYPE_DOC.CREATED_AT]: firestore.Timestamp.now(),
        })

      setIsShowingErrors(false)
      setServiceTypeName('')
      setDescription('')
    } catch (e) {
      showErrorAlert()
    }
    setIsSaving(false)
  }, [companyId, description, isShowingErrors, serviceTypeName, showErrorAlert])

  return (
    <Container>
      <Header
        i18Namespace="NavigationDrawer"
        i18Title="serviceTypeRegistration"
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
          <ServiceTypeInput
            showErrorComponent={isShowingErrors && !serviceTypeName.trim()}
            errorComponent={<InputError />}
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

          <ServiceTypeInput
            labelComponent={
              <Label
                label={t('descriptionLabel')}
                iconComponent={<Fw5IconAccent name="comment" solid />}
                description={t('descriptionLength', {
                  length: description.length,
                })}
              />
            }
            inputComponent={
              <DefaultTextInput
                style={{ textAlignVertical: 'top' }}
                placeholder={t('descriptionPh')}
                autoCapitalize="sentences"
                onChangeText={setDescription}
                value={description}
                maxLength={500}
                numberOfLines={5}
                multiline
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
        </Content>
      </Scroll>
    </Container>
  )
}

export default ServiceTypeRegistration
