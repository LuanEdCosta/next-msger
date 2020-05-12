import React, { useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Select from '@/components/Select'
import SearchableListModal from '@/components/SearchableListModal'
import { CUSTOMER_DOC } from '@/config/database'
import Label from '@/components/Label'
import { Fw5IconAccent } from '@/components/Fw5Icon'

import context from '../context'

import { Container } from './styles'

const SelectCustomer = () => {
  const { customerList, selectedCustomer, setSelectedCustomer } = useContext(
    context,
  )

  const { t } = useTranslation('ServiceTypeRegistration')
  const [isShowingModal, setIsShowingModal] = useState(false)

  const customerName = useMemo(() => {
    if (selectedCustomer) return selectedCustomer.name
    return null
  }, [selectedCustomer])

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
      />

      <SearchableListModal
        list={customerList}
        isShowing={isShowingModal}
        isLoadingList={false}
        idKey={CUSTOMER_DOC.ID}
        titleKey={CUSTOMER_DOC.NAME}
        subtitleKey={CUSTOMER_DOC.EMAIL}
        selectedItem={selectedCustomer}
        setIsShowing={setIsShowingModal}
        onItemSelected={setSelectedCustomer}
        modalTitle={t('customerSelect')}
        titleIconComponent={<Fw5IconAccent name="user" solid />}
        messagePanelText={t('anyCustoemerFound')}
        searchInputPlaceholder={t('customerSearchPh')}
      />
    </Container>
  )
}

export default SelectCustomer
