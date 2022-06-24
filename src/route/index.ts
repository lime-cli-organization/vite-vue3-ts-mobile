import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from 'vue-router';

export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/pro/Login.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/',
      name: 'Home',
      redirect: '/dashboard',
      component: () => import('@/views/pro/Home.vue'),
      children: [
        {
          
        }
      ],
    }
  ] as unknown as RouteRecordRaw[],
} )
