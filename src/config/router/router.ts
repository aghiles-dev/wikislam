import VueRouter from 'vue-router'

export enum AppRouteName {
  HOME = 'HOME',
}

const AppRouter = new VueRouter({
  mode: 'history',
  routes: []
})

export {
  AppRouter
}
