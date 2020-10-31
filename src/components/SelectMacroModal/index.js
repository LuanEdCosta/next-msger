import React, { useCallback, useMemo, useState } from 'react'
import { ViewPropTypes, Dimensions } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import { useArraySearch } from '@/hooks'
import { MACROS } from '@/config/macros'
import { AccentSpinner } from '@/components/Spinner'
import {
  MessagePanelIcon,
  Fw5Icon,
  Fw5IconAccent,
  ButtonIcon,
} from '@/components/Fw5Icon'

import {
  Container,
  Header,
  SearchInput,
  TextInput,
  CloseButton,
  List,
  EmptyMessagePanel,
  ModalTitle,
  Item,
  ItemText,
  ConfirmButton,
} from './styles'

const SelectMacroModal = (props) => {
  const {
    onBackButtonPress,
    onBackdropPress,
    onCloseModal,
    isShowing,
    style,
    modalTitle,
    setMessage,
  } = props

  const { t } = useTranslation(['Macro', 'Glossary', 'Common'])
  const { width, height } = Dimensions.get('window')

  const [selectedMacros, setSelectedMacros] = useState([])

  const list = useMemo(() => {
    const macroKeys = Object.keys(MACROS)
    return macroKeys.map((key) => ({
      id: key,
      macro: MACROS[key],
      text: t(`labels.${key}`),
    }))
  }, [t])

  const {
    isSearching,
    itemsToShow,
    onChangeSearchText,
    searchText,
  } = useArraySearch({
    list,
    isItemsObjects: true,
    keysToFilter: ['text', 'macro'],
  })

  const onClearSearchText = useCallback(() => {
    onChangeSearchText('')
  }, [onChangeSearchText])

  const onCloseModalAndClearState = useCallback(() => {
    if (onCloseModal) onCloseModal()
    if (searchText) onChangeSearchText('')
    setSelectedMacros([])
  }, [onChangeSearchText, searchText, onCloseModal])

  const keyExtractor = useCallback((item) => item.id, [])

  const onConfirmMacroSelection = useCallback(() => {
    try {
      if (setMessage) {
        const macrosText = selectedMacros.join(' ')
        setMessage((currentMessage) => {
          return `${currentMessage}${macrosText}`
        })
      }
    } finally {
      onCloseModalAndClearState()
    }
  }, [onCloseModalAndClearState, selectedMacros, setMessage])

  return (
    <ReactNativeModal
      isVisible={isShowing}
      deviceWidth={width}
      deviceHeight={height}
      onBackButtonPress={onBackButtonPress || onCloseModalAndClearState}
      onBackdropPress={onBackdropPress || onCloseModalAndClearState}
      backdropOpacity={0.7}
      backdropColor="black"
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      coverScreen
      useNativeDriver
      hardwareAccelerated
    >
      <Container style={style}>
        <Header>
          <SearchInput
            actionIconComponent={<Fw5Icon name="times" />}
            onActionPress={onClearSearchText}
            showAction={!!searchText}
            labelComponent={
              !!modalTitle && <ModalTitle>{modalTitle}</ModalTitle>
            }
            inputIconComponent={
              isSearching ? (
                <AccentSpinner size={14} />
              ) : (
                <Fw5IconAccent name="search" />
              )
            }
            inputComponent={
              <TextInput
                value={searchText}
                onChangeText={onChangeSearchText}
                placeholder={t('Common:typeToSearch')}
                autoCapitalize="none"
                returnKeyType="done"
                blurOnSubmit
              />
            }
          />

          <CloseButton onPress={onCloseModalAndClearState}>
            <Fw5Icon name="times-circle" size={20} />
          </CloseButton>
        </Header>

        <List
          data={itemsToShow}
          keyExtractor={keyExtractor}
          maxToRenderPerBatch={7}
          initialNumToRender={7}
          ListEmptyComponent={
            <EmptyMessagePanel
              text={t('noMacroFound')}
              iconComponent={<MessagePanelIcon name="list-ul" />}
            />
          }
          renderItem={({ item }) => {
            const { macro, text } = item
            const isSelected = selectedMacros.includes(macro)

            const onSelectMacro = () => {
              setSelectedMacros((currentMacros) => {
                return [...currentMacros, macro]
              })
            }

            return (
              <Item
                onPress={onSelectMacro}
                iconComponent={
                  isSelected && <Fw5IconAccent name="check-circle" size={20} />
                }
              >
                <ItemText text={text} isTitle>
                  <Fw5Icon name="file-alt" solid />
                </ItemText>

                <ItemText text={macro}>
                  <Fw5Icon name="font" solid />
                </ItemText>
              </Item>
            )
          }}
        />

        <ConfirmButton
          text={t('Glossary:ok')}
          onPress={onConfirmMacroSelection}
          iconComponent={<ButtonIcon name="check" />}
        />
      </Container>
    </ReactNativeModal>
  )
}

SelectMacroModal.defaultProps = {
  onBackButtonPress: null,
  onBackdropPress: null,
  onCloseModal: null,
  isShowing: false,
  style: null,
  modalTitle: null,
  setMessage: null,
}

SelectMacroModal.propTypes = {
  onBackButtonPress: PropTypes.func,
  onBackdropPress: PropTypes.func,
  onCloseModal: PropTypes.func,
  isShowing: PropTypes.bool,
  style: ViewPropTypes.style,
  modalTitle: PropTypes.string,
  setMessage: PropTypes.func,
}

export default SelectMacroModal
