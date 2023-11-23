import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

import './index.css'

import App from './App'

Sentry.init({
  dsn: 'https://f3a2ae5fbd1744078221222a4c645c14@o582502.ingest.sentry.io/6714452',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
