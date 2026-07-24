<script setup>
import { ref, computed } from 'vue'

const ipAddress = ref('192.168.1.1')
const prefix = ref(24)

// Helper to format array of 4 numbers to IP string
const formatIp = (parts) => parts.join('.')

// Helper to parse IP string to array of 4 numbers
const parseIp = (ipStr) => {
  const parts = ipStr.split('.').map(Number)
  if (parts.length !== 4 || parts.some(isNaN) || parts.some(p => p < 0 || p > 255)) {
    return null
  }
  return parts
}

// Compute subnet info
const results = computed(() => {
  const ipParts = parseIp(ipAddress.value)
  if (!ipParts || prefix.value === null || prefix.value < 0 || prefix.value > 32) {
    return null
  }

  // Convert IP to 32-bit integer
  const ipValue = ((ipParts[0] << 24) >>> 0) + (ipParts[1] << 16) + (ipParts[2] << 8) + ipParts[3]

  // Calculate Subnet Mask
  const maskValue = prefix.value === 0 ? 0 : (~(Math.pow(2, 32 - prefix.value) - 1)) >>> 0
  const maskParts = [
    (maskValue >>> 24) & 255,
    (maskValue >>> 16) & 255,
    (maskValue >>> 8) & 255,
    maskValue & 255
  ]

  // Calculate Network Address
  const networkValue = (ipValue & maskValue) >>> 0
  const networkParts = [
    (networkValue >>> 24) & 255,
    (networkValue >>> 16) & 255,
    (networkValue >>> 8) & 255,
    networkValue & 255
  ]

  // Calculate Broadcast Address
  const wildcardValue = (~maskValue) >>> 0
  const broadcastValue = (networkValue | wildcardValue) >>> 0
  const broadcastParts = [
    (broadcastValue >>> 24) & 255,
    (broadcastValue >>> 16) & 255,
    (broadcastValue >>> 8) & 255,
    broadcastValue & 255
  ]
  
  // Host Min and Max
  const hostMinValue = networkValue + 1
  const hostMinParts = [
    (hostMinValue >>> 24) & 255,
    (hostMinValue >>> 16) & 255,
    (hostMinValue >>> 8) & 255,
    hostMinValue & 255
  ]

  const hostMaxValue = broadcastValue - 1
  const hostMaxParts = [
    (hostMaxValue >>> 24) & 255,
    (hostMaxValue >>> 16) & 255,
    (hostMaxValue >>> 8) & 255,
    hostMaxValue & 255
  ]

  // Total hosts
  let totalHosts = 0
  if (prefix.value < 31) {
    totalHosts = Math.pow(2, 32 - prefix.value) - 2
  } else if (prefix.value === 31) {
    totalHosts = 2 // point to point
  } else if (prefix.value === 32) {
    totalHosts = 1 // single host
  }

  return {
    mask: formatIp(maskParts),
    network: formatIp(networkParts),
    broadcast: formatIp(broadcastParts),
    hostMin: formatIp(hostMinParts),
    hostMax: formatIp(hostMaxParts),
    totalHosts: totalHosts.toLocaleString()
  }
})
</script>

