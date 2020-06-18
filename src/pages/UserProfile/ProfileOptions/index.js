import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { MAIN_ROUTES } from '@/config/navigation/ScreenRoutes'
import NavigationOption from '@/components/NavigationOption'

import { Container } from './styles'

const ProfileOptions = (props) => {
  const { navigation } = props

  const { t } = useTranslation('UserProfile')

  const onNavigate = useCallback(
    (route) => () => {
      if (route) navigation.navigate(route)
    },
    [navigation],
  )

  return (
    <Container>
      <NavigationOption
        fw5IconName="user-circle"
        text={t('profileDataOption')}
        onPress={onNavigate(MAIN_ROUTES.USER_PERSONAL_DATA)}
      />

      <NavigationOption
        fw5IconName="lock"
        text={t('securityOption')}
        onPress={onNavigate(MAIN_ROUTES.USER_SECURITY)}
      />
    </Container>
  )
}

ProfileOptions.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
}

export default ProfileOptions
