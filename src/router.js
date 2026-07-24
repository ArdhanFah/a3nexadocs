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
      meta: { 
        title: 'Home',
        description: 'docs.ardhanfah adalah portal dokumentasi terpadu untuk panduan konfigurasi WiFi router dan berbagai perkakas utilitas jaringan secara gratis.',
        keywords: 'home docs.ardhanfah, panduan router, tools jaringan, speedtest, whois, dns lookup, ip checker'
      }
    },
    {
      path: '/tutorial',
      name: 'router-selection',
      component: RouterSelectionView,
      meta: { 
        title: 'Pilih Merek Router',
        description: 'Pilih merek router Anda (TP-Link, ZTE, Huawei, Tenda, Totolink, Fiberhome) untuk memulai panduan konfigurasi WiFi, login admin, dan keamanan.',
        keywords: 'merek router, tp-link, zte, huawei, tenda, totolink, fiberhome, setting wifi, config admin'
      }
    },
    {
      path: '/tutorial/:brand',
      name: 'tutorial',
      component: TutorialContent,
      meta: { 
        title: 'Tutorial Router',
        description: 'Panduan langkah demi langkah untuk melakukan setting dan konfigurasi pada router Anda.',
        keywords: 'tutorial router, setting router, login admin, ganti password wifi'
      }
    },
    {
      path: '/speedtest',
      name: 'speedtest',
      component: () => import('./views/SpeedtestView.vue'),
      meta: { 
        title: 'Speedtest Jaringan',
        description: 'Uji kecepatan internet Anda secara real-time. Cek kecepatan download, upload, ping, dan jitter dengan akurat.',
        keywords: 'speedtest, cek kecepatan internet, tes koneksi wifi, bandwidth meter, ping test'
      }
    },
    {
      path: '/tools',
      name: 'tools-selection',
      component: () => import('./views/ToolsSelectionView.vue'),
      meta: { 
        title: 'Perkakas Jaringan',
        description: 'Kumpulan alat utilitas jaringan gratis seperti What is My IP, IP Subnetting Calculator, DNS Lookup, Port Checker, dan WHOIS Lookup.',
        keywords: 'network tools, perkakas jaringan, lookup dns, ip calculator, scan port, whois'
      }
    },
    {
      path: '/tools/my-ip',
      name: 'tool-my-ip',
      component: () => import('./views/tools/WhatIsMyIpView.vue'),
      meta: { 
        title: 'Cek IP Saya (What is My IP)',
        description: 'Ketahui alamat IP publik Anda saat ini (IPv4/IPv6), lokasi geografis, informasi ISP, dan status proxy/VPN Anda.',
        keywords: 'what is my ip, cek ip publik, alamat ip saya, isp lookup, ip address'
      }
    },
    {
      path: '/tools/ip-calculator',
      name: 'tool-ip-calculator',
      component: () => import('./views/tools/IpCalculatorView.vue'),
      meta: { 
        title: 'Kalkulator IP Subnetting',
        description: 'Kalkulator subnetting IP kelas A, B, dan C. Hitung CIDR, mask, jumlah host, range network address dengan mudah.',
        keywords: 'ip calculator, kalkulator subnetting, cidr calculator, network range, ip address'
      }
    },
    {
      path: '/tools/dns-lookup',
      name: 'tool-dns-lookup',
      component: () => import('./views/tools/DnsLookupView.vue'),
      meta: { 
        title: 'DNS Lookup Tool',
        description: 'Lakukan query rekaman DNS (A, AAAA, MX, TXT, NS, CNAME) dari sebuah domain atau hostname dengan cepat.',
        keywords: 'dns lookup, check records dns, mx record checker, txt lookup, a record lookup'
      }
    },
    {
      path: '/tools/port-checker',
      name: 'tool-port-checker',
      component: () => import('./views/tools/PortCheckerView.vue'),
      meta: { 
        title: 'Open Port Checker',
        description: 'Periksa status port pada alamat IP atau domain untuk mendeteksi apakah suatu port terbuka (open) atau tertutup (closed).',
        keywords: 'port checker, scan port open, check port status, firewall test'
      }
    },
    {
      path: '/tools/whois-lookup',
      name: 'tool-whois-lookup',
      component: () => import('./views/tools/WhoisLookupView.vue'),
      meta: { 
        title: 'WHOIS Lookup Tool',
        description: 'Cari informasi kepemilikan domain, data pendaftar (registrar), tanggal kadaluarsa, name server (NS) melalui database WHOIS.',
        keywords: 'whois lookup, cek pemilik domain, expiry date domain, registrar info'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const baseTitle = 'docs.ardhanfah'
  const defaultDesc = 'Dokumentasi lengkap panduan konfigurasi berbagai merek router dan perkakas utilitas jaringan.'
  const defaultKeywords = 'panduan router, setting wifi, config router, speedtest, ip checker, dns lookup'
  
  // Elements
  const descriptionEl = document.getElementById('meta-description')
  const ogDescEl = document.getElementById('og-description')
  const twitterDescEl = document.getElementById('twitter-description')
  const ogTitleEl = document.getElementById('og-title')
  const twitterTitleEl = document.getElementById('twitter-title')
  const keywordsEl = document.getElementById('meta-keywords')
  const canonicalEl = document.getElementById('canonical-link')

  // Check dynamic route for tutorial brand
  if (to.name === 'tutorial' && to.params.brand) {
    const brandRaw = to.params.brand
    const brandName = brandRaw.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    const dynamicTitle = `Panduan Setting Router ${brandName}`
    const dynamicDesc = `Tutorial langkah demi langkah cara setting, login admin, konfigurasi PPPoE, ganti sandi WiFi router ${brandName} secara lengkap.`
    const dynamicKeywords = `setting ${brandRaw}, cara login ${brandRaw}, config ${brandRaw}, ganti password wifi ${brandRaw}, ip router ${brandRaw}`

    document.title = `${dynamicTitle} | ${baseTitle}`

    if (descriptionEl) descriptionEl.setAttribute('content', dynamicDesc)
    if (ogDescEl) ogDescEl.setAttribute('content', dynamicDesc)
    if (twitterDescEl) twitterDescEl.setAttribute('content', dynamicDesc)

    if (ogTitleEl) ogTitleEl.setAttribute('content', `${dynamicTitle} | ${baseTitle}`)
    if (twitterTitleEl) twitterTitleEl.setAttribute('content', `${dynamicTitle} | ${baseTitle}`)

    if (keywordsEl) keywordsEl.setAttribute('content', dynamicKeywords)
  } else {
    // Normal Static Route
    if (to.meta.title) {
      document.title = `${to.meta.title} | ${baseTitle}`
    } else {
      document.title = baseTitle
    }

    const desc = to.meta.description || defaultDesc
    if (descriptionEl) descriptionEl.setAttribute('content', desc)
    if (ogDescEl) ogDescEl.setAttribute('content', desc)
    if (twitterDescEl) twitterDescEl.setAttribute('content', desc)

    const finalTitle = to.meta.title ? `${to.meta.title} | ${baseTitle}` : baseTitle
    if (ogTitleEl) ogTitleEl.setAttribute('content', finalTitle)
    if (twitterTitleEl) twitterTitleEl.setAttribute('content', finalTitle)

    const keywords = to.meta.keywords || defaultKeywords
    if (keywordsEl) keywordsEl.setAttribute('content', keywords)
  }

  // Canonical link update
  if (canonicalEl) {
    canonicalEl.setAttribute('href', window.location.origin + to.path)
  }

  next()
})

export default router
