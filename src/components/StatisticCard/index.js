import React from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import { Container, TitleContainer, Title, Value, Spinner } from './styles'

const StatisticCard = (props) => {
  const { style, title, iconComponent, value, isLoading } = props

  return (
    <Container style={style}>
      <TitleContainer>
        {iconComponent}
        <Title hasIcon={!!iconComponent}>{title}</Title>
      </TitleContainer>

      {isLoading ? <Spinner /> : <Value>{value}</Value>}
    </Container>
  )
}

StatisticCard.defaultProps = {
  style: null,
  title: null,
  iconComponent: null,
  value: null,
  isLoading: false,
}

StatisticCard.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string,
  iconComponent: PropTypes.element,
  value: PropTypes.string,
  isLoading: PropTypes.bool,
}

export default StatisticCard
