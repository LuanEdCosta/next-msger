import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { ViewPropTypes, ScrollView } from 'react-native'

import {
  BottomSheet,
  BottomSheetItem,
  BottomSheetTitle,
} from '@/components/BottomSheet'
import { Fw5Icon } from '@/components/Fw5Icon'
import {
  CUSTOMER_DOC,
  BIRTH_DAY_SENT_MESSAGES as BDSM,
  BIRTHDAY_MESSAGES_CONFIG as BMC,
} from '@/config/database'
import {
  useErrorAlert,
  usePhoneCall,
  useSendEmailMessage,
  useSendSmsMessage,
  useSendWhatsAppMessage,
} from '@/hooks'
import { DATE_FORMATS, PHONE_COUNTRY_CODES } from '@/config/constants'

import useSaveMessageSending from '../useSaveMessageSending'

import { Container } from './styles'

const BirthdayActions = (props) => {
  const {
    style,
    isShowing,
    handleClose,
    selectedCustomer,
    birthdayMessages,
    onActionExecuted,
  } = props

  const showErrorAlert = useErrorAlert()
  const { t } = useTranslation('BirthdayList')
  const onSaveMessageSending = useSaveMessageSending()

  const onPhoneCall = usePhoneCall()
  const onSendSmsMessage = useSendSmsMessage()
  const onSendEmailMessage = useSendEmailMessage()
  const onSendWhatsAppMessage = useSendWhatsAppMessage()

  const onExecuteAction = (channelType) => async () => {
    try {
      const {
        [CUSTOMER_DOC.ID]: customerId,
        [CUSTOMER_DOC.BIRTH_DAY]: birthDay,
        [CUSTOMER_DOC.BIRTH_MONTH]: birthMonth,
        [CUSTOMER_DOC.BIRTH_YEAR]: birthYear,
        [CUSTOMER_DOC.WHATSAPP]: whatsNumber,
        [CUSTOMER_DOC.EMAIL]: email,
      } = selectedCustomer

      const momentBirthday = moment(
        [birthDay, birthMonth, birthYear].join('/'),
        DATE_FORMATS.SLASH.DDMMYYYY,
      )

      if (!momentBirthday || !customerId) throw new Error()

      const {
        [BMC.BIRTHDAY_MESSAGE]: birthdayMessage = '',
        [BMC.DELAYED_BIRTHDAY_MESSAGE]: delayedMessage = '',
        [BMC.FUTURE_BIRTHDAY_MESSAGE]: futureMessage = '',
      } = birthdayMessages || {}

      let messageToSend = ''
      const today = moment().startOf('day')
      const currentYear = moment().format('YYYY')

      if (momentBirthday.isSame(today, 'day')) {
        messageToSend = birthdayMessage
      } else if (momentBirthday.isBefore(today, 'day')) {
        messageToSend = delayedMessage
      } else {
        messageToSend = futureMessage
      }

      switch (channelType) {
        case BDSM.CALL: {
          await onPhoneCall(whatsNumber)
          break
        }

        case BDSM.EMAIL: {
          await onSendEmailMessage(email, '', messageToSend)
          break
        }

        case BDSM.SMS: {
          await onSendSmsMessage(whatsNumber, messageToSend)
          break
        }

        case BDSM.WHATSAPP: {
          await onSendWhatsAppMessage({
            msg: messageToSend,
            phoneNumber: whatsNumber,
            countryCode: PHONE_COUNTRY_CODES.BRAZIL,
          })
          break
        }

        default:
          throw new Error()
      }

      await onSaveMessageSending(customerId, currentYear, channelType)

      if (onActionExecuted) {
        onActionExecuted(customerId, currentYear, channelType)
      }
    } catch (e) {
      showErrorAlert()
    } finally {
      handleClose()
    }
  }

  return (
    <Container style={style}>
      <BottomSheet isShowing={isShowing} onClose={handleClose} height={5 * 56}>
        <BottomSheetTitle
          text={
            selectedCustomer
              ? t('bottomSheetTitleWithName', {
                  name: selectedCustomer[CUSTOMER_DOC.NAME],
                })
              : t('bottomSheetTitle')
          }
        />

        <ScrollView>
          <BottomSheetItem
            text={t('sendEmail')}
            onPress={onExecuteAction(BDSM.EMAIL)}
          >
            <Fw5Icon name="envelope" size={20} solid />
          </BottomSheetItem>

          <BottomSheetItem
            text={t('callCustomer')}
            onPress={onExecuteAction(BDSM.CALL)}
          >
            <Fw5Icon name="phone" size={20} solid />
          </BottomSheetItem>

          <BottomSheetItem
            text={t('sendSms')}
            onPress={onExecuteAction(BDSM.SMS)}
          >
            <Fw5Icon name="sms" size={20} solid />
          </BottomSheetItem>

          <BottomSheetItem
            text={t('sendWhatsApp')}
            onPress={onExecuteAction(BDSM.WHATSAPP)}
          >
            <Fw5Icon name="whatsapp" size={20} solid />
          </BottomSheetItem>
        </ScrollView>
      </BottomSheet>
    </Container>
  )
}

BirthdayActions.defaultProps = {
  style: null,
  isShowing: false,
  handleClose: null,
  selectedCustomer: null,
  birthdayMessages: null,
  onActionExecuted: null,
}

BirthdayActions.propTypes = {
  style: ViewPropTypes.style,
  isShowing: PropTypes.bool,
  handleClose: PropTypes.func,
  selectedCustomer: PropTypes.shape({}),
  birthdayMessages: PropTypes.shape({}),
  onActionExecuted: PropTypes.func,
}

export default BirthdayActions
