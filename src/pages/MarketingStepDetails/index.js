import React, { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import Header from '@/components/Header'
import { MARKETING_STEP_DOC, COLLECTIONS } from '@/config/database'
import { Fw5Icon, ButtonIcon } from '@/components/Fw5Icon'
import { useErrorAlert, useUserData } from '@/hooks'
import { WhiteSpinner } from '@/components/Spinner'
import { FONT_SIZES } from '@/styles'
import { ADMOB_BANNER_ID } from '@/config/ads'
import { firebaseTimestampToMoment } from '@/utils'
import { MAIN_ROUTES } from '@/config/navigation/ScreenRoutes'
import { EDIT_MARKETING_STEP_PARAMS } from '@/config/navigation/RouteParams'

import {
  Container,
  DataItem,
  DataItemTitle,
  DataItemValue,
  ActionsContainer,
  DeleteButton,
  EditButton,
  Scroll,
  Content,
} from './styles'

const MarketingStepDetails = ({ navigation }) => {
  const marketingStepId = navigation.getParam(MARKETING_STEP_DOC.ID)
  const { companyId } = useUserData()

  const { t } = useTranslation(['MarketingStepDetails', 'Glossary'])
  const showAlert = useErrorAlert()

  const [stepData, setStepData] = useState({})
  const [isDeleting, setIsDeleting] = useState(false)

  const onSubscribeToMarketingStepDocument = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.COMPANIES)
      .doc(companyId)
      .collection(COLLECTIONS.MARKETING_STEPS)
      .doc(marketingStepId)
      .onSnapshot({
        error() {
          showAlert()
          navigation.goBack()
        },
        next(doc) {
          setStepData({
            ...doc.data(),
            [MARKETING_STEP_DOC.ID]: doc.id,
          })
        },
      })

    return unsubscribe
  }, [companyId, marketingStepId, navigation, showAlert])

  useEffect(onSubscribeToMarketingStepDocument, [])

  const onDeleteMarketingStep = useCallback(async () => {
    try {
      setIsDeleting(true)

      await firestore()
        .collection(COLLECTIONS.COMPANIES)
        .doc(companyId)
        .collection(COLLECTIONS.MARKETING_STEPS)
        .doc(marketingStepId)
        .delete()

      navigation.goBack()
    } catch (e) {
      showAlert()
    } finally {
      setIsDeleting(false)
    }
  }, [companyId, marketingStepId, navigation, showAlert])

  const onConfirmToDelete = useCallback(() => {
    Alert.alert(
      t('deleteTitle'),
      t('deleteMessage'),
      [
        { text: t('Glossary:cancel') },
        { text: t('Glossary:delete'), onPress: onDeleteMarketingStep },
      ],
      { cancelable: true },
    )
  }, [onDeleteMarketingStep, t])

  const onEditMarketingStep = useCallback(() => {
    navigation.navigate(MAIN_ROUTES.EDIT_MARKETING_STEP, {
      [EDIT_MARKETING_STEP_PARAMS.MARKETING_STEP_DATA]: stepData,
    })
  }, [navigation, stepData])

  return (
    <Container>
      <Scroll>
        <BannerAd
          unitId={ADMOB_BANNER_ID}
          size={BannerAdSize.SMART_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />

        <Content>
          <DataItem>
            <DataItemTitle text={t('stepName')}>
              <Fw5Icon name="file-alt" solid />
            </DataItemTitle>
            <DataItemValue text={stepData[MARKETING_STEP_DOC.NAME]} />
          </DataItem>

          <DataItem>
            <DataItemTitle text={t('stepNumOfDays')}>
              <Fw5Icon name="calendar-day" solid />
            </DataItemTitle>
            <DataItemValue
              text={t('numOfDaysValue', {
                count: Number(stepData[MARKETING_STEP_DOC.NUMBER_OF_DAYS]),
              })}
            />
          </DataItem>

          <DataItem>
            <DataItemTitle text={t('stepEmailMsg')}>
              <Fw5Icon name="envelope" solid />
            </DataItemTitle>
            <DataItemValue text={stepData[MARKETING_STEP_DOC.EMAIL_MESSAGE]} />
          </DataItem>

          <DataItem>
            <DataItemTitle text={t('stepWhatsappMsg')}>
              <Fw5Icon name="whatsapp" solid />
            </DataItemTitle>
            <DataItemValue
              text={stepData[MARKETING_STEP_DOC.WHATSAPP_MESSAGE]}
            />
          </DataItem>

          <DataItem>
            <DataItemTitle text={t('stepCreationDate')}>
              <Fw5Icon name="calendar-plus" solid />
            </DataItemTitle>
            <DataItemValue
              text={t('createdAt', {
                date: firebaseTimestampToMoment(
                  stepData[MARKETING_STEP_DOC.CREATED_AT],
                ),
              })}
            />
          </DataItem>

          <DataItem>
            <DataItemTitle text={t('stepObservations')}>
              <Fw5Icon name="comment" solid />
            </DataItemTitle>
            <DataItemValue
              text={stepData[MARKETING_STEP_DOC.OBSERVATIONS] || '-'}
            />
          </DataItem>

          <ActionsContainer>
            <EditButton
              text={t('editButton')}
              onPress={onEditMarketingStep}
              iconComponent={<ButtonIcon name="pen" />}
            />

            <DeleteButton
              text={t('deleteButton')}
              backgroundColor="danger"
              onPress={onConfirmToDelete}
              disabled={isDeleting}
              iconComponent={
                isDeleting ? (
                  <WhiteSpinner size={FONT_SIZES.FONT_SIZE_4} />
                ) : (
                  <ButtonIcon name="trash" />
                )
              }
            />
          </ActionsContainer>
        </Content>
      </Scroll>
    </Container>
  )
}

MarketingStepDetails.navigationOptions = ({ navigation }) => {
  const subtitle = navigation.getParam(MARKETING_STEP_DOC.NAME)

  return {
    header() {
      return (
        <Header
          i18Namespace="MarketingStepDetails"
          i18Title="pageTitle"
          subtitle={subtitle}
          isStackPage
        />
      )
    },
  }
}

export default MarketingStepDetails
