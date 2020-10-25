import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { View, ViewPropTypes, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import moment from 'moment'

import DateTimePicker from '@/components/DateTimePicker'

import DayPickerItem from './DayPickerItem'
import { AnotherDay } from './styles'

const DayPicker = (props) => {
  const {
    style,
    scrollContainerStyle,
    selectedDay,
    setSelectedDay,
    daysToShow,
    showAnotherDayOption,
    datePickerMinimumDate,
    datePickerMaximumDate,
  } = props

  const { t } = useTranslation('Calendar')
  const [isShowingDatePicker, setIsShowingDatePicker] = useState(false)
  const [hadSelectedAnotherDay, setHadSelectedAnotherDay] = useState(false)
  const daysOfWeek = useMemo(() => t('daysOfWeek', { returnObjects: true }), [
    t,
  ])

  const onInitialRender = useCallback(() => {
    if (selectedDay) {
      let isDifferent = true
      daysToShow.forEach((day) => {
        const date = moment().add(day, 'day')
        if (date.isSame(selectedDay, 'day')) isDifferent = false
      })
      setHadSelectedAnotherDay(isDifferent)
    }
  }, [daysToShow, selectedDay])

  useEffect(onInitialRender, [])

  const onRenderDays = useCallback(() => {
    return daysToShow.map((day) => {
      const date = moment().add(day, 'day')

      let dayName = ''
      if (day === 0) dayName = t('today')
      else if (day === 1) dayName = t('tomorrow')
      else dayName = daysOfWeek[date.isoWeekday() - 1]

      const onPress = () => {
        setHadSelectedAnotherDay(false)
        setSelectedDay(date)
      }

      const isSelected =
        selectedDay &&
        !hadSelectedAnotherDay &&
        moment(selectedDay).isSame(date, 'day')

      return (
        <DayPickerItem
          key={dayName}
          onPress={onPress}
          dayName={dayName}
          isSelected={isSelected}
        />
      )
    })
  }, [
    daysOfWeek,
    daysToShow,
    hadSelectedAnotherDay,
    selectedDay,
    setSelectedDay,
    t,
  ])

  const onOpenDatePicker = useCallback(() => {
    setIsShowingDatePicker(true)
  }, [])

  const onChangeDate = useCallback(
    (_, date) => {
      setIsShowingDatePicker(false)
      if (date) {
        setHadSelectedAnotherDay(true)
        setSelectedDay(moment(date))
      }
    },
    [setSelectedDay],
  )

  return (
    <View style={style}>
      <ScrollView
        contentContainerStyle={scrollContainerStyle}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        horizontal
      >
        {onRenderDays()}

        {showAnotherDayOption && (
          <>
            <DateTimePicker
              mode="date"
              value={
                selectedDay ? moment(selectedDay).toDate() : moment().toDate()
              }
              isShowing={isShowingDatePicker}
              onChange={onChangeDate}
              minimumDate={datePickerMinimumDate}
              maximumDate={datePickerMaximumDate}
            />

            <AnotherDay
              onPress={onOpenDatePicker}
              dayName={t('anotherDay')}
              isSelected={hadSelectedAnotherDay}
            />
          </>
        )}
      </ScrollView>
    </View>
  )
}

DayPicker.defaultProps = {
  style: null,
  scrollContainerStyle: null,
  daysToShow: [0, 1, 2, 3, 4, 5, 6],
  showAnotherDayOption: true,
  datePickerMinimumDate: null,
  datePickerMaximumDate: null,
}

DayPicker.propTypes = {
  selectedDay: PropTypes.number.isRequired,
  setSelectedDay: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  scrollContainerStyle: ViewPropTypes.style,
  daysToShow: PropTypes.arrayOf(PropTypes.number),
  showAnotherDayOption: PropTypes.bool,
  datePickerMinimumDate: PropTypes.instanceOf(Date),
  datePickerMaximumDate: PropTypes.instanceOf(Date),
}

export default DayPicker
