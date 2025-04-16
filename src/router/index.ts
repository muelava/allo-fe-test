import { createRouter, createWebHistory } from 'vue-router'
import RocketList from '@/components/organisms/RocketList.vue'
import RocketDetail from '@/views/RocketDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'RocketList',
      component: RocketList
    },
    {
      path: '/rocket/:id',
      name: 'RocketDetail',
      component: RocketDetail,
      props: true
    }
  ]
})

export default router 