import React, { useState, useCallback, useContext } from 'react'
import { Alert, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { withNavigation } from 'react-navigation'

import Header from '@/components/Header'
import { Fw5IconPrimary, Fw5Icon } from '@/components/Fw5Icon'
import TouchableIcon from '@/components/TouchableIcon'
import {
  BottomSheet,
  BottomSheetItem,
  BottomSheetTitle,
} from '@/components/BottomSheet'

import ServiceDetailsContext from '../ServiceDetailsContext'
import useDeleteService from '../useDeleteService'
import useSetFinalized from '../useSetFinalized'

const ServiceDetailsHeader = ({ navigation }) => {
  const { t } = useTranslation(['ServiceDetails', 'Glossary'])
  const [isOpen, setIsOpen] = useState(false)

  const { serviceData, isFinalized } = useContext(ServiceDetailsContext)
  const onDelete = useDeleteService()
  const onSetFinalized = useSetFinalized()

  const onOpenBottomSheet = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onCloseBottomSheet = useCallback(() => {
    setIsOpen(false)
  }, [])

  const onFinalizeService = useCallback(async () => {
    if (isFinalized) {
      await onSetFinalized(serviceData, false)
      onCloseBottomSheet()
    } else {
      Alert.alert(
        t('finalizeTitle'),
        t('finalizeMessage'),
        [
          { text: t('Glossary:cancel') },
          {
            text: t('Glossary:finalize'),
            async onPress() {
              await onSetFinalized(serviceData, true)
              onCloseBottomSheet()
            },
          },
        ],
        { cancelable: true },
      )
    }
  }, [isFinalized, onCloseBottomSheet, onSetFinalized, serviceData, t])

  const onDeleteService = useCallback(() => {
    Alert.alert(
      t('deleteTitle'),
      t('deleteMessage'),
      [
        { text: t('Glossary:cancel') },
        {
          text: t('Glossary:delete'),
          async onPress() {
            onCloseBottomSheet()
            await onDelete(serviceData)
            navigation.goBack()
          },
        },
      ],
      { cancelable: true },
    )
  }, [navigation, onCloseBottomSheet, onDelete, serviceData, t])

  return (
    <>
      <BottomSheet isShowing={isOpen} onClose={onCloseBottomSheet} height={168}>
        <BottomSheetTitle text={t('actionBottomSheetTitle')} />

        <ScrollView>
          <BottomSheetItem
            text={t(
              isFinalized ? 'setAsNotFinalizedAction' : 'finalizeServiceAction',
            )}
            onPress={onFinalizeService}
          >
            <Fw5Icon
              name={isFinalized ? 'play' : 'flag-checkered'}
              size={20}
              solid
            />
          </BottomSheetItem>

          <BottomSheetItem
            text={t('deleteServiceAction')}
            onPress={onDeleteService}
          >
            <Fw5Icon name="trash" size={20} />
          </BottomSheetItem>
        </ScrollView>
      </BottomSheet>

      <Header
        i18Namespace="ServiceDetails"
        i18Subtitle="pageSubtitle"
        i18Title="pageTitle"
        hasShadow={false}
        isStackPage
      >
        <TouchableIcon onPress={onOpenBottomSheet}>
          <Fw5IconPrimary name="ellipsis-v" />
        </TouchableIcon>
      </Header>
    </>
  )
}

export default withNavigation(ServiceDetailsHeader)
