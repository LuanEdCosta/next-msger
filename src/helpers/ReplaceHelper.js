export const getOnlyPhoneNumbers = (phone) => {
  if (!phone) return ''
  return phone.replace(/\)| |-/g, '')
}
