import {
  createRouter,
  createWebHashHistory,
  RouteLocationNormalizedLoaded,
  Router,
  RouterOptions,
} from 'vue-router';
import type { IRouteRecordRaw } from 'vue-router';
import md5 from 'js-md5';

const scrollBehavior = function scrollBehavior(to: RouteLocationNormalizedLoaded, from:RouteLocationNormalizedLoaded) {
  return { left: 0, top: 0 }
};

// 根据目录自动生成路由
//递归获取 views 文件夹下的所有.vue文件
const modulesFiles = import.meta.globEager("@/views/*.vue");
const modules = Object.keys(modulesFiles).reduce((modules: Record<string, unknown>, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/views\/(.*)\.\w+$/, '$1');
  const value = modulesFiles[modulePath];
  modules[moduleName] = value.default;
  return modules
}, {})
console.log(modules);




export const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Login',
      },
    },
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
        {
          path: 'panel',
          name: 'Pannel',
          component: () => import('@/views/exercise/Panel.vue'),
        },
      ],
    },
    //--------------------分类目录-----报告--------------------
    {
      path: '/report',
      component: () => import('@/views/Layout.vue'),
      children: [
        {
          path: 'school',
          name: 'ReportSchool',
          component: () => import('@/views/report/School.vue'),
        },
      ],
    },
    //--------------------分类目录-----试卷--------------------
    {
      path: '/paper',
      component: () => import('@/views/Layout.vue'),
      children: [
        {
          path: 'list',
          name: 'PaperList',
          component: () => import('@/views/paper/List.vue'),
        },
        {
          path: 'info',
          name: 'PaperInfo',
          component: () => import('@/views/paper/Info.vue'),
          meta: {
            hideTab: true,
          },
        },
      ],
    },
    //
    {
      path: '/home',
      component: () => import('@/views/Layout.vue'),
      redirect: {
        name: 'Home',
      },
      children: [
        {
          path: '/index',
          name: 'Home',
          component: () => import('@/views/home/Home.vue'),
        },
      ],
    },
    //--------------------分类目录-----我的信息--------------------
    {
      path: '/mine',
      component: () => import('@/views/Layout.vue'),
      redirect: {
        name: 'Mine',
      },
      children: [
        {
          path: '/mine',
          name: 'Mine',
          component: () => import('@/views/mine/Mine.vue'),
        },
      ],
    },
    // 示例
    {
      path: '/example',
      name: 'Example',
      component: () => import('@/views/example/Index.vue'),
      meta: {
        title: 'example',
      },
    },
  ] as unknown as IRouteRecordRaw[],
  // scrollBehavior(to, from, savedPosition) {
  //   scrollBehavior(to, from) // savedPosition:只有是popstate【浏览器的后退/前进按钮触发】
  // }
} as unknown as RouterOptions);
