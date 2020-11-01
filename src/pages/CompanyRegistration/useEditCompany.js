import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'

import { useErrorAlert } from '@/hooks'
import { COLLECTIONS, COMPANY_DOC } from '@/config/database'

export default () => {
  const showAlert = useErrorAlert()

  const onEditCompany = useCallback(
    async (data, setIsLoading, navigation) => {
      try {
        const {
          companyId,
          companyName,
          fantasyName,
          cnpj,
          companyOwnerName,
          companyOwnerPhone,
          companyOwnerCpf,
          email,
        } = data

        if (!companyId) throw new Error()
        setIsLoading(true)

        await firestore()
          .collection(COLLECTIONS.COMPANIES)
          .doc(companyId)
          .set(
            {
              [COMPANY_DOC.CNPJ]: cnpj,
              [COMPANY_DOC.EMAIL]: email,
              [COMPANY_DOC.NAME]: companyName,
              [COMPANY_DOC.FANTASY_NAME]: fantasyName,
              [COMPANY_DOC.OWNER_CPF]: companyOwnerCpf,
              [COMPANY_DOC.OWNER_NAME]: companyOwnerName,
              [COMPANY_DOC.OWNER_PHONE]: companyOwnerPhone,
            },
            { merge: true },
          )

        navigation.goBack()
      } catch (e) {
        showAlert()
      } finally {
        setIsLoading(false)
      }
    },
    [showAlert],
  )

  return onEditCompany
}
