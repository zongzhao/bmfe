/**
  * 业务介绍
  * 日期
  * 负责人
  */

import Vue from '../../lib/vue/vue2'
import store from './store/index'
import router from './router/index'

const App = new Vue({
  el: '#main',
  store,
  router,
  mounted: function () {
    this.$nextTick(function() {
      // do init
    })
  },
  created(){
  },
  methods: {
  }
})
