import React, {
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'

import Select from '@/components/Select'
import SearchableListModal from '@/components/SearchableListModal'
import { CUSTOMER_DOC, COLLECTIONS } from '@/config/database'
import Label from '@/components/Label'
import { Fw5IconAccent, Fw5Icon } from '@/components/Fw5Icon'
import InputError from '@/components/InputError'
import { useUserData } from '@/hooks'

import context from '../context'

import { Container } from './styles'

const SelectCustomer = () => {
  const {
    customerList,
    setCustomerList,
    selectedCustomer,
    setSelectedCustomer,
    isLoadingCustomers,
    setIsLoadingCustomers,
    isShowingErrors,
  } = useContext(context)

  const { t } = useTranslation(['ServiceRegistration', 'Error'])
  const [isShowingModal, setIsShowingModal] = useState(false)
  const { companyId } = useUserData()

  const customerName = useMemo(() => {
    if (selectedCustomer) return selectedCustomer[CUSTOMER_DOC.NAME]
    return null
  }, [selectedCustomer])

  const onSubscribeToCustomersCollection = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.COMPANIES)
      .doc(companyId)
      .collection(COLLECTIONS.CUSTOMERS)
      .onSnapshot((querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => {
          const user = doc.data()
          user[CUSTOMER_DOC.ID] = doc.id
          return user
        })

        setCustomerList(users)
        if (isLoadingCustomers) setIsLoadingCustomers(false)
      })

    return unsubscribe
  }, [companyId, isLoadingCustomers, setCustomerList, setIsLoadingCustomers])

  useEffect(onSubscribeToCustomersCollection, [])

  return (
    <Container>
      <Select
        value={customerName}
        setValue={setSelectedCustomer}
        placeholder={t('customerSelectPh')}
        onSelect={() => setIsShowingModal(true)}
        labelComponent={
          <Label
            label={t('customerSelect')}
            iconComponent={<Fw5IconAccent name="user" solid />}
            isRequired
          />
        }
        errorComponent={
          <InputError
            show={isShowingErrors && !selectedCustomer}
            text={t('Error:emptyField')}
          />
        }
      />

      <SearchableListModal
        list={customerList}
        isShowing={isShowingModal}
        isLoadingList={isLoadingCustomers}
        setIsShowing={setIsShowingModal}
        selectedItem={selectedCustomer}
        onItemSelected={setSelectedCustomer}
        idKey={CUSTOMER_DOC.ID}
        titleKey={CUSTOMER_DOC.NAME}
        subtitleKey={CUSTOMER_DOC.EMAIL}
        modalTitle={t('customerSelect')}
        titleIconComponent={<Fw5Icon name="signature" />}
        subtitleIconComponent={<Fw5Icon name="envelope" solid />}
        messagePanelText={t('anyCustoemerFound')}
        searchInputPlaceholder={t('customerSearchPh')}
      />
    </Container>
  )
}

export default SelectCustomer
