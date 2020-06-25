import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { EDIT_USER_EMAIL_PARAMS as EUEP } from '@/config/navigation/RouteParams'
import { ButtonIcon, Fw5IconAccent } from '@/components/Fw5Icon'
import { DefaultTextInput } from '@/components/TextInput'
import Label from '@/components/Label'
import Header from '@/components/Header'
import { WhiteSpinner } from '@/components/Spinner'

import useEditUserEmail from './useEditUserEmail'
import { Container, EditButton, EditInput, Scroll, Error } from './styles'

const EditUserEmail = ({ navigation }) => {
  const userEmailToEdit = navigation.getParam(EUEP.USER_EMAIL, '')

  const { t } = useTranslation(['EditUserProfile', 'Common'])
  const [isEditing, setIsEditing] = useState(false)
  const [email, setEmail] = useState(userEmailToEdit)

  const onEditUserEmail = useEditUserEmail()

  const onPressSave = useCallback(async () => {
    if (email === userEmailToEdit) navigation.goBack()
    if (!email.trim()) return
    const isSuccessful = await onEditUserEmail(email, setIsEditing)
    if (isSuccessful) navigation.goBack()
  }, [email, navigation, onEditUserEmail, userEmailToEdit])

  return (
    <Container>
      <Header
        i18Namespace="EditUserProfile"
        i18Title="editUserEmailPageTitle"
        isStackPage
      />

      <Scroll>
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
      </Scroll>
    </Container>
  )
}

EditUserEmail.navigationOptions = () => ({
  headerShown: false,
})

export default EditUserEmail
