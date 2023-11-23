/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, useEffect, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { debugLogin } from 'services/debug/debug.service'
import Loader from './components/loader/loader'
import { authorizedRoutes, unauthorizedRotes } from './routes'
import accountStore from './store/accountStore/account.store'

const App: React.FC = (): ReactElement => {
  useEffect(() => {
    async function checkToken() {
      if (!accountStore.userToken && process.env.REACT_APP_DEBUG === 'true') {
        const debugToken = await debugLogin()
        accountStore.setUserToken(debugToken.token)
      }
    }
    checkToken()
  }, [])

  if (!accountStore.userToken) {
    return (
      <Suspense fallback={<Loader />}>
        <Switch>
          {unauthorizedRotes.map((route) => (
            <Route key={route.name} {...route} />
          ))}
        </Switch>
      </Suspense>
    )
  }

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {[...authorizedRoutes, ...unauthorizedRotes].map((route) => (
          <Route key={route.name} {...route} />
        ))}
      </Switch>
    </Suspense>
  )
}

export default observer(App)
