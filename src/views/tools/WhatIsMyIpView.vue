<script setup>
import { ref, onMounted } from 'vue'

const ipData = ref(null)
const isLoading = ref(true)
const error = ref(null)

const fetchIpData = async () => {
  isLoading.value = true
  error.value = null
  try {
    // Using ipinfo.io as fallback since it's more reliable for frontend fetches without hitting CORS/rate limits as easily
    const response = await fetch('https://ipinfo.io/json')
    if (!response.ok) throw new Error('Network response was not ok')
    const data = await response.json()
    if (data.error) throw new Error(data.error.message || 'Failed to fetch IP details')
    
    // Map ipinfo data to our expected structure
    ipData.value = {
      ip: data.ip,
      org: data.org,
      city: data.city,
      region: data.region,
      country_name: data.country,
      timezone: data.timezone,
      asn: data.org ? data.org.split(' ')[0] : 'N/A' // AS number is usually the first word in org
    }
  } catch (err) {
    error.value = err.message || 'Gagal memuat informasi IP. Pastikan Anda terhubung ke internet.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchIpData()
})
</script>

<template>
  <main class="max-w-4xl mx-auto px-6 pb-12 pt-28 md:pt-36 relative z-10">
    <div class="text-center mb-8 relative z-10">
      <h1 class="text-3xl md:text-5xl font-extrabold mb-4 text-white">What is My IP</h1>
      <p class="text-gray-400 text-lg">Informasi IP Publik, ISP, dan Lokasi Anda.</p>
    </div>

    <!-- Diagnostic Window -->
    <div class="relative bg-[#0f0f13]/80 border border-white/[0.08] backdrop-blur-xl rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden w-full">
      <!-- Top Window Bar -->
      <div class="flex justify-between items-center px-6 py-4 border-b border-white/[0.05] bg-white/[0.02]">
        <div class="flex gap-2 group cursor-pointer" @click="$router.push('/tools')" title="Kembali ke Tools">
          <div class="w-3 h-3 rounded-full bg-[#ff5f56] group-hover:bg-red-400 flex items-center justify-center transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2 text-red-900 opacity-0 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" /></svg>
          </div>
          <div class="w-3 h-3 rounded-full bg-[#ffbd2e] group-hover:bg-yellow-400 transition-colors"></div>
          <div class="w-3 h-3 rounded-full bg-[#27c93f] group-hover:bg-green-400 transition-colors"></div>
        </div>
        
        <div class="text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase hidden md:block">IP Identifier</div>

        <div class="flex items-center space-x-2 text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <div class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span>
          </div>
          <span>Live Detect</span>
        </div>
      </div>

      <!-- Content Area with Dotted Pattern -->
      <div class="relative p-6 md:p-12 z-10 flex flex-col items-center min-h-[400px] justify-center" style="background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1.5px, transparent 1.5px); background-size: 32px 32px;">
        
        <!-- Loading State -->
        <div v-if="isLoading" class="flex flex-col items-center justify-center text-center">
          <div class="relative w-24 h-24 mb-6">
            <div class="absolute inset-0 rounded-full border-4 border-white/[0.05]"></div>
            <div class="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
          </div>
          <p class="text-gray-400 animate-pulse text-lg tracking-wide font-medium">Menganalisis Koneksi...</p>
        </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center text-red-400 max-w-lg mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>{{ error }}</p>
        <button @click="fetchIpData" class="mt-4 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-white rounded-full transition-colors">Coba Lagi</button>
      </div>

      <!-- Result State -->
      <div v-else-if="ipData" class="max-w-2xl mx-auto w-full relative z-10">
        <!-- Main IP Card -->
        <div class="bg-black/30 border border-white/10 rounded-2xl p-6 md:p-8 text-center mb-6 shadow-inner relative overflow-hidden">
          <div class="relative z-10">
            <p class="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              IP Address Publik Anda
            </p>
            <div class="text-3xl md:text-5xl font-mono font-bold text-white tracking-tight break-all">
              {{ ipData.ip }}
            </div>
          </div>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
          <!-- Provider -->
          <div class="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 shadow-lg shadow-black/20 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-300 group flex flex-col items-center text-center hover:-translate-y-1">
            <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-4 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p class="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 mt-2">Provider (ISP)</p>
            <p class="text-gray-200 font-medium text-sm md:text-base">{{ ipData.org }}</p>
          </div>

          <!-- Lokasi -->
          <div class="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 shadow-lg shadow-black/20 hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-300 group flex flex-col items-center text-center hover:-translate-y-1">
            <div class="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 mb-4 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p class="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 mt-2">Lokasi</p>
            <p class="text-gray-200 font-medium text-sm md:text-base">{{ ipData.city }}, {{ ipData.region }}, {{ ipData.country_name }}</p>
          </div>
          
          <!-- Timezone -->
          <div class="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 shadow-lg shadow-black/20 hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all duration-300 group flex flex-col items-center text-center hover:-translate-y-1">
            <div class="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 mb-4 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 mt-2">Timezone</p>
            <p class="text-gray-200 font-medium text-sm md:text-base">{{ ipData.timezone }}</p>
          </div>
          
          <!-- ASN -->
          <div class="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 shadow-lg shadow-black/20 hover:bg-white/[0.04] hover:border-purple-500/30 transition-all duration-300 group flex flex-col items-center text-center hover:-translate-y-1">
            <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-4 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <p class="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 mt-2">ASN</p>
            <p class="text-gray-200 font-medium text-sm md:text-base">{{ ipData.asn }}</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  </main>
</template>
