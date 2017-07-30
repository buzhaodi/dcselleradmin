// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
// 登陆页
import Login from './components/Login/Login.vue'
// 首页组件
import Home from './components/Hello.vue'
// 商家设置页组件
import Sellersetting from './components/Sellersetting/Sellersetting'
// 商家分类页面
import Typecontroller from './components/Sellersetting/Typecontroller/Typecontroller.vue'
import vuexI18n from 'vuex-i18n'
import Vuex from 'vuex'
// plugins
import {
  AjaxPlugin,
  AlertPlugin,
  BusPlugin,
  ConfirmPlugin,
  DatetimePlugin,
  DevicePlugin,
  LoadingPlugin,
  LocalePlugin,
  ToastPlugin,
  WechatPlugin
} from 'vux'

Vue.use(Vuex)
Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Home
},
{
  path: '/sellerseting',
  component: Sellersetting
},
{
  path: '/login',
  component: Login
},
{
  path: '/sellerseting/Typecontroller',
  component: Typecontroller
}]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

let store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
})

store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
})
Vue.use(AjaxPlugin)
AjaxPlugin.$http.defaults.withCredentials = true

Vue.use(vuexI18n.plugin, store)

Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(LocalePlugin)
Vue.use(DatetimePlugin)
Vue.use(BusPlugin)
// 定义跟网站常量
Vue.prototype.SERVERDOMIAN = 'http://127.0.0.1:999'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
