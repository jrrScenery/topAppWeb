// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './assets/css/common.css'
import '@/assets/icon/iconfont.css'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import axios from 'axios'
import echarts from 'echarts'
// import localstorage from './utils/localstorage'
import commonUtil from './utils/common'
import toastRegistry from './utils/toast/toast'
import VueTouch from 'vue-touch'
import wx from 'weixin-js-sdk'


Vue.use(VueTouch, {
  name: 'v-touch'
})
// VueTouch.config.swipe = {
//   threshold: 30
// }
Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.withCredentials = false
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.prototype.$wx = wx
Vue.use(commonUtil)
Vue.use(toastRegistry)

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

// wx.config({
//   debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//   appId: 'wxa8405bb1ac18d4b5', // 必填，公众号的唯一标识
//   timestamp: , // 必填，生成签名的时间戳
//   nonceStr: '', // 必填，生成签名的随机串
//   signature: '',// 必填，签名，见附录1
//   // 必填，需要使用的JS接口列表，所有JS接口列表见官方js接口
//   // 这里配置获取地理位置所需要的接口权限
//   jsApiList: [
//     'openLocation',
//     'getLocation'
//   ]
// });

wx.ready(function(){

  // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});

wx.error(function(res){

  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

});

Vue.prototype.sendCall = function (phoneNum) {
  let ua = navigator.userAgent.toLowerCase()
  if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
    // var info = {action: 'sendCall', phonenum: phoneNum}
    // window.webkit.messageHandlers.ioshandle.postMessage({body: info})
    var info = {
      action: 'sendCall',
      phonenum: phoneNum
    }
    window.webkit.messageHandlers.ioshandle.postMessage({
      body: info
    })
  } else if (/(Android)/i.test(ua)) {
    console.log('this is android')
    return true
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})