import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import './assets/css/global.css'

import axios from 'axios'

// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:8111/shop-manage'
Vue.prototype.$https = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
