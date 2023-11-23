/* eslint-disable import/prefer-default-export */
import { get } from 'lodash-es'

type EnvType = string | undefined

const index = {
  API_URL: <EnvType>get(process.env, 'REACT_APP_API'),
  API_WS: <EnvType>get(process.env, 'REACT_APP_WS'),
  APP_ID: <EnvType>get(process.env, 'REACT_APP_FACEBOOK_APP_ID'),
}

export const { API_URL, APP_ID, API_WS } = index
