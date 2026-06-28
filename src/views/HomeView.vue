<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isNavigating = ref(false)

const triggerNavigation = (e, targetPath) => {
  e.preventDefault()
  isNavigating.value = true
  
  // Tunggu 2 detik penuh sambil memutar animasi loading WiFi
  setTimeout(() => {
    isNavigating.value = false
    if (targetPath.startsWith('#')) {
      window.location.hash = targetPath
    } else {
      router.push(targetPath)
    }
  }, 2000)
}
</script>

<template>
  <main class="w-full relative overflow-hidden flex flex-col items-center justify-center min-h-[90vh] pt-24 md:pt-32">
    
    <!-- Loading WiFi Overlay -->
    <Teleport to="body">
      <Transition name="fade-loading">
        <div v-if="isNavigating" class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0b0b0f]/60 backdrop-blur-xl">
          <!-- Purple Glow -->
          <div class="absolute inset-0 bg-primary-600/20 mix-blend-screen animate-pulse" style="animation-duration: 2s;"></div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary-500/30 rounded-full blur-[80px] pointer-events-none"></div>
          
          <!-- WiFi Icon Animation -->
          <div class="relative z-10 flex flex-col items-center gap-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="w-24 h-24 text-primary-400 filter drop-shadow-[0_0_15px_rgba(167,139,250,0.8)]">
              <!-- Dot -->
              <circle cx="12" cy="20" r="2" fill="currentColor" class="animate-pulse" />
              <!-- Arc 1 (Weak) -->
              <path d="M8.5 16.5a5 5 0 017 0" stroke-width="2.5" class="animate-wifi-1" />
              <!-- Arc 2 (Medium) -->
              <path d="M5 13a10 10 0 0114 0" stroke-width="2.5" class="animate-wifi-2" />
              <!-- Arc 3 (Strong) -->
              <path d="M2 9.5a15 15 0 0120 0" stroke-width="2.5" class="animate-wifi-3" />
            </svg>
            <span class="text-white font-semibold tracking-widest uppercase text-sm animate-pulse">Menghubungkan...</span>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Animated Background Orbs -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[1200px] mix-blend-screen pointer-events-none animate-pulse" style="background: radial-gradient(closest-side circle at 50% 30%, rgba(139,92,246,0.15) 0%, transparent 100%); animation-duration: 8s;"></div>
    <div class="absolute bottom-0 left-0 w-[100vw] h-[1000px] mix-blend-screen pointer-events-none" style="background: radial-gradient(closest-side circle at 30% 70%, rgba(147,51,234,0.1) 0%, transparent 100%);"></div>

    <div class="max-w-5xl mx-auto px-6 py-20 text-center relative z-10 w-full">
      
      <!-- Hero Section -->
      <div class="mb-24 mt-12 flex flex-col items-center">
        
        <!-- Glowing Pill -->
        <div class="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/[0.1] shadow-[0_0_30px_rgba(139,92,246,0.15)] mb-10 backdrop-blur-md">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
          </span>
          <span class="text-sm font-semibold text-gray-300 tracking-widest uppercase">Dokumentasi V2.0</span>
        </div>
        
        <!-- Massive Heading -->
        <h1 class="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 mb-8 leading-[1.1] tracking-tighter drop-shadow-2xl">
          Pusat Bantuan <br/> 
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-purple-400 to-primary-600 animate-gradient-x">Keamanan Jaringan</span>
        </h1>
        
        <p class="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 font-light">
          Panduan komprehensif untuk mengonfigurasi dan mengamankan router WiFi Anda. Dirancang untuk efisiensi, kecepatan, dan kemudahan akses tingkat lanjut.
        </p>
        
        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button @click="triggerNavigation($event, '/tutorial')" class="group relative px-8 py-4 bg-primary-600 rounded-2xl font-bold text-white shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:shadow-[0_0_60px_rgba(139,92,246,0.6)] transition-all duration-300 hover:-translate-y-1 overflow-hidden flex items-center gap-3">
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span class="relative z-10 text-lg">Baca Dokumentasi</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 relative z-10 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <button @click="triggerNavigation($event, '#features')" class="px-8 py-4 bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/[0.1] rounded-2xl font-bold transition-all duration-300 backdrop-blur-md hover:-translate-y-1 text-lg">
            Jelajahi Fitur
          </button>
        </div>
      </div>

      <!-- Features Glass Grid -->
      <div id="features" class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-32 relative">
        <!-- Feature 1 -->
        <div class="group relative p-8 rounded-[2rem] bg-dark-800/40 border border-white/[0.05] hover:border-primary-500/50 transition-all duration-500 backdrop-blur-xl overflow-hidden hover:-translate-y-2">
          <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-transparent border border-primary-500/30 text-primary-400 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 class="relative z-10 text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-primary-300 transition-colors">Keamanan Penuh</h3>
          <p class="relative z-10 text-gray-400 text-base leading-relaxed font-light">
            Pelajari protokol terbaik untuk membentengi jaringan Anda dari akses tidak sah dengan arsitektur sandi yang kuat.
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="group relative p-8 rounded-[2rem] bg-dark-800/40 border border-white/[0.05] hover:border-primary-500/50 transition-all duration-500 backdrop-blur-xl overflow-hidden hover:-translate-y-2 md:translate-y-6">
          <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-transparent border border-primary-500/30 text-primary-400 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="relative z-10 text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-primary-300 transition-colors">Akses Instan</h3>
          <p class="relative z-10 text-gray-400 text-base leading-relaxed font-light">
            Instruksi dirancang dengan alur yang sangat efisien. Langsung ke inti permasalahan tanpa basa-basi teknis yang rumit.
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="group relative p-8 rounded-[2rem] bg-dark-800/40 border border-white/[0.05] hover:border-primary-500/50 transition-all duration-500 backdrop-blur-xl overflow-hidden hover:-translate-y-2">
          <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-transparent border border-primary-500/30 text-primary-400 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h3 class="relative z-10 text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-primary-300 transition-colors">Skala Universal</h3>
          <p class="relative z-10 text-gray-400 text-base leading-relaxed font-light">
            Database konfigurasi yang mendukung sebagian besar router modern dan infrastruktur jaringan fiber optik terkini.
          </p>
        </div>
      </div>
      
    </div>
  </main>
</template>

<style>
/* WiFi Loading Animations */
.animate-wifi-1 {
  animation: wifi-pulse 1.5s infinite;
  animation-delay: 0.2s;
}
.animate-wifi-2 {
  animation: wifi-pulse 1.5s infinite;
  animation-delay: 0.4s;
}
.animate-wifi-3 {
  animation: wifi-pulse 1.5s infinite;
  animation-delay: 0.6s;
}

@keyframes wifi-pulse {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}

/* Fade Transition for the Overlay */
.fade-loading-enter-active,
.fade-loading-leave-active {
  transition: opacity 0.5s ease;
}
.fade-loading-enter-from,
.fade-loading-leave-to {
  opacity: 0;
}
</style>
