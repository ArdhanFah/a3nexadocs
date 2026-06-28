<template>
  <Teleport to="body">
    <Transition name="simulator-fade">
      <div v-if="isOpen" class="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0b0b0f]/80 backdrop-blur-xl p-4 md:p-10">
        
        <!-- Modal Container (Browser Window) -->
        <div class="relative w-full max-w-5xl h-[85vh] bg-[#121218] rounded-3xl border border-white/[0.08] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
          
          <!-- Top Bar (Browser Mockup) -->
          <div class="h-14 bg-[#1a1a24] border-b border-white/[0.05] flex items-center px-4 gap-4 shrink-0">
            <!-- Window Controls -->
            <div class="flex gap-2">
              <button @click="close" class="w-3.5 h-3.5 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors shadow-[0_0_10px_rgba(239,68,68,0.4)]"></button>
              <div class="w-3.5 h-3.5 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.4)]"></div>
              <div class="w-3.5 h-3.5 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
            </div>
            
            <!-- Address Bar -->
            <div class="flex-grow max-w-2xl mx-auto h-8 bg-black/40 rounded-md border border-white/[0.05] flex items-center px-3 gap-2 group focus-within:ring-1 focus-within:ring-primary-500/50">
              <svg v-if="!iframeLoading" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 group-focus-within:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div v-else class="h-4 w-4 rounded-full border-2 border-gray-500 border-t-primary-400 animate-spin shrink-0"></div>
              <form @submit.prevent="updateUrl" class="w-full">
                <input type="text" v-model="addressBar" class="w-full bg-transparent text-xs text-gray-300 font-mono tracking-wide outline-none" spellcheck="false" />
              </form>
            </div>

            <button @click="reloadIframe" class="hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Reload">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button @click="openRealRouter" class="hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-primary-600/20 text-primary-400 hover:bg-primary-600 hover:text-white transition-all border border-primary-500/30" title="Buka di Tab Baru">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>

          <!-- Iframe Content -->
          <div class="flex-grow bg-[#f4f6f8] relative">
            <div v-if="iframeLoading" class="absolute inset-0 flex flex-col items-center pt-20 pointer-events-none z-10">
              <p class="text-sm font-medium text-gray-500 bg-white/80 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm animate-pulse">Menghubungkan ke jaringan router...</p>
            </div>
            <iframe 
              ref="routerIframe"
              :src="currentUrl" 
              class="w-full h-full border-none bg-white"
              @load="onIframeLoad"
            ></iframe>
          </div>
          
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  brandName: {
    type: String,
    default: 'Router'
  }
})

const emit = defineEmits(['close'])

const defaultIp = 'http://192.168.1.1'
const addressBar = ref(defaultIp)
const currentUrl = ref(defaultIp)
const iframeLoading = ref(true)
const routerIframe = ref(null)

const updateUrl = () => {
  let url = addressBar.value.trim()
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'http://' + url
    addressBar.value = url
  }
  iframeLoading.value = true
  currentUrl.value = url
  
  // Fallback timeout to stop loading animation after 5 seconds
  setTimeout(() => {
    iframeLoading.value = false
  }, 5000)
}

const reloadIframe = () => {
  iframeLoading.value = true
  const iframe = routerIframe.value
  if (iframe) {
    iframe.src = iframe.src
  }
  setTimeout(() => {
    iframeLoading.value = false
  }, 5000)
}

const onIframeLoad = () => {
  iframeLoading.value = false
}

const close = () => {
  emit('close')
}

const openRealRouter = () => {
  window.open(currentUrl.value, '_blank', 'noopener,noreferrer')
}

// Set router IP based on brand (optional heuristic)
watch(() => props.brandName, (newBrand) => {
  const name = newBrand.toLowerCase()
  if (name.includes('zte') || name.includes('huawei')) {
    addressBar.value = 'http://192.168.1.1'
  } else if (name.includes('tp-link')) {
    addressBar.value = 'http://192.168.0.1'
  } else {
    addressBar.value = 'http://192.168.1.1'
  }
  currentUrl.value = addressBar.value
})

// Lock body scroll when modal is open
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
    iframeLoading.value = true // Reset loading state when opened
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.simulator-fade-enter-active,
.simulator-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.simulator-fade-enter-from,
.simulator-fade-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}
</style>
