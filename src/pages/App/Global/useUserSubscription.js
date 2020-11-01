import { useEffect, useCallback, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/auth'
import crashlytics from '@react-native-firebase/crashlytics'

import { useDispatchCallback, useUserData } from '@/hooks'
import { COLLECTIONS, USER_DOC } from '@/config/database'
import {
  setUserData,
  deleteUserData,
  setCompanyData,
  deleteCompanyData,
} from '@/store/actions'

export default () => {
  const onSetUserData = useDispatchCallback(setUserData)
  const onDeleteUserData = useDispatchCallback(deleteUserData)

  const onSetCompanyData = useDispatchCallback(setCompanyData)
  const onDeleteCompanyData = useDispatchCallback(deleteCompanyData)

  const [userId, setUserId] = useState(null)
  const { companyId } = useUserData()

  const onSetCrashlyticsAttributes = useCallback(async (user) => {
    crashlytics().log('-- User Signed in --')
    const { username, email } = user
    await Promise.all([
      crashlytics().setUserId(user.uid),
      crashlytics().setAttributes({
        username,
        email,
      }),
    ])
  }, [])

  const onSubscribeToAuthChanges = useCallback(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid)
        onSetCrashlyticsAttributes(user)
      } else {
        setUserId(null)
        onDeleteUserData()
        onDeleteCompanyData()
      }
    })

    return unsubscribe
  }, [onDeleteCompanyData, onDeleteUserData, onSetCrashlyticsAttributes])

  const onSubscribeToUserCollection = useCallback(() => {
    if (!userId) return undefined

    const unsubscribe = firestore()
      .collection(COLLECTIONS.USERS)
      .doc(userId)
      .onSnapshot({
        next(doc) {
          if (!doc.exists) return
          onSetUserData({
            ...doc.data(),
            [USER_DOC.ID]: doc.id,
          })
        },
      })

    return unsubscribe
  }, [onSetUserData, userId])

  const onSubscribeToCompanyCollection = useCallback(() => {
    if (!companyId) return undefined

    const unsubscribe = firestore()
      .collection(COLLECTIONS.COMPANIES)
      .doc(companyId)
      .onSnapshot({
        next(doc) {
          if (!doc.exists) return
          onSetCompanyData({
            ...doc.data(),
            [USER_DOC.ID]: doc.id,
          })
        },
      })

    return unsubscribe
  }, [companyId, onSetCompanyData])

  useEffect(onSubscribeToAuthChanges, [])
  useEffect(onSubscribeToUserCollection, [userId])
  useEffect(onSubscribeToCompanyCollection, [companyId])
}
