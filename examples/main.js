import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

//导入组件库
// import rcui from '../packages/index.js'
import rcui from '../lib/rcui.common.js'

//注册组件库
Vue.use(rcui)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
