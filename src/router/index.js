import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import MessageForwarderView from '@/views/MessageForwarderView.vue'
import AuthorizedLayout from '@/layouts/AuthorizedLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      beforeEnter: [isLoggedOut],
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/',
      name: 'messageForwarder',
      beforeEnter: [isLoggedIn],
      component: MessageForwarderView,
      meta: { layout: AuthorizedLayout },
    },
    {
      path: '/tag-grouper',
      name: 'tagGrouper',
      beforeEnter: [isLoggedIn],
      component: () => import('@/views/TagGrouperView.vue'),
      meta: { layout: AuthorizedLayout },
    },
    {
      path: '/tag-forwarder',
      name: 'tagForwarder',
      beforeEnter: [isLoggedIn],
      component: () => import('@/views/TagForwarderView.vue'),
      meta: { layout: AuthorizedLayout },
    }
  ]
})

export default router


function isLoggedOut() {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    return { path: '/' }
  }
}

function isLoggedIn(to) {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated) {
    return {
      path: '/login',
      query: {
        next: to.path,
      },
    }
  }
}
