import React, {
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'

import SearchableListModal from '@/components/SearchableListModal'
import { COLLECTIONS, RETURN_REASON_DOC } from '@/config/database'
import { Fw5IconAccent, Fw5Icon } from '@/components/Fw5Icon'
import InputError from '@/components/InputError'
import Select from '@/components/Select'
import Label from '@/components/Label'

import context from '../context'

import { Container } from './styles'

const SelectReason = () => {
  const {
    t,
    reasonList,
    setReasonList,
    selectedReason,
    setSelectedReason,
    isLoadingReasons,
    setIsLoadingReasons,
    isShowingErrors,
  } = useContext(context)

  const [isShowingModal, setIsShowingModal] = useState(false)

  const reasonName = useMemo(() => {
    if (selectedReason) return selectedReason[RETURN_REASON_DOC.NAME]
    return null
  }, [selectedReason])

  const onSubscribeToReasonsCollection = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.RETURN_REASONS)
      .onSnapshot((querySnapshot) => {
        const reasons = querySnapshot.docs.map((doc) => {
          const reason = doc.data()
          reason[RETURN_REASON_DOC.ID] = doc.id
          reason[RETURN_REASON_DOC.CREATED_AT] = moment(
            reason[RETURN_REASON_DOC.CREATED_AT],
          ).format('LL')
          return reason
        })

        setReasonList(reasons)
        if (isLoadingReasons) setIsLoadingReasons(false)
      })

    return unsubscribe
  }, [isLoadingReasons, setReasonList, setIsLoadingReasons])

  useEffect(onSubscribeToReasonsCollection, [])

  return (
    <Container>
      <Select
        value={reasonName}
        setValue={setSelectedReason}
        placeholder={t('reasonSelectPh')}
        onSelect={() => setIsShowingModal(true)}
        labelComponent={
          <Label
            label={t('reasonSelect')}
            iconComponent={<Fw5IconAccent name="question-circle" solid />}
            isRequired
          />
        }
        errorComponent={
          <InputError
            show={isShowingErrors && !selectedReason}
            text={t('Error:emptyField')}
          />
        }
      />

      <SearchableListModal
        list={reasonList}
        isShowing={isShowingModal}
        isLoadingList={isLoadingReasons}
        setIsShowing={setIsShowingModal}
        selectedItem={selectedReason}
        onItemSelected={setSelectedReason}
        idKey={RETURN_REASON_DOC.ID}
        titleKey={RETURN_REASON_DOC.NAME}
        subtitleKey={RETURN_REASON_DOC.CREATED_AT}
        modalTitle={t('reasonSelect')}
        titleIconComponent={<Fw5Icon name="signature" />}
        subtitleIconComponent={<Fw5Icon name="calendar-alt" />}
        messagePanelText={t('anyReasonFound')}
        searchInputPlaceholder={t('reasonSearchPh')}
      />
    </Container>
  )
}

export default SelectReason
