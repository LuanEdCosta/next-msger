import React, { useCallback } from 'react'
import { DrawerNavigatorItems } from 'react-navigation-drawer'
import { MAIN_COLORS } from '@/styles'
import { useTranslation } from 'react-i18next'
import DRAWER_PAGES from '@/config/constants/DrawerPages'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { Container, Styles } from './styles'
import DrawerHeader from './DrawerHeader'

const Drawer = (props) => {
  const { t } = useTranslation('NavigationDrawer')

  const onGetLabel = useCallback(
    ({ route }) => {
      const { params } = route
      const labelKey = params[DRAWER_PAGES.DRAWER_LABEL]
      return t(labelKey)
    },
    [t],
  )

  const onRenderIcon = useCallback(({ route, tintColor }) => {
    const { params } = route
    const iconName = params[DRAWER_PAGES.DRAWER_ICON]
    return (
      <FontAwesome5Icon name={iconName} color={tintColor} size={20} solid />
    )
  }, [])

  return (
    <Container forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerHeader />

      <DrawerNavigatorItems
        {...props}
        activeBackgroundColor={MAIN_COLORS.accent}
        activeTintColor={MAIN_COLORS.white}
        inactiveTintColor={MAIN_COLORS.primaryText}
        labelStyle={Styles.labelStyle}
        activeLabelStyle={Styles.activeLabelStyle}
        iconContainerStyle={Styles.iconContainer}
        getLabel={onGetLabel}
        renderIcon={onRenderIcon}
      />
    </Container>
  )
}

export default Drawer
