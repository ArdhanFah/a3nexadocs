import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import RouterSelectionView from './views/RouterSelectionView.vue'
import TutorialContent from './components/TutorialContent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tutorial',
      name: 'router-selection',
      component: RouterSelectionView
    },
    {
      path: '/tutorial/:brand',
      name: 'tutorial',
      component: TutorialContent
    },
    {
      path: '/speedtest',
      name: 'speedtest',
      component: () => import('./views/SpeedtestView.vue')
    }
  ]
})

export default router
