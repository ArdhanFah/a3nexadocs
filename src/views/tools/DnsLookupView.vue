<script setup>
import { ref } from 'vue'

const domain = ref('')
const recordType = ref('A')
const results = ref(null)
const isLoading = ref(false)
const error = ref(null)

const recordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SOA']

const handleLookup = async () => {
  if (!domain.value) return
  
  isLoading.value = true
  error.value = null
  results.value = null
  
  try {
    // Sanitize domain prefix http/https
    let cleanDomain = domain.value.trim()
    cleanDomain = cleanDomain.replace(/^(https?:\/\/)?(www\.)?/, '')

    // Fetch DNS using Cloudflare DNS JSON API
    const response = await fetch(`https://cloudflare-dns.com/api-v1/3/query?name=${cleanDomain}&type=${recordType.value}`, {
      headers: {
        'accept': 'application/dns-json'
      }
    })
    
    if (!response.ok) throw new Error('Gagal menghubungi DNS server resolver.')
    const data = await response.json()
    
    if (data.Status !== 0) {
      throw new Error(`DNS Query gagal dengan status kode ${data.Status}`)
    }

    if (data.Answer) {
      // Map Answer records
      const typesMap = {
        1: 'A',
        28: 'AAAA',
        5: 'CNAME',
        15: 'MX',
        16: 'TXT',
        2: 'NS',
        6: 'SOA'
      }

      results.value = data.Answer.map(ans => ({
        name: ans.name,
        type: typesMap[ans.type] || recordType.value,
        ttl: ans.TTL,
        data: ans.data
      }))
    } else {
      results.value = []
    }
  } catch (err) {
    error.value = err.message || 'Terjadi kesalahan sistem saat menghubungi DNS Server.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="max-w-4xl mx-auto px-6 pb-12 pt-28 md:pt-36 relative z-10">
    <div class="text-center mb-8 relative z-10">
      <h1 class="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">DNS Lookup Tool</h1>
      <p class="text-gray-500 dark:text-gray-400 text-lg">Periksa dan deteksi record DNS (A, MX, CNAME, TXT, NS) suatu domain.</p>
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
        
        <div class="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-[0.15em] uppercase hidden md:block">DNS Resolver</div>

        <div class="flex items-center space-x-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <div class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span>
          </div>
          <span>Cloudflare Resolving</span>
        </div>
      </div>

      <!-- Content Area with Dotted Pattern -->
      <div class="relative p-6 md:p-12 z-10 flex flex-col items-center min-h-[400px] justify-start" style="background-image: radial-gradient(var(--dot-color) 1.5px, transparent 1.5px); background-size: 32px 32px;">
        
        <!-- Search Form -->
        <form @submit.prevent="handleLookup" class="w-full max-w-2xl mb-10 relative z-10">
          <div class="flex flex-col md:flex-row gap-4 mb-4">
            <div class="flex-grow">
              <input 
                v-model="domain" 
                type="text" 
                placeholder="Contoh: google.com"
                required
                class="w-full bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-2xl px-6 py-4 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500/55 dark:focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            <div class="w-full md:w-32 shrink-0">
              <select 
                v-model="recordType"
                class="w-full bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-4 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all cursor-pointer appearance-none text-center"
              >
                <option v-for="type in recordTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>
            <button 
              type="submit" 
              :disabled="isLoading || !domain"
              class="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 disabled:opacity-50 text-white font-bold rounded-2xl px-8 py-4 transition-all flex items-center justify-center min-w-[120px] shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
            >
              <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-else class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                Cari
              </span>
            </button>
          </div>
          <p class="text-gray-500 dark:text-gray-400 text-sm px-2 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 shrink-0 mt-0.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Ketik nama domain tanpa http/https (contoh: facebook.com) untuk mengecek di mana domain tersebut diarahkan.
          </p>
        </form>

        <!-- Results Section -->
        <div class="w-full relative z-10">
          
          <div v-if="error" class="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center text-red-500 dark:text-red-400 mb-6">
            <p>{{ error }}</p>
          </div>

          <div v-else-if="results && results.length === 0" class="bg-black/5 dark:bg-black/20 border border-black/10 dark:border-white/5 rounded-2xl p-8 text-center">
            <p class="text-gray-600 dark:text-gray-400">Tidak ada record tipe <strong class="text-emerald-600 dark:text-emerald-400">{{ recordType }}</strong> ditemukan untuk domain tersebut.</p>
          </div>

          <!-- Results Container -->
          <div v-else-if="results && results.length > 0">
            <!-- Desktop Table View -->
            <div class="hidden md:block overflow-x-auto rounded-2xl border border-black/[0.06] dark:border-white/5 bg-white dark:bg-black/40">
              <table class="w-full text-left text-sm text-gray-700 dark:text-gray-300">
                <thead class="bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-400 uppercase font-semibold text-xs tracking-wider">
                  <tr>
                    <th class="px-6 py-4">Domain</th>
                    <th class="px-6 py-4">Type</th>
                    <th class="px-6 py-4">TTL</th>
                    <th class="px-6 py-4">Data / Value</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/[0.06] dark:divide-white/5">
                  <tr v-for="(record, idx) in results" :key="idx" class="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td class="px-6 py-4 truncate max-w-[150px] text-gray-900 dark:text-white font-medium">{{ record.name }}</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md text-xs font-bold">{{ record.type }}</span>
                    </td>
                    <td class="px-6 py-4 text-gray-400 dark:text-gray-500">{{ record.ttl }}s</td>
                    <td class="px-6 py-4 font-mono text-gray-900 dark:text-gray-300 break-all">{{ record.data }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Mobile Card List View -->
            <div class="block md:hidden space-y-4">
              <div 
                v-for="(record, idx) in results" 
                :key="idx" 
                class="bg-white/60 dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/5 rounded-2xl p-5 hover:border-emerald-500/30 transition-all shadow-sm dark:shadow-none"
              >
                <div class="flex justify-between items-start mb-3">
                  <div class="truncate max-w-[200px] text-gray-900 dark:text-white font-bold">{{ record.name }}</div>
                  <span class="px-2 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md text-xs font-bold">{{ record.type }}</span>
                </div>
                <div class="space-y-1">
                  <div class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">TTL</div>
                  <div class="text-xs text-gray-500 font-mono">{{ record.ttl }} seconds</div>
                </div>
                <div class="mt-3 pt-3 border-t border-black/[0.05] dark:border-white/5">
                  <div class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Value / Address</div>
                  <div class="text-xs font-mono text-gray-900 dark:text-gray-300 break-all bg-black/5 dark:bg-black/30 p-2.5 rounded-lg border border-black/5 dark:border-white/5">{{ record.data }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
