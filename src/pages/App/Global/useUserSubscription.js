import { useEffect, useCallback, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/auth'
import { useDispatchCallback } from '@/hooks'
import { setUserData, deleteUserData } from '@/store/actions'
import { USER_DOC } from '@/config/database'

export default () => {
  const [userId, setUserId] = useState(null)
  const onSetUserData = useDispatchCallback(setUserData)
  const onDeleteUserData = useDispatchCallback(deleteUserData)

  const onSubscribeToAuthChanges = useCallback(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) setUserId(user.uid)
      else {
        setUserId(null)
        onDeleteUserData()
      }
    })

    return unsubscribe
  }, [onDeleteUserData])

  const onSubscribeToUserCollection = useCallback(() => {
    const unsubscribe = firestore()
      .collection('users')
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

  useEffect(onSubscribeToAuthChanges, [])
  useEffect(onSubscribeToUserCollection, [userId])
}
