import React, { useRef, useCallback, useState } from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { MAIN_COLORS } from '@/styles'
import {
  Container,
  Bar,
  SearchInput,
  FilterToggler,
  FilterContent,
} from './styles'
import { Fw5IconAccent, Fw5Icon } from '../Fw5Icon'
import { DefaultTextInput } from '../TextInput'
import { AccentSpinner } from '../Spinner'

const SearchBar = (props) => {
  const {
    style,
    searchText,
    setSearchText,
    placeholder,
    children,
    hasFilters,
    filterTogglerDisabled,
    isSearching,
  } = props

  const { t } = useTranslation('Common')
  const [isShowingFilters, setIsShowingFilters] = useState(false)
  const searchInput = useRef(null)

  const onFocusSearchInput = useCallback(() => {
    searchInput.current.focus()
  }, [])

  const onToggleFilters = useCallback(() => {
    setIsShowingFilters(!isShowingFilters)
  }, [isShowingFilters])

  const onClearSearchText = useCallback(() => {
    if (setSearchText) setSearchText('')
  }, [setSearchText])

  return (
    <Container style={style}>
      <Bar>
        <SearchInput
          onLeftIconPress={onFocusSearchInput}
          onActionPress={onClearSearchText}
          showAction={!!searchText}
          actionIconComponent={<Fw5Icon name="times" />}
          inputIconComponent={
            isSearching ? (
              <AccentSpinner size={14} />
            ) : (
              <Fw5IconAccent name="search" />
            )
          }
          inputComponent={
            <DefaultTextInput
              ref={searchInput}
              value={searchText}
              onChangeText={setSearchText}
              placeholder={placeholder || t('typeToSearch')}
            />
          }
        />

        {!!hasFilters && (
          <FilterToggler
            onPress={onToggleFilters}
            isSelected={isShowingFilters}
            disabled={filterTogglerDisabled}
          >
            <Fw5Icon
              name="sliders-h"
              size={20}
              color={
                isShowingFilters
                  ? MAIN_COLORS.accent
                  : MAIN_COLORS.secondaryText
              }
            />
          </FilterToggler>
        )}
      </Bar>

      {isShowingFilters && !!hasFilters && !!children && (
        <FilterContent>{children}</FilterContent>
      )}
    </Container>
  )
}

SearchBar.defaultProps = {
  children: null,
  filterTogglerDisabled: false,
  hasFilters: true,
  isSearching: false,
  placeholder: null,
  searchText: null,
  setSearchText: null,
  style: null,
}

SearchBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  filterTogglerDisabled: PropTypes.bool,
  hasFilters: PropTypes.bool,
  isSearching: PropTypes.bool,
  placeholder: PropTypes.string,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
  style: ViewPropTypes.style,
}

export default SearchBar
