import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { ROUTES } from './config'
import AdminView from '@/views/AdminView.vue'
import AdminApplicationsView from '@/views/AdminApplicationsView.vue'
import AdminRatesView from '@/views/AdminRatesView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: ROUTES.INDEX,
      name: 'home',
      component: HomeView,
    },
    {
      path: ROUTES.ADMIN.INDEX,
      name: 'admin',
      component: AdminView,
      children: [
        {
          path: ROUTES.ADMIN.ID.NAME,
          components: {
            content: AdminRatesView,
          },
        },
      ],
    },
    {
      path: ROUTES.ADMIN.APPLICATIONS,
      name: 'applications',
      component: AdminApplicationsView,
    },
    {
      path: ROUTES.ADMIN.LOGIN,
      name: 'login',
      component: LoginView,
    },
  ],
})

export default router
