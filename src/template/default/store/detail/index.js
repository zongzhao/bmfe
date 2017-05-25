/**
  * 业务
  */

import * as types from '../../constants/types'
import { getDetailData } from '../../api/index'

const state = {
  data: []
}

const mutations = {
  // 注释
  [types.SET_DETAIL_DATA] (state, data) {
    state.data = data
  }
}

const actions = {
  // 注释
  [types.GET_DETAIL_DATA] ({ state, commit }) {
    getDetailData.then(data => {
      commit(types.SET_DETAIL_DATA, data)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
