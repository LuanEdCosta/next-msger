import admob, { MaxAdContentRating } from '@react-native-firebase/admob'

export const configAdmob = async () => {
  try {
    await admob().setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.PG,
      tagForChildDirectedTreatment: true,
      tagForUnderAgeOfConsent: true,
    })
  } catch (e) {
    // Do Nothing
  }
}
