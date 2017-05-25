/**
  * 路由 https://router.vuejs.org/zh-cn/essentials/getting-started.html
  */

import Vue from '../../../lib/vue/vue2';
import VueRouter from '../../../lib/vue/vue-router';

import Home from '../components/home/index.vue'; // 业务一
import Detail from '../components/detail/index.vue'; // 业务二

const routes = [
  {
    path: '/',
    component: Home
  }, {
    path: '/detail:id',
    component: Detail
  }
]

Vue.use(VueRouter)

export default new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})
