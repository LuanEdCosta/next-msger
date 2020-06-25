import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { EDIT_USER_NAME_PARAMS as EUNP } from '@/config/navigation/RouteParams'
import { ButtonIcon, Fw5IconAccent } from '@/components/Fw5Icon'
import { DefaultTextInput } from '@/components/TextInput'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Header from '@/components/Header'
import { WhiteSpinner } from '@/components/Spinner'

import useEditUserName from './useEditUserName'
import { Container, EditButton, EditInput, Scroll } from './styles'

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
        <EditInput
          errorComponent={<InputError show={!name.trim()} />}
          labelComponent={
            <Label
              iconComponent={<Fw5IconAccent name="signature" solid />}
              label={t('userName')}
              isRequired
            />
          }
          inputComponent={
            <DefaultTextInput
              placeholder={t('namePh')}
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
      </Scroll>
    </Container>
  )
}

EditUserName.navigationOptions = () => ({
  headerShown: false,
})

export default EditUserName
