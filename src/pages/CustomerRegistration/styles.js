import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'

import Input from '@/components/Input'

const Styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingBottom: 24,
  },
})

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`
export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: Styles.scroll,
})``

export const CustomerInput = styled(Input)`
  margin-bottom: 16px;
`
