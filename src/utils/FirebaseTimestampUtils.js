import moment from 'moment'

export const firebaseTimestampToDate = (firebaseTimestamp) => {
  if (firebaseTimestamp) {
    if (firebaseTimestamp.toDate) return firebaseTimestamp.toDate()
    const momentDate = moment(firebaseTimestamp)
    if (momentDate.isValid()) return momentDate.toDate()
  }

  return null
}

export const firebaseTimestampToMoment = (firebaseTimestamp) => {
  if (firebaseTimestamp) {
    if (firebaseTimestamp.toDate) return moment(firebaseTimestamp.toDate())
    const momentDate = moment(firebaseTimestamp)
    if (momentDate.isValid()) return momentDate
  }

  return null
}
