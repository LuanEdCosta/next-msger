import { useEffect, useCallback, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/auth'
import crashlytics from '@react-native-firebase/crashlytics'

import { useDispatchCallback } from '@/hooks'
import { setUserData, deleteUserData } from '@/store/actions'
import { COLLECTIONS, USER_DOC } from '@/config/database'

export default () => {
  const [userId, setUserId] = useState(null)
  const onSetUserData = useDispatchCallback(setUserData)
  const onDeleteUserData = useDispatchCallback(deleteUserData)

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
      }
    })

    return unsubscribe
  }, [onDeleteUserData, onSetCrashlyticsAttributes])

  const onSubscribeToUserCollection = useCallback(() => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.USERS)
      .doc(userId)
      .onSnapshot({
        next(doc) {
          if (!doc.exists) return
          const userData = {
            ...doc.data(),
            [USER_DOC.ID]: doc.id,
          }
          onSetUserData(userData)
        },
      })

    return unsubscribe
  }, [onSetUserData, userId])

  useEffect(onSubscribeToAuthChanges, [])
  useEffect(onSubscribeToUserCollection, [userId])
}
