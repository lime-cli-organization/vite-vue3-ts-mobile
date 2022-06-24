import { createRouter, createWebHashHistory, RouterOptions } from "vue-router";
import type { RouteRecordRaw } from 'vue-router';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name:'Switch',
      component: () => import('@/views/Switch.vue')
    },
    {
      path: '/pro',
      component: () => import('@/views/pro/Layout.vue'),
      redirect: '/pro/index',
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/pro/Login.vue'),
          meta: {
            title: '登录'
          }
        },
        {
          path: 'index',
          name: 'Index',
          component: () => import('@/views/pro/Index.vue'),
          children: [
            {
              path: '/pro/home',
              name: 'Home',
              component: () => import('@/views/pro/home/Home.vue'),
            },
            {
              path: '/pro/mine',
              name: 'Mine',
              component: () => import('@/views/pro/mine/Mine.vue'),
            }
          ],
        }
      ],
    },
    {
      path: '/example',
      name: 'Example',
      component: () => import('@/views/example/Index.vue'),
      meta: {
        title: 'example'
      }
    }
    
  ] as unknown as RouteRecordRaw[],
} as RouterOptions)
