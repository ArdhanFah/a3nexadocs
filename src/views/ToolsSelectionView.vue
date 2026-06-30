<script setup>
import { ref } from 'vue'

const tools = ref([
  {
    id: 'my-ip',
    name: 'What is My IP',
    description: 'Cek IP Publik, ISP, dan Lokasi Anda saat ini.',
    icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    route: '/tools/my-ip',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'ip-calculator',
    name: 'IP Calculator',
    description: 'Hitung Subnet Mask, Network, Broadcast, dan Host Range.',
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    route: '/tools/ip-calculator',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'dns-lookup',
    name: 'DNS Lookup',
    description: 'Cek DNS record (A, CNAME, MX, TXT, dll) dari sebuah domain.',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    route: '/tools/dns-lookup',
    color: 'from-emerald-500 to-teal-400'
  },
  {
    id: 'port-checker',
    name: 'Port Checker',
    description: 'Cek apakah port tertentu terbuka pada IP publik / domain Anda.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    route: '/tools/port-checker',
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'whois-lookup',
    name: 'WHOIS Lookup',
    description: 'Cari informasi registrasi domain, kepemilikan, dan tanggal kedaluwarsa.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    route: '/tools/whois-lookup',
    color: 'from-violet-500 to-purple-500'
  }
])
</script>

<template>
  <main class="max-w-5xl mx-auto px-6 pb-12 pt-28 md:pt-36 relative z-10">
    <!-- Header Section -->
    <div class="text-center mb-16 relative">
      <div class="absolute inset-0 bg-primary-500/20 blur-[100px] rounded-full"></div>
      <h1 class="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tight drop-shadow-sm">
        Network Tools
      </h1>
      <p class="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
        Kumpulan utilitas jaringan praktis untuk membantu proses troubleshooting Anda.
      </p>
    </div>

    <!-- Tools Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <router-link
        v-for="tool in tools"
        :key="tool.id"
        :to="tool.route"
        class="group relative bg-[#13131a] rounded-3xl p-6 border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
      >
        <!-- Hover Glow Effect -->
        <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" :class="tool.color"></div>
        
        <!-- Icon Container -->
        <div class="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
          <div class="absolute inset-0 bg-gradient-to-br opacity-20" :class="tool.color"></div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tool.icon" />
          </svg>
        </div>

        <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
          {{ tool.name }}
        </h3>
        
        <p class="text-gray-400 text-sm leading-relaxed">
          {{ tool.description }}
        </p>

        <!-- Arrow indicator -->
        <div class="mt-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-white transition-colors group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </router-link>
    </div>
  </main>
</template>
