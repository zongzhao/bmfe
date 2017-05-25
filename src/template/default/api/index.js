/**
  * request api
  */

import { Api } from '../constants/index'
// import { getRequest } from './utils'

// home request
export const getHomeList = (params) => {
  return getRequest({
    url: `${location.hostname}${Api.home}`,
    params: params
  })
}

// detail request
export const getDetailData = (params) => {
  return getRequest({
    url: `${location.hostname}${Api.detail}`,
    params: params
  })
}
