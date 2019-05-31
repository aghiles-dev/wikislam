// import './styles/main.scss'
import { reduxStorePlugin } from 'redux-vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import { AppStore } from './config/store/appStore'
import { AppRouter } from './config/router/router'
import App from './ui/app.vue'

Vue.use(VueRouter)
Vue.use(reduxStorePlugin)

new Vue({
  el: '#app',
  store: AppStore,
  router: AppRouter,
  template: `<app/>`,
  components: { App }
})
