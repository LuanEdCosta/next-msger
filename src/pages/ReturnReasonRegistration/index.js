import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import Header from '@/components/Header'
import Button from '@/components/Button'
import { ButtonIcon, Fw5IconAccent } from '@/components/Fw5Icon'
import Label from '@/components/Label'
import { DefaultTextInput } from '@/components/TextInput'
import InputError from '@/components/InputError'
import { WhiteSpinner } from '@/components/Spinner'
import { COLLECTIONS, RETURN_REASON_DOC } from '@/config/database'
import { useErrorAlert, useUserData } from '@/hooks'
import { RETURN_REASON_PARAMS } from '@/config/navigation/RouteParams'
import { ADMOB_BANNER_ID } from '@/config/ads'

import { Container, Scroll, ReasonNameInput, Content } from './styles'

const ReturnReasonRegistration = ({ navigation }) => {
  const isStackPage = navigation.getParam(
    RETURN_REASON_PARAMS.IS_STACK_PAGE,
    false,
  )

  const { t } = useTranslation(['ReturnReasonRegistration', 'InputMasks'])
  const showErrorAlert = useErrorAlert()
  const { companyId } = useUserData()

  const [isShowingErrors, setIsShowingErrors] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [reasonName, setReasonName] = useState('')

  const onSaveReturnReason = useCallback(async () => {
    if (!isShowingErrors) setIsShowingErrors(true)
    if (!reasonName && !reasonName.trim()) return

    setIsSaving(true)
    try {
      await firestore()
        .collection(COLLECTIONS.COMPANIES)
        .doc(companyId)
        .collection(COLLECTIONS.RETURN_REASONS)
        .add({
          [RETURN_REASON_DOC.NAME]: reasonName,
          [RETURN_REASON_DOC.CREATED_AT]: firestore.Timestamp.now(),
        })

      setIsShowingErrors(false)
      setReasonName('')
    } catch (e) {
      showErrorAlert()
    }
    setIsSaving(false)
  }, [companyId, isShowingErrors, reasonName, showErrorAlert])

  return (
    <Container>
      <Header
        i18Namespace="ReturnReasonRegistration"
        i18Title="pageTitle"
        isStackPage={isStackPage}
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
          <ReasonNameInput
            showErrorComponent={isShowingErrors && !reasonName.trim()}
            errorComponent={<InputError />}
            labelComponent={
              <Label
                label={t('reasonNameLabel')}
                iconComponent={<Fw5IconAccent name="signature" solid />}
                isRequired
              />
            }
            inputComponent={
              <DefaultTextInput
                placeholder={t('reasonNamePh')}
                autoCapitalize="words"
                textContentType="none"
                onChangeText={setReasonName}
                value={reasonName}
                autoCorrect
              />
            }
          />

          <Button
            text={t('saveButton')}
            onPress={onSaveReturnReason}
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

ReturnReasonRegistration.navigationOptions = () => ({
  headerShown: false,
})

export default ReturnReasonRegistration
