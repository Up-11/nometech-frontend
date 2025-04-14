import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { ROUTES } from './config'
import AdminView from '@/views/AdminView.vue'
import AdminApplicationsView from '@/views/AdminApplicationsView.vue'
import AdminRatesView from '@/views/AdminRatesView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuth } from '@/composables/useAuth'

const checkAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const { initializeAuth } = useAuth()

  const result = initializeAuth()
  console.log(result)

  if (result) {
    next()
  } else {
    next({ path: ROUTES.ADMIN.LOGIN })
  }
}

const checkUnAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const { initializeAuth } = useAuth()

  const result = initializeAuth()

  if (result) {
    if (to.path === ROUTES.ADMIN.LOGIN) {
      next({ path: ROUTES.ADMIN.INDEX })
    }
  } else {
    next()
  }
}

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
      beforeEnter: checkAuth,
      children: [
        {
          path: ROUTES.ADMIN.ID.NAME,
          beforeEnter: checkAuth,
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
      beforeEnter: checkAuth,
    },
    {
      path: ROUTES.ADMIN.LOGIN,
      name: 'login',
      component: LoginView,
      beforeEnter: checkUnAuth,
    },
  ],
})

export default router
