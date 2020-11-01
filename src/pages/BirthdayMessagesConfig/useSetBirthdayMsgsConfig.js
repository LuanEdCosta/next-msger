import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { COMPANY_DOC, BIRTHDAY_MESSAGES_CONFIG } from '@/config/database'

export default ({
  setBirthdayMessage,
  setFutureBirthdayMessage,
  setDelayedBirthdayMessage,
}) => {
  const companyData = useSelector(({ Company }) => Company || {})

  useEffect(() => {
    const {
      [BIRTHDAY_MESSAGES_CONFIG.BIRTHDAY_MESSAGE]: birthdayMessage,
      [BIRTHDAY_MESSAGES_CONFIG.FUTURE_BIRTHDAY_MESSAGE]: futureMessage,
      [BIRTHDAY_MESSAGES_CONFIG.DELAYED_BIRTHDAY_MESSAGE]: delayedMessage,
    } = companyData[COMPANY_DOC.BIRTHDAY_MESSAGES_CONFIG] || {}

    setBirthdayMessage(birthdayMessage)
    setFutureBirthdayMessage(futureMessage)
    setDelayedBirthdayMessage(delayedMessage)
  }, [
    companyData,
    setBirthdayMessage,
    setDelayedBirthdayMessage,
    setFutureBirthdayMessage,
  ])
}
