import React from 'react'

import Header from '@/components/Header'

const ServiceDetailsHeader = () => {
  return {
    header() {
      return (
        <Header
          i18Namespace="ServiceDetails"
          i18Subtitle="pageSubtitle"
          i18Title="pageTitle"
          hasShadow={false}
        />
      )
    },
  }
}

export default ServiceDetailsHeader
