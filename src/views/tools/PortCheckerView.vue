<script setup>
import { ref } from 'vue'

const host = ref('')
const selectedPortOption = ref('80')
const customPort = ref('')
const isLoading = ref(false)
const result = ref(null)
const error = ref(null)

const commonPorts = [
  { value: '21', label: '21 (FTP)' },
  { value: '22', label: '22 (SSH)' },
  { value: '23', label: '23 (Telnet)' },
  { value: '25', label: '25 (SMTP)' },
  { value: '53', label: '53 (DNS)' },
  { value: '80', label: '80 (HTTP)' },
  { value: '110', label: '110 (POP3)' },
  { value: '143', label: '143 (IMAP)' },
  { value: '443', label: '443 (HTTPS)' },
  { value: '3306', label: '3306 (MySQL)' },
  { value: '3389', label: '3389 (RDP)' },
  { value: '8080', label: '8080 (HTTP Alternate)' },
  { value: 'custom', label: 'Kustom Port...' }
]

const checkPort = async () => {
  if (!host.value) return

  const targetPort = selectedPortOption.value === 'custom' ? customPort.value : selectedPortOption.value
  if (!targetPort) return

  isLoading.value = true
  error.value = null
  result.value = null

  // Clean host (remove protocol and path if pasted)
  let cleanHost = host.value.trim().replace(/^https?:\/\//, '').split('/')[0].split(':')[0]

  try {
    const response = await fetch(`/api/check-port?host=${encodeURIComponent(cleanHost)}&port=${targetPort}`)
    
    // Cek apakah response berupa text biasa (seperti source code saat dijalankan di Vite lokal)
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
    error.value = err.message || 'Terjadi kesalahan saat memindai port.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="max-w-4xl mx-auto px-6 pb-12 pt-28 md:pt-36 relative z-10">
    <div class="text-center mb-8 relative z-10">
      <h1 class="text-3xl md:text-5xl font-extrabold mb-4 text-white">Open Port Checker</h1>
      <p class="text-gray-400 text-lg">Periksa apakah suatu port terbuka pada alamat IP publik atau domain Anda.</p>
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
        
        <div class="text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase hidden md:block">Port Scanner Tool</div>

        <div class="flex items-center space-x-2 text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          <div class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.8)]"></span>
          </div>
          <span>External Scan</span>
        </div>
      </div>

      <!-- Content Area with Dotted Pattern -->
      <div class="relative p-6 md:p-12 z-10 flex flex-col min-h-[400px]" style="background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1.5px, transparent 1.5px); background-size: 32px 32px;">

        <!-- Input Section -->
        <form @submit.prevent="checkPort" class="mb-12 relative z-10 w-full">
          <div class="flex flex-col md:flex-row gap-4 mb-4">
            <div class="flex-grow">
              <label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Domain atau Alamat IP</label>
              <input 
                v-model="host" 
                type="text" 
                placeholder="Contoh: google.com atau 8.8.8.8"
                required
                class="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-gray-500"
              />
            </div>
            <div class="w-full md:w-56 shrink-0">
              <label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Pilih Port</label>
              <select 
                v-model="selectedPortOption"
                class="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all cursor-pointer appearance-none text-center"
              >
                <option v-for="port in commonPorts" :key="port.value" :value="port.value">{{ port.label }}</option>
              </select>
            </div>
          </div>

          <!-- Custom Port Input -->
          <div v-if="selectedPortOption === 'custom'" class="mb-4 animate-fadeIn">
            <label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Nomor Port Kustom</label>
            <input 
              v-model="customPort" 
              type="number" 
              min="1" 
              max="65535"
              placeholder="Masukkan port (1 - 65535)"
              required
              class="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-gray-500"
            />
          </div>

          <div class="flex justify-end mt-6">
            <button 
              type="submit" 
              :disabled="isLoading || !host"
              class="w-full md:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 text-white font-bold rounded-2xl px-10 py-4 transition-all flex items-center justify-center min-w-[150px] shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            >
              <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-else class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Pindai Port
              </span>
            </button>
          </div>
          
          <p class="text-gray-500 text-sm mt-4 px-2 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 shrink-0 mt-0.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pindai dilakukan dari server cloud eksternal. Pastikan pengaturan firewall dan Port Forwarding di router Anda telah diarahkan dengan benar.
          </p>
        </form>

        <!-- Results Section -->
        <div class="relative z-10 w-full">
          <div v-if="error" class="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center text-red-400">
            <p>{{ error }}</p>
          </div>

          <div v-else-if="result" class="overflow-hidden rounded-2xl border border-white/5 bg-black/40 p-8">
            <div class="flex flex-col items-center text-center">
              <div class="w-16 h-16 rounded-full flex items-center justify-center mb-4" :class="result.status === 'open' ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'">
                <svg v-if="result.status === 'open'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h3 class="text-2xl font-bold text-white mb-2">
                Port {{ result.port }} is <span :class="result.status === 'open' ? 'text-emerald-400' : 'text-red-400'">{{ result.status.toUpperCase() }}</span>
              </h3>
              
              <div class="grid grid-cols-2 gap-4 max-w-xs w-full mt-6 text-left text-sm border-t border-white/5 pt-6">
                <span class="text-gray-400">Target Host:</span>
                <span class="text-white font-mono text-right truncate">{{ result.host }}</span>
                <span class="text-gray-400">Port Number:</span>
                <span class="text-white font-mono text-right">{{ result.port }}</span>
                <span class="text-gray-400">Status:</span>
                <span class="font-semibold text-right" :class="result.status === 'open' ? 'text-emerald-400' : 'text-red-400'">{{ result.status === 'open' ? 'Terbuka (Open)' : 'Tertutup (Closed)' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.25s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
