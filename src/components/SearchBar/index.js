import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { Container } from './styles'

const SearchBar = (props) => {
  const { style } = props

  return <Container style={style}>{}</Container>
}

SearchBar.defaultProps = {}

SearchBar.propTypes = {}

export default SearchBar
