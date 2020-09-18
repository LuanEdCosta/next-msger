import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import { EDIT_USER_NAME_PARAMS as EUNP } from '@/config/navigation/RouteParams'
import { ButtonIcon, Fw5IconAccent } from '@/components/Fw5Icon'
import { DefaultTextInput } from '@/components/TextInput'
import Label from '@/components/Label'
import Header from '@/components/Header'
import { WhiteSpinner } from '@/components/Spinner'
import { ADMOB_BANNER_ID } from '@/config/ads'

import useEditUserName from './useEditUserName'
import {
  Container,
  EditButton,
  EditInput,
  Scroll,
  Error,
  Content,
} from './styles'

const EditUserName = ({ navigation }) => {
  const userNameToEdit = navigation.getParam(EUNP.USER_NAME, '')
  const userId = navigation.getParam(EUNP.USER_ID, '')

  const { t } = useTranslation(['EditUserProfile', 'Common'])
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(userNameToEdit)

  const onEditUserName = useEditUserName()

  const onPressSave = useCallback(async () => {
    if (name === userNameToEdit) navigation.goBack()
    if (!name.trim()) return
    const isSuccessful = await onEditUserName(userId, name, setIsEditing)
    if (isSuccessful) navigation.goBack()
  }, [name, navigation, onEditUserName, userId, userNameToEdit])

  return (
    <Container>
      <Header
        i18Namespace="EditUserProfile"
        i18Title="editUserNamePageTitle"
        isStackPage
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
            errorComponent={<Error show={!name.trim()} />}
            labelComponent={
              <Label
                iconComponent={<Fw5IconAccent name="signature" solid />}
                label={t('userName')}
                isRequired
              />
            }
            inputComponent={
              <DefaultTextInput
                placeholder={t('userNamePh')}
                autoCapitalize="words"
                autoCompleteType="name"
                editable={!isEditing}
                onChangeText={setName}
                value={name}
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

EditUserName.navigationOptions = () => ({
  headerShown: false,
})

export default EditUserName
