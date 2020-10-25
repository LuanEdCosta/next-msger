import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { Fw5Icon } from '@/components/Fw5Icon'

import {
  Container,
  BirthDateLabel,
  BirthDayPicker,
  SelectedBirthDay,
} from './styles'

const Filters = (props) => {
  const { birthDay, setBirthDay } = props

  const { t } = useTranslation('BirthdayList')

  return (
    <Container>
      <BirthDateLabel
        label={t('birthDayLabel')}
        iconComponent={<Fw5Icon name="calendar-day" />}
        isRequired
      />

      <BirthDayPicker
        selectedDay={birthDay}
        setSelectedDay={setBirthDay}
        showAnotherDayOption
      />

      <SelectedBirthDay>
        {t('birthDaySelectedDay', {
          birthDay,
          interpolation: { escapeValue: false },
        })}
      </SelectedBirthDay>
    </Container>
  )
}

Filters.defaultProps = {
  birthDay: null,
  setBirthDay: null,
}

Filters.propTypes = {
  birthDay: PropTypes.instanceOf(moment),
  setBirthDay: PropTypes.func,
}

export default Filters
