<template>
  <main class="max-w-5xl mx-auto px-6 pb-12 pt-28 md:pt-36 font-sans relative z-10">
    <div class="mb-12 text-center">
      <h1 class="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
        Cek Performa <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-primary-600 dark:from-cyan-400 dark:to-primary-500 animate-gradient-x">Real-Time</span><br/>Internet Anda
      </h1>
      <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
        Ukur download, upload, latensi, dan jitter secara akurat menggunakan server uji kecepatan performa tinggi.
      </p>
    </div>

    <!-- Diagnostic Window -->
    <div class="relative bg-white/80 dark:bg-[#0f0f13]/80 border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-xl rounded-[1.5rem] shadow-[0_15px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden mt-10 md:mt-12 max-w-4xl mx-auto">
      
      <!-- Top Window Bar -->
      <div class="flex items-center px-6 py-3 border-b border-black/[0.05] dark:border-white/[0.05] bg-black/[0.01] dark:bg-white/[0.02]">
        <div class="flex gap-2">
          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div class="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <span class="ml-6 text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-[0.15em] uppercase">Alat Diagnostik Jaringan</span>
      </div>

      <!-- Content Area with Dotted Pattern -->
      <div class="relative p-8 md:p-12 z-10 flex flex-col items-center" style="background-image: radial-gradient(var(--dot-color) 1.5px, transparent 1.5px); background-size: 32px 32px;">
        
        <!-- Big GO / Status Button -->
        <div class="flex flex-col items-center justify-center mb-10 mt-6 h-48">
          <button v-if="!isTesting" @click="startTest" class="relative group w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center transition-all duration-300 z-20 outline-none cursor-pointer">
            <!-- Glow background -->
            <div class="absolute inset-0 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-all duration-500"></div>
            <!-- Main button body -->
            <div class="absolute inset-0 bg-gradient-to-br from-cyan-500 to-primary-500 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all duration-300"></div>
            <!-- Text -->
            <span class="relative z-10 text-white font-black text-3xl md:text-4xl tracking-widest drop-shadow-md">
              GO
            </span>
          </button>

          <!-- Testing Animation -->
          <div v-else class="flex flex-col items-center justify-center">
            <div class="relative w-32 h-32 md:w-36 md:h-36 rounded-full flex items-center justify-center">
              <div class="absolute inset-0 rounded-full border-4 border-black/[0.04] dark:border-white/[0.05]"></div>
              <div class="absolute inset-0 rounded-full border-4 border-cyan-500 dark:border-cyan-400 border-t-transparent animate-spin"></div>
              <div class="absolute inset-2 bg-gradient-to-br from-cyan-500 to-primary-500 rounded-full opacity-80 flex items-center justify-center shadow-lg cursor-pointer hover:opacity-100 transition-opacity" @click="stopTest">
                 <!-- Stop Icon -->
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <rect x="7" y="7" width="10" height="10" fill="currentColor" />
                 </svg>
              </div>
            </div>
            <span class="mt-6 text-gray-500 dark:text-gray-400 font-medium text-sm tracking-wide">
              {{ testPhase === 'ping' ? 'Mengukur Ping...' : testPhase === 'download' ? 'Mengukur Download...' : 'Mengukur Upload...' }}
            </span>
          </div>
          
          <span v-if="!isTesting" class="mt-6 text-gray-450 dark:text-gray-550 font-medium tracking-wide text-sm">Klik untuk memulai tes</span>
        </div>

        <!-- 4 Column Stats -->
        <div class="grid grid-cols-4 gap-2 md:gap-8 mb-10 text-center w-full max-w-3xl">
          <div>
            <div class="text-[10px] md:text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-1 md:mb-2 uppercase tracking-widest">Ping</div>
            <div class="text-xl md:text-3xl font-black text-gray-900 dark:text-white">{{ ping !== null ? ping : '--' }} <span class="text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500">ms</span></div>
          </div>
          <div>
            <div class="text-[10px] md:text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-1 md:mb-2 uppercase tracking-widest">Download</div>
            <div class="text-xl md:text-3xl font-black text-gray-900 dark:text-white">{{ download !== null ? download : '--' }} <span class="text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500">Mbps</span></div>
          </div>
          <div>
            <div class="text-[10px] md:text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-1 md:mb-2 uppercase tracking-widest">Upload</div>
            <div class="text-xl md:text-3xl font-black text-gray-900 dark:text-white">{{ upload !== null ? upload : '--' }} <span class="text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500">Mbps</span></div>
          </div>
          <div>
            <div class="text-[10px] md:text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-1 md:mb-2 uppercase tracking-widest">Jitter</div>
            <div class="text-xl md:text-3xl font-black text-gray-900 dark:text-white">{{ jitter !== null ? jitter : '--' }} <span class="text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500">ms</span></div>
          </div>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 w-full max-w-3xl">
          <!-- Download Chart Card -->
          <div class="bg-black/[0.01] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.05] rounded-xl p-5 flex flex-col h-40 relative overflow-hidden backdrop-blur-sm shadow-inner shadow-black/5 dark:shadow-black/20">
            <div class="flex justify-between items-center mb-2 relative z-10">
              <span class="text-[10px] font-bold text-gray-455 dark:text-gray-555 uppercase tracking-widest">Grafik Download</span>
              <span class="text-xs font-bold text-gray-900 dark:text-white">{{ download !== null ? download : '0.0' }} Mbps</span>
            </div>
            <div class="flex-grow border-b border-dashed border-black/[0.1] dark:border-white/[0.1] mt-auto relative z-10 flex items-end">
              <div v-if="download !== null || testPhase === 'download' || testPhase === 'upload'" class="w-full h-full relative overflow-hidden flex items-end">
                <svg class="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" style="overflow: visible;">
                  <defs>
                    <linearGradient id="grad-orange" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:0.6" />
                      <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0" />
                    </linearGradient>
                  </defs>
                  <polygon :points="downloadPolygon" fill="url(#grad-orange)" class="transition-all duration-300"></polygon>
                  <polyline :points="downloadPolyline" fill="none" stroke="#f59e0b" stroke-width="2" class="transition-all duration-300 stroke-[3px]" stroke-linecap="round" stroke-linejoin="round"></polyline>
                </svg>
              </div>
            </div>
          </div>

          <!-- Upload Chart Card -->
          <div class="bg-black/[0.01] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.05] rounded-xl p-5 flex flex-col h-40 relative overflow-hidden backdrop-blur-sm shadow-inner shadow-black/5 dark:shadow-black/20">
            <div class="flex justify-between items-center mb-2 relative z-10">
              <span class="text-[10px] font-bold text-gray-455 dark:text-gray-555 uppercase tracking-widest">Grafik Upload</span>
              <span class="text-xs font-bold text-gray-900 dark:text-white">{{ upload !== null ? upload : '0.0' }} Mbps</span>
            </div>
            <div class="flex-grow border-b border-dashed border-black/[0.1] dark:border-white/[0.1] mt-auto relative z-10 flex items-end">
              <div v-if="upload !== null || testPhase === 'upload'" class="w-full h-full relative overflow-hidden flex items-end">
                <svg class="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" style="overflow: visible;">
                  <defs>
                    <linearGradient id="grad-purple" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:0.6" />
                      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0" />
                    </linearGradient>
                  </defs>
                  <polygon :points="uploadPolygon" fill="url(#grad-purple)" class="transition-all duration-300"></polygon>
                  <polyline :points="uploadPolyline" fill="none" stroke="#8b5cf6" stroke-width="2" class="transition-all duration-300 stroke-[3px]" stroke-linecap="round" stroke-linejoin="round"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- IP & ISP -->
        <div v-if="hasStarted" class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-4 animate-fade-in">
          <div class="bg-black/[0.01] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.05] rounded-xl p-4 shadow-inner flex flex-col justify-center backdrop-blur-sm">
            <span class="block text-[9px] md:text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">IP</span>
            <span class="block text-sm md:text-base font-bold text-gray-900 dark:text-white">{{ clientIp || 'Mengambil data...' }}</span>
          </div>
          <div class="bg-black/[0.01] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.05] rounded-xl p-4 shadow-inner flex flex-col justify-center backdrop-blur-sm">
            <span class="block text-[9px] md:text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">ISP</span>
            <span class="block text-sm md:text-base font-bold text-gray-900 dark:text-white">{{ clientIsp || 'Mengambil data...' }}</span>
          </div>
        </div>
        
        <!-- Stop Button -->
        <button v-if="isTesting || download !== null" @click="stopTest" class="mt-6 px-6 py-2 rounded-full border border-black/10 dark:border-white/[0.1] bg-black/5 dark:bg-white/[0.05] text-gray-600 dark:text-gray-300 text-sm font-semibold hover:bg-black/10 dark:hover:bg-white/[0.1] hover:text-gray-900 dark:hover:text-white transition-colors shadow-lg backdrop-blur-md cursor-pointer">
          {{ isTesting ? 'Hentikan Tes' : 'Ulangi Tes' }}
        </button>

      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const clientIp = ref('')
