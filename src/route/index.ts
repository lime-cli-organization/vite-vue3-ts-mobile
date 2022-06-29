import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Switch',
      component: () => import('@/views/Switch.vue'),
    },
    {
      path: '/pro',
      component: () => import('@/views/pro/Layout.vue'),
      redirect: '/pro/home',
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/pro/Login.vue'),
          meta: {
            title: '登录',
          },
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
              path: '/pro/exercise/panel',
              name: 'Pannel',
              component: () => import('@/views/pro/exercise/Panel.vue'),
            },
            {
              path: '/pro/report/school',
              name: 'ReportSchool',
              component: () => import('@/views/pro/report/School.vue'),
            },
            {
              path: '/pro/mine',
              name: 'Mine',
              component: () => import('@/views/pro/mine/Mine.vue'),
            },
            {
              path: '/pro/paper/list',
              name: 'PaperList',
              component: () => import('@/views/pro/paper/List.vue'),
            },
            {
              path: '/pro/exercise/combine/index',
              name: 'CombineList',
              component: () => import('@/views/pro/exercise/combine/Index.vue'),
            },
            {
              path: '/pro/paper/info',
              name: 'PaperInfo',
              component: () => import('@/views/pro/paper/Info.vue'),
              meta: {
                hideTab: true,
              },
            },
          ],
        },
      ],
    },
    {
      path: '/example',
      name: 'Example',
      component: () => import('@/views/example/Index.vue'),
      meta: {
        title: 'example',
      },
    },
  ] as unknown as RouteRecordRaw[],
} as RouterOptions);
