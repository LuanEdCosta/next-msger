import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import MessagePanel from '@/components/MessagePanel'
import { MessagePanelIcon, ButtonIcon } from '@/components/Fw5Icon'
import { DRAWER_ROUTES } from '@/config/navigation/ScreenRoutes'

import { Container, MarketingStepHint, NewMarketingStepButton } from './styles'

const EmptyComponent = ({ isLoading, navigation }) => {
  const { t } = useTranslation('ServiceDetailsSendMessagesTab')

  const onNavigateToMarketingStepRegistration = useCallback(() => {
    navigation.navigate(DRAWER_ROUTES.MARKETING_STEP_REGISTRATION)
  }, [navigation])

  return (
    <Container>
      <MessagePanel
        text={t('anyMarketingStepFound')}
        isLoading={isLoading}
        iconComponent={<MessagePanelIcon name="list-ol" />}
      />

      {!isLoading && (
        <>
          <MarketingStepHint>{t('marketingStepHint')}</MarketingStepHint>
          <NewMarketingStepButton
            text={t('newMarketingStepButton')}
            onPress={onNavigateToMarketingStepRegistration}
            iconComponent={<ButtonIcon name="plus-circle" />}
          />
        </>
      )}
    </Container>
  )
}

EmptyComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default EmptyComponent
