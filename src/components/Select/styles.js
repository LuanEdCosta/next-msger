import styled from 'styled-components/native'

import { MAIN_COLORS } from '@/styles'

import { DefaultText } from '../Text'
import TouchableIcon from '../TouchableIcon'

const selectHeight = 48

export const Container = styled.View``

export const SelectContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 2px;
  border-color: ${MAIN_COLORS.lightGrey};
  border-radius: 5px;
  margin-top: ${({ hasLabel }) => (hasLabel ? 8 : 0)}px;
  margin-bottom: ${({ hasError }) => (hasError ? 8 : 0)}px;
`

export const SelectTouchable = styled.View`
  min-height: ${selectHeight}px;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  background-color: ${MAIN_COLORS.snowLight};
`

export const SelectText = styled(DefaultText)`
  margin-left: 8px;
`

export const SelectComponent = styled.View`
  flex: 1;
  overflow: hidden;
`
export const ClearButton = styled(TouchableIcon)`
  margin: 0 8px;
`
