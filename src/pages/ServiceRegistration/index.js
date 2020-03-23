import React, { useState } from 'react'
import Select from '@/components/Select'
import Header from '@/components/Header'
import { Container, Scroll } from './styles'

const ServiceRegistration = () => {
  const [value, setValue] = useState(null)

  return (
    <Container>
      <Header i18Namespace="NavigationDrawer" i18Title="serviceRegistration" />
      <Scroll>
        {/* TESTING THE SELECT COMPONENT */}
        <Select
          placeholder="Toque para Selecionar"
          value={value}
          setValue={setValue}
          initialValue={null}
          onSelect={() => {
            setValue('12/04/2000')
          }}
        />
      </Scroll>
    </Container>
  )
}

export default ServiceRegistration
