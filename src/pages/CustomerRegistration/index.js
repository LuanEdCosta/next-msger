import React from 'react'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import { DefaultTextInput, DefaultTextInputMask } from '@/components/TextInput'
import { ButtonIcon, CheckboxIcon, Fw5IconAccent } from '@/components/Fw5Icon'
import { AccentSpinner, WhiteSpinner } from '@/components/Spinner'
import { DATE_FORMATS } from '@/config/constants'
import InputError from '@/components/InputError'
import { ADMOB_BANNER_ID } from '@/config/ads'
import Header from '@/components/Header'
import Button from '@/components/Button'
import Label from '@/components/Label'

import usePageState from './usePageState'
import {
  Container,
  Scroll,
  CustomerInput,
  Content,
  CustomerCheckbox,
  CustomerCheckboxText,
} from './styles'

const CustomerRegistration = ({ navigation }) => {
  const {
    t,
    onSaveCustomer,
    onFindAddressByCep,
    isBirthDateValid,

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
    isShowingErrors,
    isSaving,
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
  } = usePageState(navigation)

  return (
    <Container>
      <Header i18Namespace="NavigationDrawer" i18Title="customerRegistration" />

      <Scroll>
        <BannerAd
          unitId={ADMOB_BANNER_ID}
          size={BannerAdSize.SMART_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />

        <Content>
          <CustomerInput
            showErrorComponent={isShowingErrors && !name.trim()}
            errorComponent={<InputError />}
            labelComponent={
              <Label
                label={t('Customer:nameLabel')}
                isRequired
                iconComponent={<Fw5IconAccent name="signature" solid />}
              />
            }
            inputComponent={
              <DefaultTextInput
                placeholder={t('Customer:namePh')}
                returnKeyType="next"
                autoCapitalize="words"
                autoCompleteType="name"
                blurOnSubmit={false}
                onChangeText={setName}
                value={name}
                onSubmitEditing={() => {
                  emailInput.current.focus()
                }}
              />
            }
          />

          <CustomerInput
            showErrorComponent={isShowingErrors && !email.trim()}
            errorComponent={<InputError />}
            labelComponent={
              <Label
                label={t('Customer:emailLabel')}
                isRequired
                iconComponent={<Fw5IconAccent name="envelope" solid />}
              />
            }
            inputComponent={
              <DefaultTextInput
                ref={emailInput}
                placeholder={t('Customer:emailPh')}
                returnKeyType="next"
                autoCapitalize="none"
                autoCompleteType="email"
                blurOnSubmit={false}
                onChangeText={setEmail}
                value={email}
                onSubmitEditing={() => {
                  whatsappInput.current.focus()
                }}
              />
            }
          />

          <CustomerInput
            showErrorComponent={isShowingErrors && !whatsapp.trim()}
            errorComponent={<InputError />}
            labelComponent={
              <Label
                label={t('Customer:whatsappLabel')}
                isRequired
                iconComponent={<Fw5IconAccent name="mobile" solid />}
              />
            }
            inputComponent={
              <DefaultTextInputMask
                type="cel-phone"
                placeholder={t('InputMasks:cellphonePlaceholder')}
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={setWhatsapp}
                value={whatsapp}
                refInput={(ref) => {
                  whatsappInput.current = ref
                }}
                onSubmitEditing={() => {
                  phoneInput.current.focus()
                }}
              />
            }
          />

          <CustomerInput
            labelComponent={
              <Label
                label={t('Customer:phoneLabel')}
                iconComponent={<Fw5IconAccent name="phone" solid />}
              />
            }
            inputComponent={
              <DefaultTextInputMask
                type="cel-phone"
                placeholder={t('InputMasks:phonePlaceholder')}
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={setPhone}
                value={phone}
                refInput={(ref) => {
                  phoneInput.current = ref
                }}
                onSubmitEditing={() => {
                  birthDateInput.current.focus()
                }}
              />
            }
          />

          <CustomerInput
            showErrorComponent={isShowingErrors && !isBirthDateValid(birthDate)}
            errorComponent={<InputError text={t('birthDateInvalid')} />}
            labelComponent={
              <Label
                label={t('Customer:birthDateLabel')}
                iconComponent={<Fw5IconAccent name="birthday-cake" solid />}
              />
            }
            inputComponent={
              <DefaultTextInputMask
                type="datetime"
                options={{
                  format: DATE_FORMATS.SLASH.DDMMYYYY,
                }}
                placeholder={t('InputMasks:birthDatePlaceholder')}
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={setBirthDate}
                value={birthDate}
                refInput={(ref) => {
                  birthDateInput.current = ref
                }}
                onSubmitEditing={() => {
                  cepInput.current.focus()
                }}
              />
            }
          />

          <CustomerInput
            labelComponent={
              <Label
                label={t('Customer:cepLabel')}
                iconComponent={<Fw5IconAccent name="map-marker-alt" solid />}
              />
            }
            inputComponent={
              <DefaultTextInputMask
                type="zip-code"
                placeholder={t('InputMasks:cepPlaceholder')}
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={setCep}
                value={cep}
                onBlur={onFindAddressByCep}
                refInput={(ref) => {
                  cepInput.current = ref
                }}
                onSubmitEditing={() => {
                  addressInput.current.focus()
                }}
              />
            }
            actionIconComponent={
              isSearchingAddress ? <AccentSpinner /> : undefined
            }
          />

          <CustomerInput
            labelComponent={
              <Label
                label={t('Customer:addressLabel')}
                iconComponent={<Fw5IconAccent name="road" solid />}
              />
            }
            inputComponent={
              <DefaultTextInput
                ref={addressInput}
                placeholder={t('Customer:addressPh')}
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={setAddress}
                value={address}
                onSubmitEditing={() => {
                  numberInput.current.focus()
                }}
              />
            }
          />

          <CustomerInput
            labelComponent={
              <Label
                label={t('Customer:numberLabel')}
                iconComponent={<Fw5IconAccent name="home" solid />}
              />
            }
            inputComponent={
              <DefaultTextInput
                ref={numberInput}
                placeholder={t('Customer:numberPh')}
                keyboardType="numeric"
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={setNumber}
                value={number}
                onSubmitEditing={() => {
                  districtInput.current.focus()
                }}
              />
            }
          />

          <CustomerInput
            labelComponent={
              <Label
                label={t('Customer:districtLabel')}
                iconComponent={<Fw5IconAccent name="map-pin" solid />}
              />
            }
            inputComponent={
              <DefaultTextInput
                ref={districtInput}
                placeholder={t('Customer:districtPh')}
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={setDistrict}
                value={district}
                onSubmitEditing={() => {
                  cityInput.current.focus()
                }}
              />
            }
          />

          <CustomerInput
            labelComponent={
              <Label
                label={t('Customer:cityLabel')}
                iconComponent={<Fw5IconAccent name="map" solid />}
              />
            }
            inputComponent={
              <DefaultTextInput
                ref={cityInput}
                placeholder={t('Customer:cityPh')}
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={setCity}
                value={city}
                onSubmitEditing={() => {
                  stateInput.current.focus()
                }}
              />
            }
          />

          <CustomerInput
            labelComponent={
              <Label
                label={t('Customer:stateLabel')}
                iconComponent={<Fw5IconAccent name="map-marked-alt" solid />}
              />
            }
            inputComponent={
              <DefaultTextInput
                ref={stateInput}
                placeholder={t('Customer:statePh')}
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={setState}
                value={state}
                onSubmitEditing={() => {
                  complementInput.current.focus()
                }}
              />
            }
          />

          <CustomerInput
            labelComponent={
              <Label
                label={t('Customer:complementLabel')}
                iconComponent={<Fw5IconAccent name="comment" solid />}
              />
            }
            inputComponent={
              <DefaultTextInput
                ref={complementInput}
                placeholder={t('Customer:complementPh')}
                onChangeText={setComplement}
                value={complement}
              />
            }
          />

          <CustomerCheckbox
            isChecked={canReceiveMessages}
            setIsChecked={setCanReceiveMessages}
            checkMarkIconComponent={<CheckboxIcon name="check" />}
            hasRoundCorners
          >
            <CustomerCheckboxText>
              {t('Customer:canReceiveMessagesLabel')}
            </CustomerCheckboxText>
          </CustomerCheckbox>

          <Button
            text={t('saveButton')}
            onPress={onSaveCustomer}
            disabled={isSaving}
            iconComponent={
              isSaving ? <WhiteSpinner /> : <ButtonIcon name="check" />
            }
          />
        </Content>
      </Scroll>
    </Container>
  )
}

CustomerRegistration.navigationOptions = () => ({
  headerShown: false,
})

export default CustomerRegistration
