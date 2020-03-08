import { useEffect, useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/auth'
import { useDispatchCallback } from '@/hooks'
import { setUserData, deleteUserData } from '@/store/actions'
import { USER_DOC } from '@/config/database'

export default () => {
  const onSetUserData = useDispatchCallback(setUserData)
  const onDeleteUserData = useDispatchCallback(deleteUserData)

  const { uid } = firebase.auth().currentUser || {}

  const onSubscribeToUserCollection = useCallback(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot({
        error() {
          onDeleteUserData()
        },
        next(doc) {
          onSetUserData({
            ...doc.data(),
            [USER_DOC.ID]: doc.id,
          })
        },
      })

    return unsubscribe
  }, [onDeleteUserData, onSetUserData, uid])

  useEffect(onSubscribeToUserCollection, [uid])
}
