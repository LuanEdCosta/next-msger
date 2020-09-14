import { useCallback } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import { useErrorAlert } from '@/hooks'
import { DRAWER_ROUTES } from '@/config/navigation/ScreenRoutes'
import { COLLECTIONS, COMPANY_DOC, USER_DOC } from '@/config/database'

export default () => {
  const showAlert = useErrorAlert()

  const onRegisterCompany = useCallback(
    async (data, setIsLoading, navigation) => {
      try {
        setIsLoading(true)

        const {
          companyName,
          fantasyName,
          cnpj,
          companyOwnerName,
          companyOwnerPhone,
          companyOwnerCpf,
          email,
          password,
        } = data

        // If this fails the batch will not be executed
        const { user } = await auth().createUserWithEmailAndPassword(
          email,
          password,
        )

        const companyDocumentRef = firestore()
          .collection(COLLECTIONS.COMPANIES)
          .doc()

        const userDocumentRef = firestore()
          .collection(COLLECTIONS.USERS)
          .doc(user.uid)

        await firestore()
          .batch()
          .set(companyDocumentRef, {
            [COMPANY_DOC.CNPJ]: cnpj,
            [COMPANY_DOC.EMAIL]: email,
            [COMPANY_DOC.NAME]: companyName,
            [COMPANY_DOC.FANTASY_NAME]: fantasyName,
            [COMPANY_DOC.OWNER_CPF]: companyOwnerCpf,
            [COMPANY_DOC.OWNER_NAME]: companyOwnerName,
            [COMPANY_DOC.OWNER_PHONE]: companyOwnerPhone,
            [COMPANY_DOC.CREATED_AT]: firestore.Timestamp.now(),
          })
          .set(userDocumentRef, {
            [USER_DOC.COMPANY_ID]: companyDocumentRef.id,
            [USER_DOC.NAME]: companyOwnerName,
          })
          .commit()

        navigation.navigate(DRAWER_ROUTES.HOME)
      } catch (e) {
        showAlert()
      } finally {
        setIsLoading(false)
      }
    },
    [showAlert],
  )

  return onRegisterCompany
}