<template>
  <main class="max-w-4xl mx-auto px-6 pb-12 pt-28 md:pt-36 relative z-10">
    <div class="text-center mb-8 relative z-10">
      <h1 class="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">IP Calculator</h1>
      <p class="text-gray-500 dark:text-gray-400 text-lg">Hitung Subnet, Network, Broadcast, dan Range Host.</p>
    </div>

    <!-- Diagnostic Window -->
    <div class="relative bg-white/80 dark:bg-[#0f0f13]/80 border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-xl rounded-[1.5rem] shadow-[0_15px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden w-full mb-12">
      <!-- Top Window Bar -->
      <div class="flex justify-between items-center px-6 py-4 border-b border-black/[0.05] dark:border-white/[0.05] bg-black/[0.01] dark:bg-white/[0.02]">
        <div class="flex gap-2 group cursor-pointer" @click="$router.push('/tools')" title="Kembali ke Tools">
          <div class="w-3 h-3 rounded-full bg-[#ff5f56] group-hover:bg-red-400 flex items-center justify-center transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2 text-red-900 opacity-0 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" /></svg>
          </div>
          <div class="w-3 h-3 rounded-full bg-[#ffbd2e] group-hover:bg-yellow-400 transition-colors"></div>
          <div class="w-3 h-3 rounded-full bg-[#27c93f] group-hover:bg-green-400 transition-colors"></div>
        </div>
        
        <div class="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-[0.15em] uppercase hidden md:block">Subnet Tool</div>

        <div class="flex items-center space-x-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <div class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span>
          </div>
          <span>Live Detect</span>
        </div>
      </div>

      <!-- Content Area with Dotted Pattern -->
      <div class="relative p-6 md:p-12 z-10 flex flex-col items-center min-h-[400px]" style="background-image: radial-gradient(var(--dot-color) 1.5px, transparent 1.5px); background-size: 32px 32px;">

        <!-- Input Section -->
        <div class="flex flex-col md:flex-row gap-4 w-full max-w-xl mx-auto mb-10 relative z-10">
          <div class="flex-grow">
            <label class="block text-gray-500 dark:text-gray-400 text-sm font-semibold mb-2 text-center md:text-left">IP Address</label>
            <input 
              v-model="ipAddress" 
              type="text" 
              placeholder="192.168.1.1"
              class="w-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 rounded-2xl px-6 py-4 text-gray-900 dark:text-white font-mono text-center md:text-left focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>
          <div class="w-full md:w-40">
            <label class="block text-gray-500 dark:text-gray-400 text-sm font-semibold mb-2 text-center md:text-left">Prefix (CIDR)</label>
            <input 
              v-model.number="prefix" 
              type="number" 
              min="0" 
              max="32"
              placeholder="24"
              class="w-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 rounded-2xl px-6 py-4 text-gray-900 dark:text-white font-mono text-center focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>
        </div>

        <!-- Results Grid -->
        <div v-slot:results v-if="results" class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto relative z-10 w-full">
          
          <!-- Network Address -->
          <div class="bg-white/60 dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.05] shadow-sm dark:shadow-lg dark:shadow-black/20 rounded-2xl p-6 hover:bg-white/80 dark:hover:bg-white/[0.04] hover:border-purple-500/30 transition-all duration-300 group flex flex-col items-center text-center hover:-translate-y-1">
            <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-4 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <p class="text-gray-400 dark:text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 mt-2">Network Address</p>
            <p class="text-xl md:text-2xl font-mono text-gray-900 dark:text-white font-bold">{{ results.network }}</p>
          </div>

          <!-- Broadcast Address -->
          <div class="bg-white/60 dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.05] shadow-sm dark:shadow-lg dark:shadow-black/20 rounded-2xl p-6 hover:bg-white/80 dark:hover:bg-white/[0.04] hover:border-pink-500/30 transition-all duration-300 group flex flex-col items-center text-center hover:-translate-y-1">
            <div class="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20 mb-4 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
            </div>
            <p class="text-gray-400 dark:text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 mt-2">Broadcast Address</p>
            <p class="text-xl md:text-2xl font-mono text-gray-900 dark:text-white font-bold">{{ results.broadcast }}</p>
          </div>

          <!-- Subnet Mask -->
          <div class="bg-white/60 dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.05] shadow-sm dark:shadow-lg dark:shadow-black/20 rounded-2xl p-6 hover:bg-white/80 dark:hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-300 group flex flex-col items-center text-center hover:-translate-y-1">
            <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-4 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            </div>
            <p class="text-gray-400 dark:text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 mt-2">Subnet Mask</p>
            <p class="text-xl md:text-2xl font-mono text-gray-900 dark:text-white font-bold">{{ results.mask }}</p>
          </div>

          <!-- Total Usable Hosts -->
          <div class="bg-white/60 dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.05] shadow-sm dark:shadow-lg dark:shadow-black/20 rounded-2xl p-6 hover:bg-white/80 dark:hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-300 group flex flex-col items-center text-center hover:-translate-y-1">
            <div class="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-4 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <p class="text-gray-400 dark:text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 mt-2">Total Usable Hosts</p>
            <p class="text-xl md:text-3xl font-mono text-emerald-600 dark:text-emerald-400 font-black">{{ results.totalHosts }}</p>
          </div>
          
          <!-- Usable Host Range with Rotating Border (Full width) -->
          <div class="md:col-span-2 relative rounded-2xl overflow-hidden p-0.5 group mt-2 shadow-sm dark:shadow-2xl hover:-translate-y-1 transition-transform duration-300">
            <!-- Animated rotating gradient -->
            <div class="absolute inset-[-100%] animate-spin opacity-50 dark:opacity-70 group-hover:opacity-100 transition-opacity duration-300" style="animation-duration: 4s; background: conic-gradient(from 90deg at 50% 50%, transparent 50%, #22c55e 100%);"></div>
            
            <!-- Inner Card -->
            <div class="relative bg-white dark:bg-black rounded-2xl p-6 md:p-8 flex flex-col items-center text-center h-full w-full z-10 border border-black/10 dark:border-white/5">
              <div class="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
              
              <div class="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20 mb-4 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              
              <p class="text-gray-500 dark:text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest mb-4 relative z-10">Usable Host Range</p>
              <p class="text-2xl md:text-4xl font-mono text-gray-900 dark:text-white font-black transition-all relative z-10" v-if="prefix < 31">{{ results.hostMin }} - {{ results.hostMax }}</p>
              <p class="text-2xl md:text-4xl font-mono text-gray-400 dark:text-gray-500 italic relative z-10" v-else>Tidak ada (N/A)</p>
            </div>
          </div>

        </div>
        
        <div v-else class="text-center py-10 relative z-10">
          <p class="text-red-500">Format IP Address atau Prefix tidak valid.</p>
        </div>
      </div>
    </div>
  </main>
</template>
