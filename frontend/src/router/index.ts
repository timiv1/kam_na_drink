import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

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

  // {
  //   path: '/',
  //   component: TabsPage,
  //   children: [
  //     {
  //       path: '',
  //       redirect: '/'
  //     },
  //     {
  //       path: 'profile',
  //       component: () => import('@/views/ProfilePage.vue')
  //     },
  //     {
  //       path: 'home',
  //       component: () => import('@/views/HomePage.vue')
  //     },
  //     {
  //       path: 'search',
  //       component: () => import('@/views/SearchPage.vue')
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
