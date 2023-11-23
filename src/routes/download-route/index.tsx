/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect } from 'react'

const DownloadRoute = () => {
  const appStoreLink = 'https://apps.apple.com/app/htn-coach/id1624258388'
  const googlePlayLink =
    'https://play.google.com/store/apps/details?id=app.htn.ai'
  const isApple = window.navigator.userAgent.indexOf('OS') > -1
  const redirectLink = isApple ? appStoreLink : googlePlayLink

  useEffect(() => {
    window.location.assign(redirectLink)
  }, [redirectLink])

  return <></>
}

export default DownloadRoute
