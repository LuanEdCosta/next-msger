import React from 'react'
import PropTypes from 'prop-types'
import { MaterialTopTabBar } from 'react-navigation-tabs'
import { ViewPropTypes } from 'react-native'

import { MAIN_COLORS } from '@/styles'

import styles from './styles'

const TabBar = (props) => {
  const { style, barStyle, tabStyle, labels, icons, ...otherProps } = props

  const onGetLabelText = ({ route }) => labels[route.routeName]
  const onRenderIcon = ({ route }) => icons[route.routeName]

  return (
    <MaterialTopTabBar
      style={[styles.barStyle, style, barStyle]}
      indicatorStyle={styles.indicatorStyle}
      labelStyle={styles.labelStyle}
      iconStyle={styles.iconStyle}
      tabStyle={[styles.tabStyle, tabStyle]}
      activeTintColor={MAIN_COLORS.accent}
      inactiveTintColor={MAIN_COLORS.secondaryText}
      getLabelText={onGetLabelText}
      renderIcon={onRenderIcon}
      showIcon
      {...otherProps}
    />
  )
}

TabBar.defaultProps = {
  style: null,
  barStyle: null,
  tabStyle: null,
}

TabBar.propTypes = {
  labels: PropTypes.objectOf(PropTypes.string).isRequired,
  icons: PropTypes.objectOf(PropTypes.element).isRequired,
  // style to make it extendable with styled-components
  style: ViewPropTypes.style,
  tabStyle: ViewPropTypes.style,
  // barStyle to pass another style props using .attrs() in styled-components
  barStyle: ViewPropTypes.style,
}

export default TabBar
