import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import { EDIT_USER_EMAIL_PARAMS as EUEP } from '@/config/navigation/RouteParams'
import { ButtonIcon, Fw5IconAccent } from '@/components/Fw5Icon'
import { DefaultTextInput } from '@/components/TextInput'
import { WhiteSpinner } from '@/components/Spinner'
import { ADMOB_BANNER_ID } from '@/config/ads'
import Header from '@/components/Header'
import Label from '@/components/Label'

import CurrentPasswordModal from './CurrentPasswordModal'
import useEditUserEmail from './useEditUserEmail'
import {
  Container,
  EditButton,
  EditInput,
  Scroll,
  Error,
  Content,
} from './styles'

const EditUserEmail = ({ navigation }) => {
  const userEmailToEdit = navigation.getParam(EUEP.USER_EMAIL, '')

  const { t } = useTranslation(['EditUserProfile', 'Common'])

  const [password, setPassword] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [email, setEmail] = useState(userEmailToEdit)
  const [isVisible, setIsVisible] = useState(false)
  const [isShowingErrors, setIsShowingErrors] = useState(false)

  const onEditUserEmail = useEditUserEmail()

  const onPressSave = useCallback(async () => {
    if (email === userEmailToEdit) {
      navigation.goBack()
      return
    }
    if (!email.trim()) return
    setIsVisible(true)
  }, [email, navigation, userEmailToEdit])

  const onConfirmPassword = useCallback(
    async (currentPassword) => {
      const isSuccessful = await onEditUserEmail(
        email,
        setIsEditing,
        currentPassword,
      )

      if (isSuccessful) navigation.goBack()
    },
    [email, navigation, onEditUserEmail],
  )

  return (
    <Container>
      <Header
        i18Namespace="EditUserProfile"
        i18Title="editUserEmailPageTitle"
        isStackPage
      />

      <CurrentPasswordModal
        onConfirmPassword={onConfirmPassword}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        isShowingErrors={isShowingErrors}
        setIsShowingErrors={setIsShowingErrors}
        password={password}
        setPassword={setPassword}
        modalTitle={t('confirmEmailEditingModalTitle')}
        dialogTitle={t('confirmEmailEditingDialogTitle')}
        dialogMessage={t('confirmEmailEditingDialogMessage')}
        iconComponent={<Fw5IconAccent name="envelope" size={70} solid />}
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
          <EditInput
            errorComponent={<Error show={!email.trim()} />}
            labelComponent={
              <Label
                iconComponent={<Fw5IconAccent name="envelope" solid />}
                label={t('userEmail')}
                isRequired
              />
            }
            inputComponent={
              <DefaultTextInput
                placeholder={t('userEmailPh')}
                keyboardType="email-address"
                autoCompleteType="email"
                editable={!isEditing}
                onChangeText={setEmail}
                value={email}
              />
            }
          />

          <EditButton
            text={t('Common:saveModifications')}
            onPress={onPressSave}
            disabled={isEditing}
            iconComponent={
              isEditing ? <WhiteSpinner /> : <ButtonIcon name="check" />
            }
          />
        </Content>
      </Scroll>
    </Container>
  )
}

EditUserEmail.navigationOptions = () => ({
  headerShown: false,
})

export default EditUserEmail
