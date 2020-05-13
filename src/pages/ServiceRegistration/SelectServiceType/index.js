import React, {
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'

import Select from '@/components/Select'
import SearchableListModal from '@/components/SearchableListModal'
import { SERVICE_TYPE_DOC, COLLECTIONS } from '@/config/database'
import Label from '@/components/Label'
import { Fw5IconAccent, Fw5Icon } from '@/components/Fw5Icon'

import context from '../context'

import { Container } from './styles'

const SelectServiceType = () => {
  const {
    serviceTypeList,
    setServiceTypeList,
    selectedServiceType,
    setSelectedServiceType,
    isLoadingServiceTypes,
    setIsLoadingServiceTypes,
  } = useContext(context)

  const { t } = useTranslation('ServiceRegistration')
  const [isShowingModal, setIsShowingModal] = useState(false)

  const customerName = useMemo(() => {
    if (selectedServiceType) return selectedServiceType[SERVICE_TYPE_DOC.NAME]
    return null
  }, [selectedServiceType])

  const onSubscribeToServiceTypeCollection = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.SERVICE_TYPES)
      .onSnapshot((querySnapshot) => {
        const serviceTypes = querySnapshot.docs.map((doc) => {
          const serviceType = doc.data()

          serviceType[SERVICE_TYPE_DOC.ID] = doc.id
          serviceType[SERVICE_TYPE_DOC.CREATED_AT] = moment(
            serviceType[SERVICE_TYPE_DOC.CREATED_AT],
          ).format('LL')

          return serviceType
        })

        setServiceTypeList(serviceTypes)
        if (isLoadingServiceTypes) setIsLoadingServiceTypes(false)
      })

    return unsubscribe
  }, [isLoadingServiceTypes, setServiceTypeList, setIsLoadingServiceTypes])

  useEffect(onSubscribeToServiceTypeCollection, [])

  return (
    <Container>
      <Select
        value={customerName}
        setValue={setSelectedServiceType}
        placeholder={t('serviceTypeSelectPh')}
        onSelect={() => setIsShowingModal(true)}
        labelComponent={
          <Label
            label={t('serviceTypeSelect')}
            iconComponent={<Fw5IconAccent name="file-alt" solid />}
            isRequired
          />
        }
      />

      <SearchableListModal
        list={serviceTypeList}
        isShowing={isShowingModal}
        isLoadingList={isLoadingServiceTypes}
        setIsShowing={setIsShowingModal}
        selectedItem={selectedServiceType}
        onItemSelected={setSelectedServiceType}
        idKey={SERVICE_TYPE_DOC.ID}
        titleKey={SERVICE_TYPE_DOC.NAME}
        subtitleKey={SERVICE_TYPE_DOC.CREATED_AT}
        modalTitle={t('serviceTypeSelect')}
        titleIconComponent={<Fw5Icon name="file-alt" solid />}
        subtitleIconComponent={<Fw5Icon name="calendar-alt" solid />}
        messagePanelText={t('anyServiceTypeFound')}
        searchInputPlaceholder={t('serviceTypeSearchPh')}
      />
    </Container>
  )
}

export default SelectServiceType
