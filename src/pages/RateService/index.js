import React, { useState, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import firestore from '@react-native-firebase/firestore'
import { BannerAd, BannerAdSize } from '@react-native-firebase/admob'

import { Fw5Icon, Fw5IconAccent, ButtonIcon } from '@/components/Fw5Icon'
import { RATE_SERVICE_PARAMS } from '@/config/navigation/RouteParams'
import { SERVICE_DOC, COLLECTIONS, SERVICE_RATING } from '@/config/database'
import { DefaultTextInput } from '@/components/TextInput'
import { WhiteSpinner } from '@/components/Spinner'
import Header from '@/components/Header'
import { useErrorAlert, useUserData } from '@/hooks'
import Label from '@/components/Label'
import { ADMOB_BANNER_ID } from '@/config/ads'

import {
  Container,
  Scroll,
  RatingStars,
  SaveButton,
  CommentInput,
  Content,
} from './styles'

const RateService = ({ navigation }) => {
  const isEditing = navigation.getParam(RATE_SERVICE_PARAMS.IS_EDITING, false)
  const currentNote = navigation.getParam(RATE_SERVICE_PARAMS.CURRENT_NOTE, 0)
  const serviceId = navigation.getParam(SERVICE_DOC.ID)
  const currentComment = navigation.getParam(
    RATE_SERVICE_PARAMS.CURRENT_COMMENT,
    '',
  )

  const { t } = useTranslation('RateService')
  const { companyId } = useUserData()
  const showAlert = useErrorAlert()

  const [note, setNote] = useState(currentNote)
  const [isSaving, setIsSaving] = useState(false)
  const [comment, setComment] = useState(currentComment)

  const onSaveRating = useCallback(async () => {
    setIsSaving(true)

    try {
      await firestore()
        .collection(COLLECTIONS.COMPANIES)
        .doc(companyId)
        .collection(COLLECTIONS.SERVICES)
        .doc(serviceId)
        .update({
          [SERVICE_DOC.RATING]: {
            [SERVICE_RATING.NOTE]: note,
            [SERVICE_RATING.COMMENT]: comment,
          },
        })

      setIsSaving(false)
      navigation.goBack()
    } catch (e) {
      setIsSaving(false)
      showAlert()
    }
  }, [comment, companyId, navigation, note, serviceId, showAlert])

  const isAbleToSave = useMemo(() => {
    return !!note && note > 0
  }, [note])

  return (
    <Container>
      <Header
        i18Title={isEditing ? 'pageTitleWhenEditing' : 'pageTitle'}
        i18Namespace="RateService"
        i18Subtitle="pageSubtitle"
        isStackPage
      />

      <Scroll>
        <BannerAd
          unitId={ADMOB_BANNER_ID}
          size={BannerAdSize.SMART_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />

        <Content>
          <Label
            label={t('noteLabel')}
            iconComponent={<Fw5IconAccent name="grin-stars" />}
            description={t('noteHint')}
            isRequired
          />

          <RatingStars
            note={note}
            setNote={setNote}
            onRenderIcon={({ isSelected }) => {
              return isSelected ? (
                <Fw5IconAccent name="star" size={40} solid />
              ) : (
                <Fw5Icon name="star" size={40} solid={false} />
              )
            }}
          />

          <CommentInput
            labelComponent={
              <Label
                label={t('commentLabel')}
                iconComponent={<Fw5IconAccent name="comment" />}
                description={t('commentMaxLength', {
                  length: comment.length,
                })}
              />
            }
            inputComponent={
              <DefaultTextInput
                style={{ textAlignVertical: 'top' }}
                placeholder={t('commentPh')}
                autoCapitalize="sentences"
                onChangeText={setComment}
                value={comment}
                maxLength={500}
                numberOfLines={5}
                multiline
                autoCorrect
              />
            }
          />

          <SaveButton
            onPress={onSaveRating}
            disabled={!isAbleToSave || isSaving}
            backgroundColor={isAbleToSave ? 'accent' : 'secondaryText'}
            text={t(isEditing ? 'saveButtonWhenEditing' : 'saveButton')}
            iconComponent={
              isSaving ? <WhiteSpinner /> : <ButtonIcon name="check" />
            }
          />
        </Content>
      </Scroll>
    </Container>
  )
}

RateService.navigationOptions = () => ({
  headerShown: false,
})

export default RateService
