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
import Label from '@/components/Label'
import { MAIN_ROUTES } from '@/config/navigation/ScreenRoutes'
import { RETURN_REASON_PARAMS } from '@/config/navigation/RouteParams'
import { useUserData } from '@/hooks'

import context from '../context'

import { Container, ReasonSelect, AddNewReturnReason } from './styles'

const SelectReason = () => {
  const {
    t,
    navigation,
    reasonList,
    setReasonList,
    selectedReason,
    setSelectedReason,
    isLoadingReasons,
    setIsLoadingReasons,
    isShowingErrors,
  } = useContext(context)

  const [isShowingModal, setIsShowingModal] = useState(false)
  const { companyId } = useUserData()

  const reasonName = useMemo(() => {
    if (selectedReason) return selectedReason[RETURN_REASON_DOC.NAME]
    return null
  }, [selectedReason])

  const onAddNewReturnReason = useCallback(() => {
    navigation.navigate(MAIN_ROUTES.RETURN_REASON_REGISTRATION, {
      [RETURN_REASON_PARAMS.IS_STACK_PAGE]: true,
    })
  }, [navigation])

  const onSubscribeToReasonsCollection = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.COMPANIES)
      .doc(companyId)
      .collection(COLLECTIONS.RETURN_REASONS)
      .onSnapshot((querySnapshot) => {
        const reasons = querySnapshot.docs.map((doc) => {
          const reason = doc.data()
          return {
            ...reason,
            [RETURN_REASON_DOC.ID]: doc.id,
            [RETURN_REASON_DOC.CREATED_AT]: moment(
              reason[RETURN_REASON_DOC.CREATED_AT],
            ).format('LL'),
          }
        })

        setReasonList(reasons)
        if (isLoadingReasons) setIsLoadingReasons(false)
      })

    return unsubscribe
  }, [companyId, setReasonList, isLoadingReasons, setIsLoadingReasons])

  useEffect(onSubscribeToReasonsCollection, [])

  return (
    <Container>
      <ReasonSelect
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
        showErrorComponent={isShowingErrors && !selectedReason}
        errorComponent={<InputError />}
      />

      <AddNewReturnReason
        onPress={onAddNewReturnReason}
        text={t('addReturnReason')}
        iconComponent={<Fw5Icon color="white" name="plus" />}
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
