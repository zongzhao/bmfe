/**
  * 业务 mutations
  * date
  */

import * as types from '../../constants/types'

export default {
  // 注释
  [types.SET_HOME_LIST] (state, data) {
    state.data = data
  }
}
