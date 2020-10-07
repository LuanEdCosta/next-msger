import { useCallback, useState, useRef, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'

import { COLLECTIONS, CUSTOMER_DOC } from '@/config/database'
import { useErrorAlert, useUserData } from '@/hooks'
import { FindAddress } from '@/services'
import { EDIT_CUSTOMER_PARAMS } from '@/config/navigation/RouteParams'

export default (navigation) => {
  const { t } = useTranslation([
    'CustomerRegistration',
    'InputMasks',
    'Customer',
  ])

  const isEditing = navigation.getParam(EDIT_CUSTOMER_PARAMS.IS_EDITING, false)
  const customerData = navigation.getParam(
    EDIT_CUSTOMER_PARAMS.CUSTOMER_DATA,
    null,
  )

  const customerId = useMemo(() => {
    if (!customerData) return ''
    const id = customerData[CUSTOMER_DOC.ID]
    return id
  }, [customerData])

  const showErrorAlert = useErrorAlert()
  const { companyId } = useUserData()

  const [isSearchingAddress, setIsSearchingAddress] = useState(false)
  const [isShowingErrors, setIsShowingErrors] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [cep, setCep] = useState('')
  const [address, setAddress] = useState('')
  const [district, setDistrict] = useState('')
  const [number, setNumber] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [complement, setComplement] = useState('')
  const [canReceiveMessages, setCanReceiveMessages] = useState(true)

  const emailInput = useRef(null)
  const whatsappInput = useRef(null)
  const phoneInput = useRef(null)
  const birthDateInput = useRef(null)
  const cepInput = useRef(null)
  const addressInput = useRef(null)
  const districtInput = useRef(null)
  const numberInput = useRef(null)
  const cityInput = useRef(null)
  const stateInput = useRef(null)
  const complementInput = useRef(null)

  const onValidateInputs = useCallback(() => {
    const valuesArray = [name, email, whatsapp]
    return valuesArray.every((str) => !!str && !!str.trim())
  }, [email, name, whatsapp])

  const onClearData = useCallback(() => {
    setName('')
    setEmail('')
    setWhatsapp('')
    setPhone('')
    setIsShowingErrors(false)
    setBirthDate('')
    setCep('')
    setAddress('')
    setDistrict('')
    setNumber('')
    setCity('')
    setState('')
    setComplement('')
    setCanReceiveMessages(true)
  }, [])

  const onSaveCustomer = async () => {
    if (!isShowingErrors) setIsShowingErrors(true)
    if (!onValidateInputs()) return
    setIsSaving(true)

    try {
      const data = {
        [CUSTOMER_DOC.NAME]: name,
        [CUSTOMER_DOC.EMAIL]: email,
        [CUSTOMER_DOC.WHATSAPP]: whatsapp,
        [CUSTOMER_DOC.PHONE]: phone,
        [CUSTOMER_DOC.BIRTH_DATE]: birthDate,
        [CUSTOMER_DOC.CEP]: cep,
        [CUSTOMER_DOC.ADDRESS]: address,
        [CUSTOMER_DOC.DISTRICT]: district,
        [CUSTOMER_DOC.NUMBER]: number,
        [CUSTOMER_DOC.CITY]: city,
        [CUSTOMER_DOC.STATE]: state,
        [CUSTOMER_DOC.COMPLEMENT]: complement,
        [CUSTOMER_DOC.CAN_RECEIVE_MESSAGES]: canReceiveMessages,
        [CUSTOMER_DOC.CREATED_AT]: firestore.Timestamp.now(),
      }

      if (isEditing) {
        await firestore()
          .collection(COLLECTIONS.COMPANIES)
          .doc(companyId)
          .collection(COLLECTIONS.CUSTOMERS)
          .doc(customerId)
          .update(data)
      } else {
        await firestore()
          .collection(COLLECTIONS.COMPANIES)
          .doc(companyId)
          .collection(COLLECTIONS.CUSTOMERS)
          .add(data)

        onClearData()
      }
    } catch (e) {
      showErrorAlert()
    } finally {
      setIsSaving(false)
      if (isEditing && navigation.goBack) navigation.goBack()
    }
  }

  const onFindAddressByCep = useCallback(async () => {
    try {
      setIsSearchingAddress(true)
      const { data } = await FindAddress.findAddressByCep(cep)
      setAddress(data[FindAddress.structure.LOGRADOURO])
      setDistrict(data[FindAddress.structure.BAIRRO])
      setCity(data[FindAddress.structure.LOCALIDADE])
      setState(data[FindAddress.structure.UF])
      setComplement(data[FindAddress.structure.COMPLEMENTO])
    } catch (e) {
      showErrorAlert(t('Customer:addressNotFound'))
    } finally {
      setIsSearchingAddress(false)
    }
  }, [cep, showErrorAlert, t])

  useEffect(() => {
    if (isEditing && customerData) {
      const {
        [CUSTOMER_DOC.NAME]: currentName,
        [CUSTOMER_DOC.EMAIL]: currentEmail,
        [CUSTOMER_DOC.WHATSAPP]: currentWhatsapp,
        [CUSTOMER_DOC.PHONE]: currentPhone,
        [CUSTOMER_DOC.BIRTH_DATE]: currentBirthDate,
        [CUSTOMER_DOC.CEP]: currentCep,
        [CUSTOMER_DOC.ADDRESS]: currentAddress,
        [CUSTOMER_DOC.DISTRICT]: currentDistrict,
        [CUSTOMER_DOC.NUMBER]: currentNumber,
        [CUSTOMER_DOC.CITY]: currentCity,
        [CUSTOMER_DOC.STATE]: currentState,
        [CUSTOMER_DOC.COMPLEMENT]: currentComplement,
        [CUSTOMER_DOC.CAN_RECEIVE_MESSAGES]: currentCanReceiveMessages,
      } = customerData

      setName(currentName)
      setEmail(currentEmail)
      setWhatsapp(currentWhatsapp)
      setPhone(currentPhone)
      setBirthDate(currentBirthDate)
      setCep(currentCep)
      setAddress(currentAddress)
      setDistrict(currentDistrict)
      setNumber(currentNumber)
      setCity(currentCity)
      setState(currentState)
      setComplement(currentComplement)
      setCanReceiveMessages(currentCanReceiveMessages)
    }
  }, [customerData, isEditing])

  return {
    t,
    onSaveCustomer,
    onFindAddressByCep,

    emailInput,
    whatsappInput,
    phoneInput,
    birthDateInput,
    cepInput,
    addressInput,
    districtInput,
    numberInput,
    cityInput,
    stateInput,
    complementInput,

    isSearchingAddress,
    setIsSearchingAddress,
    isShowingErrors,
    setIsShowingErrors,
    isSaving,
    setIsSaving,
    name,
    setName,
    email,
    setEmail,
    whatsapp,
    setWhatsapp,
    phone,
    setPhone,
    birthDate,
    setBirthDate,
    cep,
    setCep,
    address,
    setAddress,
    district,
    setDistrict,
    number,
    setNumber,
    city,
    setCity,
    state,
    setState,
    complement,
    setComplement,
    canReceiveMessages,
    setCanReceiveMessages,
  }
}
