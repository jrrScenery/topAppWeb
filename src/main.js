// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './assets/css/common.css'
import '@/assets/icon/iconfont.css'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import echarts from 'echarts'
// import localstorage from './utils/localstorage'
import commonUtil from './utils/common'


Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.use(commonUtil)

Vue.directive('loadmore', {
  bind (el, binding) {
    const selectWrap = el.querySelector('.el-table__body-wrapper')
    selectWrap.addEventListener('scroll', function () {
      let sign = 10
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= sign) {
        binding.value()
      }
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
