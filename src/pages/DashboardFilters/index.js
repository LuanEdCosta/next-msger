import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import Header from '@/components/Header'
import { ButtonIcon, Fw5Icon, Fw5IconWhite } from '@/components/Fw5Icon'
import { DASHBOARD_FILTERS_PARAMS } from '@/config/navigation/RouteParams'

import {
  Container,
  Scroll,
  FilterButton,
  FilterLabel,
  FilterCheckbox,
  CheckboxText,
} from './styles'

const DashboardFilters = ({ navigation }) => {
  const onFilterCallback = navigation.getParam(
    DASHBOARD_FILTERS_PARAMS.ON_FILTER,
  )

  const currentFilters = navigation.getParam(
    DASHBOARD_FILTERS_PARAMS.CURRENT_FILTERS,
    {
      filterDateType: 2,
    },
  )

  const { t } = useTranslation('DashboardFilters')
  const [filterDateType, setFilterDateType] = useState(
    currentFilters.filterDateType,
  )

  const onFilter = useCallback(() => {
    if (!onFilterCallback) {
      navigation.goBack()
      return
    }

    const onGetFilterDate = () => {
      switch (filterDateType) {
        case 0:
          return moment().startOf('day')
        case 1:
          return moment().startOf('week')
        case 2:
          return moment().startOf('month')
        case 3:
          return moment().startOf('year')
        default:
          return null
      }
    }

    const filters = { filterDate: onGetFilterDate(), filterDateType }
    onFilterCallback(filters)
    navigation.goBack()
  }, [filterDateType, navigation, onFilterCallback])

  return (
    <Container>
      <Header
        i18Namespace="DashboardFilters"
        i18Title="pageTitle"
        isStackPage
      />

      <Scroll>
        <FilterLabel
          label={t('dateFilterLabel')}
          iconComponent={<Fw5Icon name="calendar-week" solid />}
        />

        <FilterCheckbox
          setIsChecked={() => setFilterDateType(0)}
          isChecked={filterDateType === 0}
          checkMarkIconComponent={<Fw5IconWhite name="check" />}
        >
          <CheckboxText>{t('dateTypes.today')}</CheckboxText>
        </FilterCheckbox>

        <FilterCheckbox
          setIsChecked={() => setFilterDateType(1)}
          isChecked={filterDateType === 1}
          checkMarkIconComponent={<Fw5IconWhite name="check" />}
        >
          <CheckboxText>{t('dateTypes.currentWeek')}</CheckboxText>
        </FilterCheckbox>

        <FilterCheckbox
          setIsChecked={() => setFilterDateType(2)}
          isChecked={filterDateType === 2}
          checkMarkIconComponent={<Fw5IconWhite name="check" />}
        >
          <CheckboxText>{t('dateTypes.currentMonth')}</CheckboxText>
        </FilterCheckbox>

        <FilterCheckbox
          setIsChecked={() => setFilterDateType(3)}
          isChecked={filterDateType === 3}
          checkMarkIconComponent={<Fw5IconWhite name="check" />}
        >
          <CheckboxText>{t('dateTypes.currentYear')}</CheckboxText>
        </FilterCheckbox>
      </Scroll>

      <FilterButton
        text={t('filterButton')}
        onPress={onFilter}
        iconComponent={<ButtonIcon name="filter" />}
      />
    </Container>
  )
}

DashboardFilters.navigationOptions = () => ({
  headerShown: false,
})

export default DashboardFilters
