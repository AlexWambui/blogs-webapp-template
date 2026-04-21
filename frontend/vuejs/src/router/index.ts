import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/auth/Register.vue';
import LoginView from '../views/auth/Login.vue';
import DashboardView from '../views/Dashboard.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      meta: { requiresGuest: true }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/pages/errors/404.vue'),
    },
    {
      path: '/500',
      name: '500',
      component: () => import('@/views/pages/errors/500.vue'),
    }
  ],
});

router.beforeEach((to, from) => {
    const auth = useAuthStore();
    
    if (to.matched.some((record) => record.meta.requiresAuth) && !auth.isLoggedIn) {
        return { name: "Login" };
    }
    
    if (to.matched.some((record) => record.meta.requiresGuest) && auth.isLoggedIn) {
        return { name: "Dashboard" };
    }
    
    return true;
});

export default router;