import React from 'react'
import { DrawerNavigatorItems } from 'react-navigation-drawer'
import { MAIN_COLORS } from '@/styles'
import { Container, Styles } from './styles'
import DrawerHeader from './DrawerHeader'

const Drawer = (props) => {
  return (
    <Container forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerHeader />

      <DrawerNavigatorItems
        activeBackgroundColor={MAIN_COLORS.accent}
        activeTintColor={MAIN_COLORS.white}
        inactiveTintColor={MAIN_COLORS.primaryText}
        labelStyle={Styles.labelStyle}
        activeLabelStyle={Styles.activeLabelStyle}
        iconContainerStyle={Styles.iconContainer}
        {...props}
      />
    </Container>
  )
}

export default Drawer
