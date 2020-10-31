import React, { useMemo } from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import { getColor } from '@/utils'

import { Container, Initials } from './styles'

const InitialsBox = (props) => {
  const { style, text, bgColor, textColor, fontSize } = props

  const initials = useMemo(() => {
    if (text && text.trim()) {
      const trimmedText = text.trim()
      const wordsArray = trimmedText.split(' ')

      if (wordsArray.length > 1) {
        const [firstWord, secondWord] = wordsArray
        return firstWord.charAt(0) + secondWord.charAt(0)
      }

      return trimmedText.charAt(0) + trimmedText.charAt(1)
    }

    return null
  }, [text])

  return (
    <Container style={style} color={getColor(bgColor)}>
      <Initials color={getColor(textColor)} fontSize={fontSize}>
        {initials}
      </Initials>
    </Container>
  )
}

InitialsBox.defaultProps = {
  style: null,
  text: null,
  bgColor: 'accent',
  textColor: 'white',
  fontSize: 20,
}

InitialsBox.propTypes = {
  style: ViewPropTypes.style,
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  fontSize: PropTypes.number,
}

export default InitialsBox
