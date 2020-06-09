import styled from 'styled-components/native'

const CheckMarkSize = 28

export const Container = styled.View`
  overflow: hidden;
`

export const CheckMark = styled.View`
  align-items: center;
  justify-content: center;
  width: ${CheckMarkSize}px;
  height: ${CheckMarkSize}px;

  border-radius: ${({ hasRoundCorners }) => (hasRoundCorners ? 1000 : 5)}px;

  background-color: ${({
    checkmarkCheckedColor,
    checkmarkUncheckedColor,
    isChecked,
  }) => (isChecked ? checkmarkCheckedColor : checkmarkUncheckedColor)};
`

export const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`
