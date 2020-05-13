import React, { useCallback } from 'react'
import { ViewPropTypes, Dimensions } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import PropTypes from 'prop-types'

import { MessagePanelIcon, Fw5Icon, Fw5IconAccent } from '@/components/Fw5Icon'
import { AccentSpinner } from '@/components/Spinner'
import { useArraySearch } from '@/hooks'

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
} from './styles'

const SearchableListModal = (props) => {
  const {
    style,
    onBackdropPress,
    onBackButtonPress,
    isShowing,
    setIsShowing,
    list,
    isLoadingList,
    onItemSelected,
    selectedItem,
    idKey,
    titleKey,
    subtitleKey,
    titleIconComponent,
    subtitleIconComponent,
    modalTitle,
    searchInputPlaceholder,
    messagePanelText,
  } = props

  const { width, height } = Dimensions.get('window')

  const {
    isSearching,
    itemsToShow,
    onChangeSearchText,
    searchText,
  } = useArraySearch({
    list,
    isItemsObjects: true,
    keysToFilter: [titleKey, subtitleKey],
  })

  const onClearSearchText = useCallback(() => {
    onChangeSearchText('')
  }, [onChangeSearchText])

  const onCloseModal = useCallback(() => {
    if (setIsShowing) setIsShowing(false)
    if (searchText) onChangeSearchText('')
  }, [onChangeSearchText, searchText, setIsShowing])

  const keyExtractor = useCallback((item) => item[idKey], [idKey])

  return (
    <ReactNativeModal
      isVisible={isShowing}
      deviceWidth={width}
      deviceHeight={height}
      onBackButtonPress={onBackButtonPress || onCloseModal}
      onBackdropPress={onBackdropPress || onCloseModal}
      backdropOpacity={0.7}
      backdropColor="black"
      animationIn="fadeInRight"
      animationOut="fadeOutRight"
      animationInTiming={400}
      animationOutTiming={400}
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
                placeholder={searchInputPlaceholder}
                autoCapitalize="none"
                returnKeyType="done"
                blurOnSubmit
              />
            }
          />

          <CloseButton onPress={onCloseModal}>
            <Fw5Icon name="chevron-right" size={20} />
          </CloseButton>
        </Header>

        <List
          data={isLoadingList ? [] : itemsToShow}
          keyExtractor={keyExtractor}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          ListEmptyComponent={
            <EmptyMessagePanel
              isLoading={isLoadingList}
              text={messagePanelText}
              iconComponent={<MessagePanelIcon name="list-ul" />}
            />
          }
          renderItem={({ item }) => {
            const {
              [idKey]: id,
              [titleKey]: title,
              [subtitleKey]: subtitle,
            } = item

            const onSelectItem = () => {
              if (onItemSelected) onItemSelected(item)
              onCloseModal()
            }

            const isSelected = selectedItem && selectedItem[idKey] === id

            return (
              <Item
                onPress={onSelectItem}
                iconComponent={
                  isSelected && <Fw5IconAccent name="check-circle" size={20} />
                }
              >
                <ItemText text={title} isTitle>
                  {titleIconComponent}
                </ItemText>

                <ItemText text={subtitle}>{subtitleIconComponent}</ItemText>
              </Item>
            )
          }}
        />
      </Container>
    </ReactNativeModal>
  )
}

SearchableListModal.defaultProps = {
  idKey: null,
  isLoadingList: false,
  list: [],
  onBackButtonPress: null,
  onBackdropPress: null,
  onItemSelected: null,
  selectedItem: null,
  setIsShowing: null,
  isShowing: false,
  style: null,
  subtitleIconComponent: null,
  subtitleKey: null,
  titleIconComponent: null,
  titleKey: null,
  modalTitle: null,
  searchInputPlaceholder: null,
  messagePanelText: null,
}

SearchableListModal.propTypes = {
  idKey: PropTypes.string,
  isLoadingList: PropTypes.bool,
  list: PropTypes.arrayOf(PropTypes.object),
  onBackButtonPress: PropTypes.func,
  onBackdropPress: PropTypes.func,
  onItemSelected: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  selectedItem: PropTypes.any,
  setIsShowing: PropTypes.func,
  isShowing: PropTypes.bool,
  style: ViewPropTypes.style,
  subtitleIconComponent: PropTypes.element,
  subtitleKey: PropTypes.string,
  titleIconComponent: PropTypes.element,
  titleKey: PropTypes.string,
  modalTitle: PropTypes.string,
  searchInputPlaceholder: PropTypes.string,
  messagePanelText: PropTypes.string,
}

export default SearchableListModal
