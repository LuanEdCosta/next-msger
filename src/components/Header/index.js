import React, { useCallback } from 'react'
import { ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { MAIN_COLORS } from '@/styles'
import { withNavigation } from 'react-navigation'
import {
  Styles,
  Container,
  Action,
  TextsContainer,
  Title,
  Subtitle,
} from './styles'

const Header = ({ navigation, ...props }) => {
  const {
    style,
    i18Namespace,
    i18Title,
    i18Subtitle,
    title,
    subtitle,
    onActionPress,
    isStackPage,
    hasShadow,
  } = props

  const { t } = useTranslation(i18Namespace)

  const onPressAction = useCallback(() => {
    if (isStackPage) navigation.goBack()
    else if (navigation.openDrawer) navigation.openDrawer()
  }, [isStackPage, navigation])

  return (
    <Container style={[Styles.container, style]} hasShadow={hasShadow}>
      <Action onPress={onActionPress || onPressAction}>
        <FontAwesome5Icon
          name={isStackPage ? 'chevron-left' : 'bars'}
          color={MAIN_COLORS.primaryText}
          size={20}
        />
      </Action>

      <TextsContainer>
        <Title numberOfLines={1}>{title || t(i18Title)}</Title>
        {(!!subtitle || !!i18Subtitle) && (
          <Subtitle numberOfLines={1}>{subtitle || t(i18Subtitle)}</Subtitle>
        )}
      </TextsContainer>
    </Container>
  )
}

Header.defaultProps = {
  style: null,
  i18Namespace: null,
  i18Title: null,
  i18Subtitle: null,
  title: null,
  subtitle: null,
  onActionPress: null,
  isStackPage: false,
  hasShadow: true,
}

Header.propTypes = {
  style: ViewPropTypes.style,
  hasShadow: PropTypes.bool,
  i18Namespace: PropTypes.string,
  i18Subtitle: PropTypes.string,
  i18Title: PropTypes.string,
  isStackPage: PropTypes.bool,
  onActionPress: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string,
}

export default withNavigation(Header)
