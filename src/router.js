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
    },
    {
      path: '/tools',
      name: 'tools-selection',
      component: () => import('./views/ToolsSelectionView.vue')
    },
    {
      path: '/tools/my-ip',
      name: 'tool-my-ip',
      component: () => import('./views/tools/WhatIsMyIpView.vue')
    },
    {
      path: '/tools/ip-calculator',
      name: 'tool-ip-calculator',
      component: () => import('./views/tools/IpCalculatorView.vue')
    },
    {
      path: '/tools/dns-lookup',
      name: 'tool-dns-lookup',
      component: () => import('./views/tools/DnsLookupView.vue')
    },
    {
      path: '/tools/port-checker',
      name: 'tool-port-checker',
      component: () => import('./views/tools/PortCheckerView.vue')
    },
    {
      path: '/tools/whois-lookup',
      name: 'tool-whois-lookup',
      component: () => import('./views/tools/WhoisLookupView.vue')
    }
  ]
})

export default router
