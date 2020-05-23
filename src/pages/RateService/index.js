import React, { useState, useCallback, useMemo } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useTranslation } from 'react-i18next'

import { Fw5Icon, Fw5IconAccent, ButtonIcon } from '@/components/Fw5Icon'
import { SERVICE_DOC, COLLECTIONS } from '@/config/database'
import { DefaultTextInput } from '@/components/TextInput'
import { WhiteSpinner } from '@/components/Spinner'
import Header from '@/components/Header'
import { useErrorAlert } from '@/hooks'
import Label from '@/components/Label'

import {
  Container,
  Scroll,
  RatingStars,
  SaveButton,
  CommentInput,
} from './styles'

const RateService = ({ navigation }) => {
  const serviceId = navigation.getParam(SERVICE_DOC.ID)
  const { t } = useTranslation('RateService')
  const showAlert = useErrorAlert()

  const [note, setNote] = useState(0)
  const [comment, setComment] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const onSaveRating = useCallback(async () => {
    setIsSaving(true)

    try {
      await firestore()
        .collection(COLLECTIONS.SERVICES)
        .doc(serviceId)
        .update({
          [SERVICE_DOC.RATING_KEY]: {
            [SERVICE_DOC.RATING.NOTE]: note,
            [SERVICE_DOC.RATING.COMMENT]: comment,
          },
        })

      setIsSaving(false)
      navigation.goBack()
    } catch (e) {
      setIsSaving(false)
      showAlert()
    }
  }, [comment, navigation, note, serviceId, showAlert])

  const isAbleToSave = useMemo(() => {
    return !!note && note > 0
  }, [note])

  return (
    <Container>
      <Header
        i18Namespace="RateService"
        i18Subtitle="pageSubtitle"
        i18Title="pageTitle"
        isStackPage
      />

      <Scroll>
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
          text={t('saveButton')}
          onPress={onSaveRating}
          disabled={!isAbleToSave || isSaving}
          backgroundColor={isAbleToSave ? 'accent' : 'secondaryText'}
          iconComponent={
            isSaving ? <WhiteSpinner /> : <ButtonIcon name="check" />
          }
        />
      </Scroll>
    </Container>
  )
}

RateService.navigationOptions = () => ({
  headerShown: false,
})

export default RateService
