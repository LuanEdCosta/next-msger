import React, { useState } from 'react'

import Checkbox from '@/components/Checkbox'
import { CheckboxIcon } from '@/components/Fw5Icon'

import { Container, Scroll } from './styles'

const SendMessagesTab = () => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <Container>
      <Scroll>
        <Checkbox
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          checkmarkIconComponent={<CheckboxIcon name="check" />}
        />
      </Scroll>
    </Container>
  )
}

export default SendMessagesTab
