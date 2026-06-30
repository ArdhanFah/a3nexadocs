<script setup>
import { ref } from 'vue'

const domain = ref('')
const isLoading = ref(false)
const result = ref(null)
const error = ref(null)

const lookupWhois = async () => {
  if (!domain.value) return

  isLoading.value = true
  error.value = null
  result.value = null

  // Clean domain input
  let cleanDomain = domain.value.trim().replace(/^https?:\/\//, '').split('/')[0].split(':')[0]

  try {
    const response = await fetch(`/api/whois?domain=${encodeURIComponent(cleanDomain)}`)
    
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const textResult = await response.text()
      if (textResult.includes('import net') || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        throw new Error('Serverless Function tidak aktif di server lokal Vite. Untuk menjalankan secara lokal, silakan jalankan dengan perintah "vercel dev" (bukan "npm run dev"). Fitur ini akan berfungsi otomatis setelah Anda deploy ke Vercel.')
      }
      throw new Error('Gagal menerima respon JSON dari server.')
    }

    const data = await response.json()
    if (data.error) {
      throw new Error(data.error)
    }
    result.value = data
  } catch (err) {
    error.value = err.message || 'Terjadi kesalahan saat melakukan WHOIS lookup.'
  } finally {
    isLoading.value = false
  }
}

const copyToClipboard = () => {
  if (!result.value || !result.value.rawData) return
  navigator.clipboard.writeText(result.value.rawData)
  alert('Data WHOIS berhasil disalin ke clipboard!')
}
</script>

<template>
  <main class="max-w-4xl mx-auto px-6 pb-12 pt-28 md:pt-36 relative z-10">
    <div class="text-center mb-8 relative z-10">
      <h1 class="text-3xl md:text-5xl font-extrabold mb-4 text-white">WHOIS Lookup</h1>
      <p class="text-gray-400 text-lg">Cari tahu informasi registrasi domain, pemilik, tanggal kedaluwarsa, dan name server.</p>
    </div>

    <!-- Diagnostic Window -->
    <div class="relative bg-[#0f0f13]/80 border border-white/[0.08] backdrop-blur-xl rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden w-full mb-12">
      <!-- Top Window Bar -->
      <div class="flex justify-between items-center px-6 py-4 border-b border-white/[0.05] bg-white/[0.02]">
        <div class="flex gap-2 group cursor-pointer" @click="$router.push('/tools')" title="Kembali ke Tools">
          <div class="w-3 h-3 rounded-full bg-[#ff5f56] group-hover:bg-red-400 flex items-center justify-center transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2 text-red-900 opacity-0 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" /></svg>
          </div>
          <div class="w-3 h-3 rounded-full bg-[#ffbd2e] group-hover:bg-yellow-400 transition-colors"></div>
          <div class="w-3 h-3 rounded-full bg-[#27c93f] group-hover:bg-green-400 transition-colors"></div>
        </div>
        
        <div class="text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase hidden md:block">WHOIS Tool</div>

        <div class="flex items-center space-x-2 text-[10px] font-bold text-violet-400 uppercase tracking-wider bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
          <div class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-violet-500 shadow-[0_0_5px_rgba(139,92,246,0.8)]"></span>
          </div>
          <span>Registrar Info</span>
        </div>
      </div>

      <!-- Content Area with Dotted Pattern -->
      <div class="relative p-6 md:p-12 z-10 flex flex-col min-h-[400px]" style="background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1.5px, transparent 1.5px); background-size: 32px 32px;">

        <!-- Input Section -->
        <form @submit.prevent="lookupWhois" class="max-w-2xl mx-auto mb-8 relative z-10 w-full">
          <div class="flex flex-col md:flex-row gap-4 mb-3">
            <div class="flex-grow">
              <input 
                v-model="domain" 
                type="text" 
                placeholder="Contoh: google.com atau polri.go.id"
                required
                class="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-gray-500"
              />
            </div>
            <button 
              type="submit" 
              :disabled="isLoading || !domain"
              class="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 disabled:opacity-50 text-white font-bold rounded-2xl px-8 py-4 transition-all flex items-center justify-center min-w-[120px] shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-else class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                Lookup
              </span>
            </button>
          </div>
          <p class="text-gray-500 text-sm px-2 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 shrink-0 mt-0.5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Ketik nama domain (contoh: yahoo.com) untuk mencari informasi kepemilikan dan masa aktif domain.
          </p>
        </form>

        <!-- Results Section -->
        <div class="max-w-3xl mx-auto relative z-10 w-full">
          <div v-if="error" class="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center text-red-400">
            <p>{{ error }}</p>
          </div>

          <div v-else-if="result" class="flex flex-col gap-4">
            <div class="flex justify-between items-center px-2">
              <h3 class="text-lg font-bold text-white">Hasil WHOIS untuk: <span class="text-violet-400">{{ result.domain }}</span></h3>
              <button 
                @click="copyToClipboard"
                class="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/5 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Salin Data
              </button>
            </div>
            
            <div class="overflow-hidden rounded-2xl border border-white/5 bg-black/40">
              <pre class="font-mono text-xs p-6 overflow-x-auto text-gray-300 max-h-[500px] leading-relaxed select-text">{{ result.rawData || 'Tidak ada data WHOIS yang ditemukan.' }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
pre::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
pre::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}
pre::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
pre::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
