import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import store from '../store/index'
const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/'
  // },
  {
    path: '/',
    component: () => import('@/views/SwiperPage.vue')
  },
  {
    path: '/profile',
    component: () => import('@/views/ProfilePage.vue')
  },
  {
    path: '/bar/:id',
    component: () => import('@/views/BarPage.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/signup',
    component: () => import('@/views/SignUpPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  if (to.path == '/login' || to.path == '/signup') {
    return true
  }
  else {
    const isAuthenticated = store.getters['auth/isAuthenticated']
    console.log(`Ali je ali ni? ${isAuthenticated}`)
    if (isAuthenticated)
      return true
    else return { path: '/login' }
  }

})

export default router
