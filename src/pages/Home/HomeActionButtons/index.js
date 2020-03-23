import React, { useCallback } from 'react'
import { ButtonIcon } from '@/components/Fw5Icon'
import { useTranslation } from 'react-i18next'
import { withNavigation } from 'react-navigation'
import { DRAWER_ROUTES } from '@/config/navigation/ScreenRoutes'
import { Container, Scroll, ActionButton } from './styles'

const HomeActionButtons = ({ navigation }) => {
  const { t } = useTranslation('Home')

  const onRegisterCustomer = useCallback(() => {
    navigation.navigate(DRAWER_ROUTES.CUSTOMER_REGISTRATION)
  }, [navigation])

  const onRegisterServiceType = useCallback(() => {
    navigation.navigate(DRAWER_ROUTES.SERVICE_TYPE_REGISTRATION)
  }, [navigation])

  const onRegisterMarketingStep = useCallback(() => {
    navigation.navigate(DRAWER_ROUTES.MARKETING_STEP_REGISTRATION)
  }, [navigation])

  const onRegisterService = useCallback(() => {
    navigation.navigate(DRAWER_ROUTES.SERVICE_REGISTRATION)
  }, [navigation])

  return (
    <Container>
      <Scroll
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        horizontal
      >
        <ActionButton
          iconComponent={<ButtonIcon name="arrow-circle-right" />}
          text={t('registerService')}
          onPress={onRegisterService}
          backgroundColor="normalBlue"
        />

        <ActionButton
          iconComponent={<ButtonIcon name="user-plus" />}
          text={t('registerCustomerActButton')}
          onPress={onRegisterCustomer}
          backgroundColor="darkBlue"
        />

        <ActionButton
          iconComponent={<ButtonIcon name="file-alt" solid />}
          text={t('registerServiceType')}
          onPress={onRegisterServiceType}
          backgroundColor="accent"
        />

        <ActionButton
          iconComponent={<ButtonIcon name="file-medical" />}
          text={t('registerMarketingStep')}
          onPress={onRegisterMarketingStep}
          backgroundColor="accentDark"
        />
      </Scroll>
    </Container>
  )
}

export default withNavigation(HomeActionButtons)
