import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'

import Header from '@/components/Header'
import { MARKETING_STEP_DOC, COLLECTIONS } from '@/config/database'
import { Fw5Icon, ButtonIcon } from '@/components/Fw5Icon'
import { useErrorAlert } from '@/hooks'
import { WhiteSpinner } from '@/components/Spinner'
import { FONT_SIZES } from '@/styles'

import {
  Container,
  DataItem,
  DataItemTitle,
  DataItemValue,
  DeleteButton,
  Scroll,
} from './styles'

const MarketingStepDetails = ({ navigation }) => {
  const marketingStepId = navigation.getParam(MARKETING_STEP_DOC.ID)

  const { t } = useTranslation('MarketingStepDetails')
  const showAlert = useErrorAlert()

  const [stepData, setStepData] = useState({})
  const [isDeleting, setIsDeleting] = useState(false)

  const onSubscribeToMarketingStepDocument = useCallback(() => {
    const unsubscribe = firestore()
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
  }, [marketingStepId, navigation, showAlert])

  useEffect(onSubscribeToMarketingStepDocument, [])

  const onDeleteMarketingStep = useCallback(async () => {
    setIsDeleting(true)
    try {
      await firestore()
        .collection(COLLECTIONS.MARKETING_STEPS)
        .doc(marketingStepId)
        .delete()

      navigation.goBack()
    } catch (e) {
      showAlert()
    }
    setIsDeleting(false)
  }, [marketingStepId, navigation, showAlert])

  return (
    <Container>
      <Scroll>
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
          <DataItemValue text={stepData[MARKETING_STEP_DOC.WHATSAPP_MESSAGE]} />
        </DataItem>

        <DataItem>
          <DataItemTitle text={t('stepCreationDate')}>
            <Fw5Icon name="calendar-plus" solid />
          </DataItemTitle>
          <DataItemValue
            text={t('createdAt', {
              date: moment(stepData[MARKETING_STEP_DOC.CREATED_AT]),
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

        <DeleteButton
          text={t('deleteButton')}
          backgroundColor="danger"
          onPress={onDeleteMarketingStep}
          disabled={isDeleting}
          iconComponent={
            isDeleting ? (
              <WhiteSpinner size={FONT_SIZES.FONT_SIZE_4} />
            ) : (
              <ButtonIcon name="trash" />
            )
          }
        />
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
