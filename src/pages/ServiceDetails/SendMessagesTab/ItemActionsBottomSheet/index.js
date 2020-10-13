import React, { useCallback } from 'react'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { Fw5Icon } from '@/components/Fw5Icon'
import {
  BottomSheet,
  BottomSheetItem,
  BottomSheetTitle,
} from '@/components/BottomSheet'
import { useErrorAlert } from '@/hooks'
import { MARKETING_STEP_DOC, SERVICE_SENT_MSGS } from '@/config/database'
import { MAIN_ROUTES } from '@/config/navigation/ScreenRoutes'

import useSaveMessageSending from '../useSaveMessageSending'

const ItemActionsBottomSheet = (props) => {
  const { isShowing, handleClose, marketingStepId, navigation } = props

  const { t } = useTranslation('ServiceDetailsSendMessagesTab')
  const onSaveMessageSending = useSaveMessageSending()
  const showAlert = useErrorAlert()

  const onMarkAsUnsent = useCallback(
    (messageType) => async () => {
      try {
        await onSaveMessageSending(marketingStepId, messageType, false)
        handleClose()
      } catch (e) {
        showAlert()
      }
    },
    [handleClose, marketingStepId, onSaveMessageSending, showAlert],
  )

  const onOpenMarketingStepDetails = useCallback(() => {
    if (!navigation) return
    handleClose()
    navigation.navigate(MAIN_ROUTES.MARKETING_STEP_DETAILS, {
      [MARKETING_STEP_DOC.ID]: marketingStepId,
    })
  }, [handleClose, marketingStepId, navigation])

  return (
    <BottomSheet isShowing={isShowing} onClose={handleClose} height={6 * 56}>
      <BottomSheetTitle text={t('actionsBottomSheetTitle')} />

      <ScrollView>
        <BottomSheetItem
          text={t('markEmailAsUnsent')}
          onPress={onMarkAsUnsent(SERVICE_SENT_MSGS.EMAIL)}
        >
          <Fw5Icon name="envelope" size={20} solid />
        </BottomSheetItem>

        <BottomSheetItem
          text={t('markPhoneAsUnsent')}
          onPress={onMarkAsUnsent(SERVICE_SENT_MSGS.CALL)}
        >
          <Fw5Icon name="phone" size={20} solid />
        </BottomSheetItem>

        <BottomSheetItem
          text={t('markSmsAsUnsent')}
          onPress={onMarkAsUnsent(SERVICE_SENT_MSGS.SMS)}
        >
          <Fw5Icon name="sms" size={20} solid />
        </BottomSheetItem>

        <BottomSheetItem
          text={t('markWhatsAppAsUnsent')}
          onPress={onMarkAsUnsent(SERVICE_SENT_MSGS.WHATSAPP)}
        >
          <Fw5Icon name="whatsapp" size={20} solid />
        </BottomSheetItem>

        <BottomSheetItem
          text={t('openMarketingStepDetails')}
          onPress={onOpenMarketingStepDetails}
        >
          <Fw5Icon name="external-link-alt" size={20} solid />
        </BottomSheetItem>
      </ScrollView>
    </BottomSheet>
  )
}

ItemActionsBottomSheet.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  marketingStepId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
}

export default ItemActionsBottomSheet
