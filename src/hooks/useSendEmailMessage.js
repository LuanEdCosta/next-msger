import { useCallback } from 'react'
import { Linking } from 'react-native'

export default () => {
  const onSendEmailMessage = useCallback(
    async (to, subject, body, options = {}) => {
      const { cc, bcc } = options

      const queryArray = [
        subject ? `subject=${subject}` : '',
        body ? `body=${body}` : '',
        cc ? `cc=${cc}` : '',
        bcc ? `bcc=${bcc}` : '',
      ]

      const url = `mailto:${to}`
      const query = queryArray.filter((str) => str).join('&')

      return Linking.openURL(`${url}?${query}`)
    },
    [],
  )

  return onSendEmailMessage
}
