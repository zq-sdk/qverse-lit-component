import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {

      path: '/',
      redirect: '/base',

    },
    {

      path: '/base',
      name: 'base',
      component: () => import('@/views/BaseComponentsView.vue'),
      meta: { title: '基础组件测试' },

    },
    {

      path: '/common',
      name: 'common',
      component: () => import('@/views/CommonComponentsView.vue'),
      meta: { title: '通用组件测试' },

    },
  ],

})

export default router
