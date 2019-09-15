import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from 'vant'
import 'vant/lib/index.less'
import 'amfe-flexible'

import '@/styles/index.less'

Vue.use(vant)

// 跳转user相关时页面时，需要进行登录
router.beforeEach((to, from, next) => {
  const login = { path: '/login', query: { redirect: to.path } }
  if (to.path.startsWith('/user') && !store.state.user.token) return next(login)
  next()
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
