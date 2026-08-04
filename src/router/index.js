import { createRouter, createWebHistory } from 'vue-router'

const APP_TITLE = 'Weather Dashboard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'WeatherHome',
      component: () => import('@/views/WeatherHomeView.vue'),
      meta: { title: '날씨 대시보드' },
    },
    {
      path: '/about',
      name: 'WeatherAbout',
      component: () => import('@/views/WeatherAboutView.vue'),
      meta: { title: '서비스 소개' },
    },
    {
      path: '/weather/:cityId',
      name: 'WeatherDetail',
      component: () => import('@/views/WeatherDetailView.vue'),
      meta: { title: '상세 기상 관측' },
    },
    {
      path: '/practices',
      name: 'Practices',
      component: () => import('@/views/PracticesView.vue'),
      meta: { title: '실습 컴포넌트' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: '페이지를 찾을 수 없음' },
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | ${APP_TITLE}` : APP_TITLE
})

export default router
