<script setup>
import { onMounted, ref } from 'vue'

const adContainer = ref(null)
const isVisible = ref(true)

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

    // Create script element
    const script = document.createElement('script')
    script.src = 'https://www.highperformanceformat.com/462ccf7d116df817d88b0a0b0752ed03/invoke.js'
    script.async = true
    
    // Append to ad container
    adContainer.value.appendChild(script)
  }
})

const isMinimized = ref(false)
const toggleAd = () => {
  isMinimized.value = !isMinimized.value
}
</script>

<template>
  <Transition name="fade-ad">
    <div 
      v-if="isVisible"
      class="z-[40] my-12 flex flex-col items-center justify-center relative xl:fixed xl:bottom-8 xl:right-8 xl:my-0 xl:items-start"
    >
      <!-- When minimized, show a tiny bar -->
      <div v-if="isMinimized" class="w-[120px] h-[30px] bg-[#0c0c12]/80 border border-white/[0.06] rounded-md flex items-center justify-between px-2 text-xs text-gray-300 cursor-pointer" @click="toggleAd">
        <span>Ad (minimized)</span>
        <span class="font-bold">▴</span>
      </div>

      <!-- Full ad when not minimized -->
      <div v-else class="flex flex-col items-center">
        <!-- Label & Minimize Button Container -->
        <div class="flex items-center justify-between w-[300px] mb-2 px-1">
          <span class="text-[9px] text-gray-500 tracking-widest uppercase font-semibold">Sponsorship</span>
          <button 
            @click="toggleAd" 
            class="text-gray-500 hover:text-white text-[11px] font-bold bg-white/[0.04] hover:bg-white/[0.1] px-2 py-0.5 rounded-md border border-white/[0.05] transition-all"
            title="Minimize Iklan"
          >
            –
          </button>
        </div>
        
        <!-- Ad Container Frame -->
        <div 
          ref="adContainer" 
          class="w-[300px] h-[250px] bg-[#0c0c12]/80 border border-white/[0.06] backdrop-blur-md rounded-2xl flex items-center justify-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative"
        >
          <!-- Iklan akan di-render di sini secara dinamis -->
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-ad-leave-active {
  transition: all 0.3s ease;
}
.fade-ad-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}
</style>
