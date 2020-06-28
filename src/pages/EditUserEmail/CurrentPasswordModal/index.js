import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { Fw5IconAccent } from '@/components/Fw5Icon'
import StyledAlertModal from '@/components/StyledAlertModal'
import { DefaultTextInput } from '@/components/TextInput'
import Label from '@/components/Label'

import { EditInput, ConfirmButton, Error } from './styles'

const CurrentPasswordModal = (props) => {
  const {
    isVisible,
    setIsVisible,
    password,
    setPassword,
    isShowingErrors,
    setIsShowingErrors,
    iconComponent,
    modalTitle,
    dialogTitle,
    dialogMessage,
    onConfirmPassword,
  } = props

  const { t } = useTranslation('Glossary')

  const onClose = useCallback(() => {
    if (setIsVisible) setIsVisible(false)
  }, [setIsVisible])

  const onConfirm = useCallback(() => {
    if (password && password.trim()) {
      if (setIsVisible) setIsVisible(false)
      if (onConfirmPassword) onConfirmPassword(password)
      return
    }

    if (setIsShowingErrors) setIsShowingErrors(true)
  }, [onConfirmPassword, password, setIsShowingErrors, setIsVisible])

  return (
    <StyledAlertModal
      isVisible={isVisible}
      onClose={onClose}
      iconComponent={iconComponent}
      modalTitle={modalTitle}
      dialogTitle={dialogTitle}
      dialogMessage={dialogMessage}
    >
      <>
        <EditInput
          errorComponent={<Error show={isShowingErrors && !password.trim()} />}
          labelComponent={
            <Label
              label={t('password')}
              iconComponent={<Fw5IconAccent name="key" solid />}
              isRequired
            />
          }
          inputComponent={
            <DefaultTextInput
              placeholder="**********"
              keyboardType="password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />
          }
        />

        <ConfirmButton
          text={t('confirm')}
          onPress={onConfirm}
          backgroundColor="white"
          borderColor="accent"
          textColor="accent"
          borderWidth={2}
          iconComponent={<Fw5IconAccent name="check-circle" size={18} solid />}
        />
      </>
    </StyledAlertModal>
  )
}

CurrentPasswordModal.defaultProps = {
  dialogMessage: null,
  dialogTitle: null,
  iconComponent: null,
  isShowingErrors: false,
  isVisible: false,
  modalTitle: null,
  onConfirmPassword: null,
  password: null,
  setIsShowingErrors: null,
  setPassword: null,
  setIsVisible: null,
}

CurrentPasswordModal.propTypes = {
  dialogMessage: PropTypes.string,
  dialogTitle: PropTypes.string,
  iconComponent: PropTypes.element,
  isShowingErrors: PropTypes.bool,
  isVisible: PropTypes.bool,
  modalTitle: PropTypes.string,
  onConfirmPassword: PropTypes.func,
  password: PropTypes.string,
  setIsShowingErrors: PropTypes.bool,
  setPassword: PropTypes.func,
  setIsVisible: PropTypes.func,
}

export default CurrentPasswordModal
