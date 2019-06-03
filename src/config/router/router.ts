import VueRouter from 'vue-router'
import AppSuratesListConnected from '../../ui/main-content/surates-list/AppSuratesListConnected'
import AppSurateConnected from '../../ui/main-content/surate/AppSurateConnected'
import { AppRouteName } from './AppRouteNames'

const AppRouter = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/surates',
      name: AppRouteName.SURATES,
      component: AppSuratesListConnected
    },
    {
      path: '/surates/:surateId',
      name: AppRouteName.SURATE_DETAILS,
      component: AppSurateConnected
    },
    {
      path: '*',
      redirect: {
        name: AppRouteName.SURATES
      }
    }
  ]
})

export {
  AppRouter
}
