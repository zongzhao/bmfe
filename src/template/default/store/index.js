// vuex https://vuex.vuejs.org/zh-cn/
import Vue from '../../../lib/vue/vue2';
import Vuex from '../../../lib/vue/vuex';
import home from './home/index';
import detail from './detail/index';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    detail
  }
})
