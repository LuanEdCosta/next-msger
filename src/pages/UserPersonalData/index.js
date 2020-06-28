import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import auth from '@react-native-firebase/auth'
import { NavigationEvents } from 'react-navigation'

import Header from '@/components/Header'
import DetailItem from '@/components/DetailItem'
import { USER_DOC } from '@/config/database'
import { Fw5IconPrimary, Fw5Icon } from '@/components/Fw5Icon'
import { MAIN_ROUTES } from '@/config/navigation/ScreenRoutes'
import {
  EDIT_USER_NAME_PARAMS as EUNP,
  EDIT_USER_EMAIL_PARAMS as EUEP,
} from '@/config/navigation/RouteParams'

import { Container, Scroll } from './styles'

const UserPersonalData = ({ navigation }) => {
  const { t } = useTranslation('UserPersonalData')

  const { [USER_DOC.NAME]: userName } = useSelector(({ User }) => User || {})
  const [currentUser, setCurrentUser] = useState({})

  const onNavigateToEditName = useCallback(() => {
    navigation.navigate(MAIN_ROUTES.EDIT_USER_NAME, {
      [EUNP.USER_ID]: currentUser.uid,
      [EUNP.USER_NAME]: userName,
    })
  }, [currentUser, navigation, userName])

  const onNavigateToEditEmail = useCallback(() => {
    navigation.navigate(MAIN_ROUTES.EDIT_USER_EMAIL, {
      [EUEP.USER_EMAIL]: currentUser.email,
    })
  }, [currentUser, navigation])

  const onGetCurrentUserData = useCallback(() => {
    const userData = auth().currentUser || {}
    setCurrentUser(userData)
  }, [])

  return (
    <Container>
      <NavigationEvents onWillFocus={onGetCurrentUserData} />

      <Header
        i18Namespace="UserPersonalData"
        i18Title="pageTitle"
        isStackPage
      />

      <Scroll>
        <DetailItem
          text={userName}
          title={t('userName')}
          onPress={onNavigateToEditName}
          rightIconComponent={<Fw5Icon name="chevron-right" />}
          titleIconComponent={<Fw5IconPrimary name="signature" />}
        />

        <DetailItem
          onPress={onNavigateToEditEmail}
          title={t('userEmail')}
          text={currentUser.email}
          rightIconComponent={<Fw5Icon name="chevron-right" />}
          titleIconComponent={<Fw5IconPrimary name="envelope" solid />}
        />
      </Scroll>
    </Container>
  )
}

UserPersonalData.navigationOptions = () => ({
  headerShown: false,
})

export default UserPersonalData