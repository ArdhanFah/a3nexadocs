<script setup>
import { onMounted, ref } from 'vue'

const adContainer = ref(null)
const isVisible = ref(true)
const isMinimized = ref(false)
const isLoading = ref(true)

onMounted(() => {
  if (adContainer.value) {
    // Set atOptions on window so the script can read it
    window.atOptions = {
      'key' : '462ccf7d116df817d88b0a0b0752ed03',
      'format' : 'iframe',
      'height' : 250,
      'width' : 300,
      'params' : {}
    }

    // Set up MutationObserver to detect when the ad iframe is loaded/injected
    const observer = new MutationObserver(() => {
      const iframe = adContainer.value.querySelector('iframe')
      if (iframe) {
        isLoading.value = false
        observer.disconnect()
      }
    })
    observer.observe(adContainer.value, { childList: true, subtree: true })

    // Fallback: hide loading state after 8 seconds
    setTimeout(() => {
      isLoading.value = false
      observer.disconnect()
    }, 8000)

    // Load ad script after a short delay to prioritize main content loading
    setTimeout(() => {
      const script = document.createElement('script')
      script.src = 'https://www.highperformanceformat.com/462ccf7d116df817d88b0a0b0752ed03/invoke.js'
      script.async = true
      adContainer.value.appendChild(script)
    }, 600)
  }
})

const toggleAd = () => {
  isMinimized.value = !isMinimized.value
}
</script>

<template>
  <div 
    v-if="isVisible"
    class="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[50] flex flex-col items-end font-sans transition-all duration-300"
  >
    <!-- Minimized Trigger Badge -->
    <Transition name="fade-scale">
      <div 
        v-show="isMinimized"
        @click="toggleAd" 
        class="flex items-center gap-2.5 px-4 py-2.5 bg-[#0f0f13]/95 border border-primary-500/40 hover:border-primary-500/80 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer transition-all hover:scale-105 active:scale-95 group backdrop-blur-md"
      >
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
        </span>
        <span class="text-xs font-semibold text-white/90 group-hover:text-white transition-colors">Tampilkan Iklan</span>
        <span class="text-xs text-primary-300">▴</span>
      </div>
    </Transition>

    <!-- Expanded Ad Panel -->
    <Transition name="fade-scale">
      <div 
        v-show="!isMinimized"
        class="bg-[#0f0f13]/90 border border-white/[0.08] backdrop-blur-md rounded-2xl p-3 flex flex-col items-center shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
      >
        <!-- Header -->
        <div class="flex items-center justify-between w-[300px] mb-2.5 px-1">
          <div class="flex items-center gap-1.5">
            <span class="relative flex h-1.5 w-1.5">
              <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-500"></span>
            </span>
            <span class="text-[10px] text-gray-400 tracking-wider uppercase font-semibold">Iklan</span>
          </div>
          <button 
            @click="toggleAd" 
            class="text-gray-400 hover:text-white text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.1] px-2 py-0.5 rounded-md border border-white/[0.05] transition-all"
            title="Minimize"
          >
            Sembunyikan
          </button>
        </div>
        
        <!-- Ad Container Frame -->
        <div 
          ref="adContainer" 
          class="w-[300px] h-[250px] bg-[#050508]/90 border border-white/[0.04] rounded-xl flex items-center justify-center overflow-hidden relative shadow-inner"
        >
          <!-- Beautiful Skeleton Loader -->
          <div 
            v-if="isLoading" 
            class="absolute inset-0 flex flex-col items-center justify-center bg-[#0c0c12]/95 gap-3"
          >
            <!-- Spinning ring -->
            <div class="w-8 h-8 border-2 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
            <span class="text-xs text-gray-400 animate-pulse font-medium">Memuat Iklan...</span>
          </div>
          <!-- Iklan akan di-render di sini secara dinamis -->
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(12px);
}
</style>
