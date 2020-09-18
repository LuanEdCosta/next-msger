import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import Header from '@/components/Header'
import { ADMOB_BANNER_ID } from '@/config/ads'
import { MAIN_ROUTES } from '@/config/navigation/ScreenRoutes'

import { Container, Scroll, Option, AdContainer } from './styles'

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

        <AdContainer>
          <BannerAd
            unitId={ADMOB_BANNER_ID}
            size={BannerAdSize.MEDIUM_RECTANGLE}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </AdContainer>
      </Scroll>
    </Container>
  )
}

UserSecurity.navigationOptions = () => ({
  headerShown: false,
})

export default UserSecurity
