import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import Touchable from '../Touchable'

import { Container } from './styles'

const Rating = (props) => {
  const { style, onRenderIcon, maxNotes, note, setNote, disabled } = props

  return (
    <Container style={style}>
      {new Array(maxNotes).fill(0, 0, maxNotes).map((_, index) => {
        const isSelected = note - 1 >= index

        const onPress = () => {
          if (setNote) setNote(index + 1)
        }

        const iconComponent = onRenderIcon
          ? onRenderIcon({ isSelected, note, maxNotes })
          : null

        return (
          // eslint-disable-next-line react/no-array-index-key
          <Touchable key={index} onPress={onPress} disabled={disabled}>
            {iconComponent}
          </Touchable>
        )
      })}
    </Container>
  )
}

Rating.defaultProps = {
  onRenderIcon: null,
  maxNotes: 5,
  note: 0,
  setNote: null,
  style: null,
  disabled: false,
}

Rating.propTypes = {
  onRenderIcon: PropTypes.func,
  maxNotes: PropTypes.number,
  note: PropTypes.number,
  setNote: PropTypes.func,
  style: ViewPropTypes.style,
  disabled: PropTypes.bool,
}

export default Rating
