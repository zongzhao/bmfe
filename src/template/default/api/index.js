/**
  * request api
  */

import { Api } from '../constants/index'
import { getRequest } from './utils'

// select data
export const getHomeList = (params) => {
  return getRequest({
    url: `${banma.api.monitor}${Api.home}`,
    params: params
  })
}

//
export const getDetailData = (params) => {
  return getRequest({
    url: `${banma.api.monitor}${Api.detail}`,
    params: params
  })
}
