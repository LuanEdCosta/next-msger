import React from 'react'
import PropTypes from 'prop-types'
import { MaterialTopTabBar } from 'react-navigation-tabs'

import { MAIN_COLORS } from '@/styles'

import styles from './styles'

const TabBar = (props) => {
  const { labels, icons, ...otherProps } = props

  const onGetLabelText = ({ route }) => labels[route.routeName]
  const onRenderIcon = ({ route }) => icons[route.routeName]

  return (
    <MaterialTopTabBar
      style={styles.barStyle}
      indicatorStyle={styles.indicatorStyle}
      labelStyle={styles.labelStyle}
      iconStyle={styles.iconStyle}
      tabStyle={styles.tabStyle}
      activeTintColor={MAIN_COLORS.accent}
      inactiveTintColor={MAIN_COLORS.secondaryText}
      getLabelText={onGetLabelText}
      renderIcon={onRenderIcon}
      showIcon
      {...otherProps}
    />
  )
}

TabBar.propTypes = {
  labels: PropTypes.objectOf(PropTypes.string).isRequired,
  icons: PropTypes.objectOf(PropTypes.element).isRequired,
}

export default TabBar
