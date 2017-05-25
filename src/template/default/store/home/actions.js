/**
  * actions
  */

import * as types from '../../constants/types'
import { getHomeList } from '../../api/index'

export default {
  // 带 async 的 action
  async [types.GET_HOME_LIST] ({ state, commit, rootState }, { params }) {
    let data = await getHomeList(params)
    // do some
    commit(types.SET_HOME_LIST, data)
  }
}
