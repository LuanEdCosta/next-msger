import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import Header from '@/components/Header'
import { ADMOB_BANNER_ID } from '@/config/ads'
import { COMPANY_DOC } from '@/config/database'
import { firebaseTimestampToMoment } from '@/utils'
import { ButtonIcon, Fw5Icon } from '@/components/Fw5Icon'
import { MAIN_ROUTES } from '@/config/navigation/ScreenRoutes'
import { EDIT_COMPANY_PARAMS } from '@/config/navigation/RouteParams'

import {
  Container,
  Scroll,
  Content,
  ImportantInformation,
  ImportantData,
  ImportantDataLabel,
  ImportantDataText,
  DataItem,
  DataItemTitle,
  DataItemValue,
  EditButton,
  DataGroup,
  GroupTitle,
} from './styles'

const CompanyProfile = ({ navigation }) => {
  const { t } = useTranslation(['CompanyProfile', 'Company'])

  const companyData = useSelector(({ Company }) => Company || {})
  const getValue = useCallback((key) => companyData[key], [companyData])

  const companyCreationDate = useMemo(() => {
    const date = getValue(COMPANY_DOC.CREATED_AT)
    const momentDate = firebaseTimestampToMoment(date)
    if (momentDate) return momentDate.format('LL')
    return null
  }, [getValue])

  const onEditCompany = useCallback(() => {
    navigation.navigate(MAIN_ROUTES.EDIT_COMPANY, {
      [EDIT_COMPANY_PARAMS.COMPANY_DATA]: companyData,
    })
  }, [companyData, navigation])

  return (
    <Container>
      <Header i18Namespace="NavigationDrawer" i18Title="companyProfile" />

      <Scroll>
        <BannerAd
          unitId={ADMOB_BANNER_ID}
          size={BannerAdSize.SMART_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />

        <Content>
          <DataGroup>
            <GroupTitle>{t('importantDataTitle')}</GroupTitle>

            <ImportantInformation>
              <ImportantData>
                <ImportantDataLabel>
                  {t('Company:companyName')}
                </ImportantDataLabel>
                <ImportantDataText>
                  {getValue(COMPANY_DOC.NAME)}
                </ImportantDataText>
              </ImportantData>

              <ImportantData>
                <ImportantDataLabel>
                  {t('Company:fantasyName')}
                </ImportantDataLabel>
                <ImportantDataText>
                  {getValue(COMPANY_DOC.FANTASY_NAME)}
                </ImportantDataText>
              </ImportantData>

              <ImportantData>
                <ImportantDataLabel>{t('Company:cnpj')}</ImportantDataLabel>
                <ImportantDataText>
                  {getValue(COMPANY_DOC.CNPJ)}
                </ImportantDataText>
              </ImportantData>
            </ImportantInformation>
          </DataGroup>

          <DataGroup>
            <GroupTitle>{t('ownerDataTitle')}</GroupTitle>

            <DataItem>
              <DataItemTitle text={t('Company:companyOwnerName')}>
                <Fw5Icon name="signature" solid />
              </DataItemTitle>
              <DataItemValue text={getValue(COMPANY_DOC.OWNER_NAME)} />
            </DataItem>

            <DataItem>
              <DataItemTitle text={t('Company:companyOwnerPhone')}>
                <Fw5Icon name="mobile" solid />
              </DataItemTitle>
              <DataItemValue text={getValue(COMPANY_DOC.OWNER_PHONE)} />
            </DataItem>

            <DataItem>
              <DataItemTitle text={t('Company:companyOwnerCpf')}>
                <Fw5Icon name="id-card" solid />
              </DataItemTitle>
              <DataItemValue text={getValue(COMPANY_DOC.OWNER_CPF)} />
            </DataItem>
          </DataGroup>

          <DataGroup>
            <GroupTitle>{t('otherDataTitle')}</GroupTitle>

            <DataItem>
              <DataItemTitle text={t('Company:email')}>
                <Fw5Icon name="envelope" solid />
              </DataItemTitle>
              <DataItemValue text={getValue(COMPANY_DOC.EMAIL)} />
            </DataItem>

            {!!companyCreationDate && (
              <DataItem>
                <DataItemTitle text={t('Company:creationDate')}>
                  <Fw5Icon name="calendar-alt" solid />
                </DataItemTitle>
                <DataItemValue text={companyCreationDate} />
              </DataItem>
            )}
          </DataGroup>

          <EditButton
            text={t('editButton')}
            onPress={onEditCompany}
            iconComponent={<ButtonIcon name="pen" />}
          />
        </Content>
      </Scroll>
    </Container>
  )
}

export default CompanyProfile
