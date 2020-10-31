export const getOnlyPhoneNumbers = (phone) => {
  if (!phone) return ''
  return phone.replace(/\(|\)|\s|\t|-/gi, '')
}
