import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Header from '@/components/Header'
import { MAIN_ROUTES } from '@/config/navigation/ScreenRoutes'

import { Container, Scroll, Option } from './styles'

const UserSecurity = ({ navigation }) => {
  const { t } = useTranslation('UserSecurity')

  const onChangePassword = useCallback(() => {
    navigation.navigate(MAIN_ROUTES.CHANGE_PASSWORD)
  }, [navigation])

  return (
    <Container>
      <Header i18Namespace="UserSecurity" i18Title="pageTitle" isStackPage />
      <Scroll>
        <Option
          fw5IconName="key"
          text={t('changePassword')}
          onPress={onChangePassword}
        />
      </Scroll>
    </Container>
  )
}

UserSecurity.navigationOptions = () => ({
  headerShown: false,
})

export default UserSecurity
