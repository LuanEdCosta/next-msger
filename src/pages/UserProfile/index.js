import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import auth from '@react-native-firebase/auth'
import { NavigationEvents } from 'react-navigation'

import Header from '@/components/Header'
import { USER_DOC } from '@/config/database'
import { ButtonIcon } from '@/components/Fw5Icon'
import { MAIN_COLORS } from '@/styles'
import { NAVIGATOR_ROUTES } from '@/config/navigation/ScreenRoutes'

import ProfileOptions from './ProfileOptions'
import {
  Container,
  Scroll,
  Content,
  ProfileHeader,
  ProfileHeaderBackground,
  InitialsComponent,
  UserName,
  UserEmail,
  SignOutButton,
} from './styles'

const UserProfile = ({ navigation }) => {
  const { t } = useTranslation('UserProfile')
  const { [USER_DOC.NAME]: name } = useSelector(({ User }) => User || {})
  const [currentUser, setCurrentUser] = useState({})

  const onLogout = useCallback(async () => {
    await auth().signOut()
    navigation.navigate(NAVIGATOR_ROUTES.LOGIN_NAVIGATOR)
  }, [navigation])

  const onGetCurrentUserData = useCallback(() => {
    const userData = auth().currentUser || {}
    setCurrentUser(userData)
  }, [])

  return (
    <Container>
      <NavigationEvents onWillFocus={onGetCurrentUserData} />
      <Header i18Namespace="UserProfile" i18Title="pageTitle" />

      <Scroll>
        <ProfileHeader>
          <ProfileHeaderBackground />
          <InitialsComponent text={name} fontSize={32} />
        </ProfileHeader>

        <Content>
          <UserName>{name}</UserName>
          <UserEmail>{currentUser.email}</UserEmail>
          <ProfileOptions navigation={navigation} />
        </Content>

        <SignOutButton
          text={t('signOutButton')}
          onPress={onLogout}
          backgroundColor="white"
          borderColor="danger"
          textColor="danger"
          borderWidth={2}
          iconComponent={
            <ButtonIcon name="power-off" color={MAIN_COLORS.danger} />
          }
        />
      </Scroll>
    </Container>
  )
}

export default UserProfile
