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
      component: HomeView,
      meta: { title: 'Home' }
    },
    {
      path: '/tutorial',
      name: 'router-selection',
      component: RouterSelectionView,
      meta: { title: 'Router Guides' }
    },
    {
      path: '/tutorial/:brand',
      name: 'tutorial',
      component: TutorialContent,
      meta: { title: 'Tutorial' }
    },
    {
      path: '/speedtest',
      name: 'speedtest',
      component: () => import('./views/SpeedtestView.vue'),
      meta: { title: 'Speedtest' }
    },
    {
      path: '/tools',
      name: 'tools-selection',
      component: () => import('./views/ToolsSelectionView.vue'),
      meta: { title: 'Network Tools' }
    },
    {
      path: '/tools/my-ip',
      name: 'tool-my-ip',
      component: () => import('./views/tools/WhatIsMyIpView.vue'),
      meta: { title: 'What is My IP' }
    },
    {
      path: '/tools/ip-calculator',
      name: 'tool-ip-calculator',
      component: () => import('./views/tools/IpCalculatorView.vue'),
      meta: { title: 'IP Calculator' }
    },
    {
      path: '/tools/dns-lookup',
      name: 'tool-dns-lookup',
      component: () => import('./views/tools/DnsLookupView.vue'),
      meta: { title: 'DNS Lookup' }
    },
    {
      path: '/tools/port-checker',
      name: 'tool-port-checker',
      component: () => import('./views/tools/PortCheckerView.vue'),
      meta: { title: 'Port Checker' }
    },
    {
      path: '/tools/whois-lookup',
      name: 'tool-whois-lookup',
      component: () => import('./views/tools/WhoisLookupView.vue'),
      meta: { title: 'WHOIS Lookup' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const baseTitle = 'docs.ardhanfah'
  if (to.meta.title) {
    document.title = `${to.meta.title} | ${baseTitle}`
  } else {
    document.title = baseTitle
  }
  next()
})

export default router
