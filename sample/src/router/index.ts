import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {

      path: '/',
      component: () => import('@/views/HomeView.vue'),
      redirect: '/base',
      children: [
        {

          path: 'base',
          name: 'base',
          component: () => import('@/views/BaseComponentsView.vue'),
          meta: { title: '基础组件 · lit-button' },
        },
        {

          path: 'common/scene/example',
          component: () => import('@/views/CommonComponentsView.vue'),
          meta: { title: '通用组件 · 3D 场景示例' },
          children: [
            {

              path: '',
              name: 'common-scene-example',
              component: () => import('@/components/common-demo/SceneExampleDemo.vue'),
              meta: { title: '示例' },
            },
          ],
        },
        {

          path: 'common/scene/switch-view',
          name: 'common-switch-view',
          component: () => import('@/components/common-demo/SwitchViewDemo.vue'),
          meta: { title: '视图切换' },
        },
        {

          path: 'common/scene/floor-switch',
          name: 'common-floor-switch',
          component: () => import('@/components/common-demo/FloorSwitchDemo.vue'),
          meta: { title: '楼层切换' },
        },
      ],
    },
    {

      path: '/common/scene',
      redirect: '/common/scene/example',
    },
    {

      path: '/common/switch-view',
      redirect: '/common/scene/switch-view',
    },
    {

      path: '/common/floor-switch',
      redirect: '/common/scene/floor-switch',
    },
    {

      path: '/common',
      redirect: '/common/scene/example',
    },
  ],

})

export default router
