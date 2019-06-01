import VueRouter from 'vue-router'
import AppSuratesListConnected from '../../ui/main-content/surates-list/AppSuratesListConnected'

export enum AppRouteName {
  SURATES = 'SURATES',
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
