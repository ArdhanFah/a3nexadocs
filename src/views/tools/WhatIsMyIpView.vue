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
      <h1 class="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">What is My IP</h1>
      <p class="text-gray-500 dark:text-gray-400 text-lg">Informasi IP Publik, ISP, dan Lokasi Anda.</p>
    </div>

    <!-- Diagnostic Window -->
    <div class="relative bg-white/80 dark:bg-[#0f0f13]/80 border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-xl rounded-[1.5rem] shadow-[0_15px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden w-full">
      <!-- Top Window Bar -->
      <div class="flex justify-between items-center px-6 py-4 border-b border-black/[0.05] dark:border-white/[0.05] bg-black/[0.01] dark:bg-white/[0.02]">
        <div class="flex gap-2 group cursor-pointer" @click="$router.push('/tools')" title="Kembali ke Tools">
          <div class="w-3 h-3 rounded-full bg-[#ff5f56] group-hover:bg-red-400 flex items-center justify-center transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2 text-red-900 opacity-0 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" /></svg>
          </div>
          <div class="w-3 h-3 rounded-full bg-[#ffbd2e] group-hover:bg-yellow-400 transition-colors"></div>
          <div class="w-3 h-3 rounded-full bg-[#27c93f] group-hover:bg-green-400 transition-colors"></div>
        </div>
        
        <div class="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-[0.15em] uppercase hidden md:block">IP Identifier</div>

        <div class="flex items-center space-x-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <div class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-550 dark:bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span>
          </div>
          <span>Live Detect</span>
        </div>
      </div>

      <!-- Content Area with Dotted Pattern -->
      <div class="relative p-6 md:p-12 z-10 flex flex-col items-center min-h-[400px] justify-center" style="background-image: radial-gradient(var(--dot-color) 1.5px, transparent 1.5px); background-size: 32px 32px;">
        
        <!-- Loading State -->
        <div v-if="isLoading" class="flex flex-col items-center justify-center text-center">
          <div class="relative w-24 h-24 mb-6">
            <div class="absolute inset-0 rounded-full border-4 border-black/[0.04] dark:border-white/[0.05]"></div>
            <div class="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
          </div>
          <p class="text-gray-500 dark:text-gray-400 animate-pulse text-lg tracking-wide font-medium">Menganalisis Koneksi...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center text-red-500 dark:text-red-400 max-w-lg mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>{{ error }}</p>
          <button @click="fetchIpData" class="mt-4 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-600 dark:text-white rounded-full transition-colors">Coba Lagi</button>
        </div>

        <!-- Result State -->
        <div v-else-if="ipData" class="max-w-2xl mx-auto w-full relative z-10">
          <!-- Main IP Card -->
          <div class="bg-black/[0.02] dark:bg-black/30 border border-black/10 dark:border-white/10 rounded-2xl p-6 md:p-8 text-center mb-6 shadow-inner relative overflow-hidden">
            <div class="relative z-10">
              <span class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-2">Alamat IP Publik Anda</span>
              <h2 class="text-3xl md:text-5xl font-black text-primary-600 dark:text-primary-400 font-mono tracking-tight">{{ ipData.ip }}</h2>
            </div>
            <!-- Glow background -->
            <div class="absolute inset-0 bg-gradient-to-tr from-primary-500/5 to-transparent opacity-0 dark:opacity-100"></div>
          </div>

          <!-- IP Info Details List -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-black/[0.01] dark:bg-white/[0.01] border border-black/[0.06] dark:border-white/[0.04] p-4 rounded-xl flex items-center justify-between">
              <div>
                <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">Penyedia Layanan (ISP)</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-gray-200 mt-1 block">{{ ipData.org || 'Tidak Diketahui' }}</span>
              </div>
            </div>

            <div class="bg-black/[0.01] dark:bg-white/[0.01] border border-black/[0.06] dark:border-white/[0.04] p-4 rounded-xl flex items-center justify-between">
              <div>
                <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">Kota</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-gray-200 mt-1 block">{{ ipData.city || 'Tidak Diketahui' }}</span>
              </div>
            </div>

            <div class="bg-black/[0.01] dark:bg-white/[0.01] border border-black/[0.06] dark:border-white/[0.04] p-4 rounded-xl flex items-center justify-between">
              <div>
                <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">Provinsi / Wilayah</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-gray-200 mt-1 block">{{ ipData.region || 'Tidak Diketahui' }}</span>
              </div>
            </div>

            <div class="bg-black/[0.01] dark:bg-white/[0.01] border border-black/[0.06] dark:border-white/[0.04] p-4 rounded-xl flex items-center justify-between">
              <div>
                <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">Negara</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-gray-200 mt-1 block font-mono">{{ ipData.country_name || 'Tidak Diketahui' }}</span>
              </div>
            </div>

            <div class="bg-black/[0.01] dark:bg-white/[0.01] border border-black/[0.06] dark:border-white/[0.04] p-4 rounded-xl flex items-center justify-between">
              <div>
                <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">Zona Waktu</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-gray-200 mt-1 block font-mono">{{ ipData.timezone || 'Tidak Diketahui' }}</span>
              </div>
            </div>

            <div class="bg-black/[0.01] dark:bg-white/[0.01] border border-black/[0.06] dark:border-white/[0.04] p-4 rounded-xl flex items-center justify-between">
              <div>
                <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">Autonomous System (ASN)</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-gray-200 mt-1 block font-mono">{{ ipData.asn || 'Tidak Diketahui' }}</span>
              </div>
            </div>
          </div>

          <div class="flex justify-center mt-8">
            <button 
              @click="fetchIpData" 
              class="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold shadow-lg transition-all hover:scale-105 active:scale-95 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.5" />
              </svg>
              Refresh Status IP
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
