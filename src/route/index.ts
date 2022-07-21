import {
  createRouter,
  createWebHashHistory,
  RouteLocationNormalizedLoaded,
  Router,
  RouterOptions,
} from 'vue-router';
import type { IRouteRecordRaw } from 'vue-router';
import md5 from 'js-md5';

export const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: '登录',
      },
    },
    //--------------------分类目录-----练习--------------------
    {
      path: '/exercise',
      name: 'exercise',
      redirect: {
        name: 'CombineList',
      },
      component: () => import('@/views/Layout.vue'),
      children: [
        {
          path: 'combine/index',
          name: 'CombineList',
          component: () => import('@/views/exercise/combine/Index.vue'),
        },
        {
          path: 'combine/confirm',
          name: 'CombineConfirm',
          component: () => import('@/views/exercise/combine/Confirm.vue'),
          props: (route: RouteLocationNormalizedLoaded) => {
            return {
              name: md5(route.query.name as string),
            };
          },
        },
      ],
    },

    {
      component: () => import('@/views/Layout.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/home/Home.vue'),
        },
        {
          path: '/exercise/panel',
          name: 'Pannel',
          component: () => import('@/views/exercise/Panel.vue'),
        },
        {
          path: '/report/school',
          name: 'ReportSchool',
          component: () => import('@/views/report/School.vue'),
        },
        {
          path: '/mine',
          name: 'Mine',
          component: () => import('@/views/mine/Mine.vue'),
        },
        {
          path: '/paper/list',
          name: 'PaperList',
          component: () => import('@/views/paper/List.vue'),
        },
        {
          path: '/paper/info',
          name: 'PaperInfo',
          component: () => import('@/views/paper/Info.vue'),
          meta: {
            hideTab: true,
          },
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
  ] as unknown as IRouteRecordRaw[],
} as RouterOptions);
