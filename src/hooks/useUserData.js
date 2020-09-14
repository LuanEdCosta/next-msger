import { useSelector } from 'react-redux'

import { USER_DOC } from '@/config/database'

export default () => {
  const {
    [USER_DOC.ID]: id,
    [USER_DOC.NAME]: name,
    [USER_DOC.COMPANY_ID]: companyId,
  } = useSelector(({ User }) => User || {})

  return {
    id,
    name,
    companyId,
  }
}
