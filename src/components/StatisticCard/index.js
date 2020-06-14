import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import { Container, TitleContainer, Title, Value } from './styles'

const StatisticCard = (props) => {
  const { style, title, iconComponent, value } = props

  return (
    <Container style={style}>
      <TitleContainer>
        {iconComponent}
        <Title hasIcon={!!iconComponent}>{title}</Title>
      </TitleContainer>
      <Value>{value}</Value>
    </Container>
  )
}

StatisticCard.defaultProps = {
  style: null,
  title: null,
  iconComponent: null,
  value: null,
}

StatisticCard.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string,
  iconComponent: PropTypes.element,
  value: PropTypes.string,
}

export default StatisticCard