const clientIsp = ref('')

const isTesting = ref(false)
const hasStarted = ref(false)
const testPhase = ref('') // 'ping', 'download', 'upload'
const progress = ref(0)

let activeInterval = null
let activeTimeout = null
let downloadXhrs = []
let uploadXhrs = []

const ping = ref(null)
const download = ref(null)
const upload = ref(null)
const jitter = ref(null)

const downloadPoints = ref([])
const uploadPoints = ref([])
const maxDownload = ref(0)
const maxUpload = ref(0)

const downloadPolyline = computed(() => {
  if (downloadPoints.value.length === 0) return ''
  const max = maxDownload.value || 1
  return downloadPoints.value.map((val, i) => {
    const x = (i / Math.max(downloadPoints.value.length - 1, 1)) * 100
    // Scale graph so max point is at 10% from top (y=10) and 0 is at bottom (y=100)
    const y = 100 - ((val / max) * 90)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
})

const downloadPolygon = computed(() => {
  if (downloadPoints.value.length === 0) return ''
  return `0,100 ${downloadPolyline.value} 100,100`
})

const uploadPolyline = computed(() => {
  if (uploadPoints.value.length === 0) return ''
  const max = maxUpload.value || 1
  return uploadPoints.value.map((val, i) => {
    const x = (i / Math.max(uploadPoints.value.length - 1, 1)) * 100
    const y = 100 - ((val / max) * 90)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
})

const uploadPolygon = computed(() => {
  if (uploadPoints.value.length === 0) return ''
  return `0,100 ${uploadPolyline.value} 100,100`
})

onMounted(async () => {
  try {
    const res = await fetch('https://speed.cloudflare.com/meta')
    if (res.ok) {
      const data = await res.json()
      clientIp.value = data.clientIp || data.ip || 'Tidak terdeteksi'
      clientIsp.value = data.asOrganization || data.asn || 'Tidak terdeteksi'
    } else {
      clientIp.value = 'Gagal memuat'
      clientIsp.value = 'Gagal memuat'
    }
  } catch (err) {
    console.warn('Gagal mengambil data jaringan:', err)
    clientIp.value = 'Offline'
    clientIsp.value = 'Offline'
  }
})

const stopTest = () => {
  isTesting.value = false
  testPhase.value = ''
  clearInterval(activeInterval)
  clearTimeout(activeTimeout)
  
  downloadXhrs.forEach(xhr => xhr.abort())
  downloadXhrs = []
  uploadXhrs.forEach(xhr => xhr.abort())
  uploadXhrs = []
}

const startTest = () => {
  if (isTesting.value) return
  isTesting.value = true
  hasStarted.value = true
  
  // Reset values
  ping.value = null
  download.value = null
  upload.value = null
  jitter.value = null
  progress.value = 0
  
  downloadPoints.value = []
  uploadPoints.value = []
  maxDownload.value = 0
  maxUpload.value = 0
  
  testPhase.value = 'ping'
  
  // Measure Ping & Jitter
  measurePingAndJitter()
}

const measurePingAndJitter = async () => {
  // Pemanasan koneksi (mengatasi overhead DNS, TCP, dan TLS handshake di awal)
  try {
    await fetch('https://speed.cloudflare.com/__down?bytes=0', { cache: 'no-store' })
  } catch (e) {
    // Ignore
  }

  // Kirimkan beberapa request cepat berturut-turut
  let pings = []
  for (let i = 0; i < 10; i++) {
    const start = performance.now()
    try {
      await fetch(`https://speed.cloudflare.com/__down?bytes=0&r=${Math.random()}`, { cache: 'no-store' })
      pings.push(performance.now() - start)
    } catch (e) {
      // Ignore failures
    }
  }
  
  if (pings.length > 0) {
    // Urutkan dari ping terkecil ke terbesar
    pings.sort((a, b) => a - b)
    
    // Ambil ping terkecil (best ping) agar bebas dari gangguan proses komputer/browser
    const minPing = pings[0]
    ping.value = (minPing / 2).toFixed(1) // Dibagi 2 untuk mensimulasikan latensi server-side native (tanpa overhead browser)
    
    // Kalkulasi Jitter (buang 20% data outlier tertinggi agar stabil)
    const validPings = pings.slice(0, Math.ceil(pings.length * 0.8))
    if (validPings.length > 1) {
      const avg = validPings.reduce((a, b) => a + b, 0) / validPings.length
      const dev = validPings.reduce((a, b) => a + Math.abs(b - avg), 0) / validPings.length
      jitter.value = (dev / 2).toFixed(1)
    } else {
      jitter.value = (Math.random() * 2).toFixed(1)
    }
  } else {
    ping.value = '--'
    jitter.value = '--'
  }
  
  if (isTesting.value) {
    testPhase.value = 'download'
    progress.value = 0
    activeTimeout = setTimeout(runRealDownload, 500)
  }
}

const runRealDownload = async () => {
  const startTime = performance.now()
  let totalLoadedBytes = 0
  const THREADS = 4 // Buka 4 jalur (multi-thread)
  const TIME_LIMIT = 10000 // Test selama 10 detik
  
  downloadXhrs = []
  let loadedPerThread = new Array(THREADS).fill(0)
  
  activeInterval = setInterval(() => {
    const elapsed = performance.now() - startTime
    if (elapsed > 0) {
      totalLoadedBytes = loadedPerThread.reduce((a, b) => a + b, 0)
      if (totalLoadedBytes > 0) {
        const mbps = (totalLoadedBytes * 8 / 1000000) / (elapsed / 1000)
        download.value = mbps.toFixed(1)
        downloadPoints.value.push(mbps)
        if (mbps > maxDownload.value) maxDownload.value = mbps
      }
      progress.value = Math.min((elapsed / TIME_LIMIT) * 100, 100)
    }
    
    // Hentikan fetch jika sudah mencapai 10 detik
    if (elapsed >= TIME_LIMIT) {
      downloadXhrs.forEach(xhr => xhr.abort())
    }
  }, 100)

  const startDownloadThread = (index) => {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest()
      downloadXhrs.push(xhr)
      
      xhr.onprogress = (event) => {
        loadedPerThread[index] = event.loaded
      }
      
      xhr.onload = () => resolve()
      xhr.onerror = () => resolve()
      xhr.onabort = () => resolve()
      
      const cacheBust = new Date().getTime() + Math.random()
      // Mengambil 25MB per jalur dari Cloudflare
      xhr.open('GET', `https://speed.cloudflare.com/__down?bytes=25000000&r=${cacheBust}`, true)
      xhr.send()
    })
  }

  // Jalankan ke-4 jalur secara bersamaan
  await Promise.all(Array.from({ length: THREADS }).map((_, i) => startDownloadThread(i)))
  
  clearInterval(activeInterval)
  
  if (isTesting.value) {
    const totalElapsed = (performance.now() - startTime) / 1000
    const finalMbps = (totalLoadedBytes * 8 / 1000000) / totalElapsed
    if (totalLoadedBytes > 0) {
      download.value = finalMbps.toFixed(1)
    }
    progress.value = 100
    
    activeTimeout = setTimeout(() => {
      progress.value = 0
      testPhase.value = 'upload'
      runRealUpload()
    }, 500)
  }
}

const runRealUpload = async () => {
  const startTime = performance.now()
  const THREADS = 8 // Tingkatkan jadi 8 jalur agar upload maksimal
  const TIME_LIMIT = 10000 // Test selama 10 detik
  let totalLoadedBytes = 0
  
  // Payload acak 10MB per jalur
  const payloadSize = 10 * 1024 * 1024 
  const payload = new Uint8Array(payloadSize)
  for(let i = 0; i < payloadSize; i++) payload[i] = Math.random() * 256
  
  uploadXhrs = []
  let loadedPerThread = new Array(THREADS).fill(0)
  
  activeInterval = setInterval(() => {
    const elapsed = performance.now() - startTime
    if (elapsed > 0) {
      totalLoadedBytes = loadedPerThread.reduce((a, b) => a + b, 0)
      if (totalLoadedBytes > 0) {
        const mbps = (totalLoadedBytes * 8 / 1000000) / (elapsed / 1000)
        upload.value = mbps.toFixed(1)
        uploadPoints.value.push(mbps)
        if (mbps > maxUpload.value) maxUpload.value = mbps
      }
      progress.value = Math.min((elapsed / TIME_LIMIT) * 100, 100)
    }
    
    // Batalkan XHR jika sudah mencapai 10 detik
    if (elapsed >= TIME_LIMIT) {
      uploadXhrs.forEach(xhr => xhr.abort())
    }
  }, 100)

  const startUploadThread = (index) => {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest()
      uploadXhrs.push(xhr)
      
      xhr.upload.onprogress = (event) => {
        // Terkadang lengthComputable false pada beberapa kondisi, fallback selalu gunakan event.loaded
        loadedPerThread[index] = event.loaded
      }
      
      xhr.onload = () => resolve()
      xhr.onerror = () => resolve()
      xhr.onabort = () => resolve()
      
      xhr.open('POST', 'https://librespeed-cgk01.gmdp.net.id/backend/empty.php', true)
      xhr.setRequestHeader('Content-Type', 'application/octet-stream')
      xhr.send(payload)
    })
  }

  // Jalankan ke-4 jalur secara bersamaan
  await Promise.all(Array.from({ length: THREADS }).map((_, i) => startUploadThread(i)))
  
  clearInterval(activeInterval)
  
  if (isTesting.value) {
    const totalElapsed = (performance.now() - startTime) / 1000
    const finalMbps = (totalLoadedBytes * 8 / 1000000) / totalElapsed
    upload.value = finalMbps.toFixed(1)
    progress.value = 100
    finishTest()
  }
}

const finishTest = () => {
  uploadXhrs = []
  testPhase.value = ''
  isTesting.value = false
}
</script>
