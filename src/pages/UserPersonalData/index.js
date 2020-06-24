import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import auth from '@react-native-firebase/auth'

import Header from '@/components/Header'
import DetailItem from '@/components/DetailItem'
import { USER_DOC } from '@/config/database'
import { Fw5IconPrimary, Fw5Icon } from '@/components/Fw5Icon'

import { Container, Scroll } from './styles'

const UserPersonalData = () => {
  const { t } = useTranslation('UserPersonalData')

  const { [USER_DOC.NAME]: userName } = useSelector(({ User }) => User || {})
  const currentUser = useMemo(() => auth().currentUser, [])

  return (
    <Container>
      <Header
        i18Namespace="UserPersonalData"
        i18Title="pageTitle"
        isStackPage
      />

      <Scroll>
        <DetailItem
          onPress={() => {}}
          title={t('userName')}
          text={userName}
          rightIconComponent={<Fw5Icon name="chevron-right" />}
          titleIconComponent={<Fw5IconPrimary name="signature" />}
        />

        <DetailItem
          onPress={() => {}}
          title={t('userEmail')}
          text={currentUser.email}
          rightIconComponent={<Fw5Icon name="chevron-right" />}
          titleIconComponent={<Fw5IconPrimary name="envelope" solid />}
        />
      </Scroll>
    </Container>
  )
}

UserPersonalData.navigationOptions = () => ({
  headerShown: false,
})

export default UserPersonalData
