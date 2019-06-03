import VueRouter from 'vue-router'
import AppSuratesListConnected from '../../ui/main-content/surates-list/AppSuratesListConnected'
import AppSurateConnected from '../../ui/main-content/surate/AppSurateConnected'

export enum AppRouteName {
  SURATES = 'SURATES',
  SURATE_DETAILS = 'SURATE_DETAILS',
}

const AppRouter = new VueRouter({
  mode: 'history',
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
