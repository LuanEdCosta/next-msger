import styled from 'styled-components/native'
import { MAIN_COLORS } from '@/styles'
import Input from '../Input'
import TouchableIcon from '../TouchableIcon'

export const Container = styled.View``

export const Bar = styled.View`
  flex-direction: row;
  align-items: center;
`

export const SearchInput = styled(Input)`
  background-color: ${MAIN_COLORS.snowLight};
  border-radius: 5px;
  flex: 1;
`

export const FilterToggler = styled(TouchableIcon).attrs({
  size: 48,
})`
  margin-left: 8px;
  justify-content: center;
  background-color: ${({ isSelected }) =>
    isSelected ? MAIN_COLORS.snow : 'white'};
`

export const FilterContent = styled.View``
