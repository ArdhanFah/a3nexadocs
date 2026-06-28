<script setup>
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const cursorGlow = ref(null)

onMounted(() => {
  window.addEventListener('mousemove', (e) => {
    if (cursorGlow.value) {
      cursorGlow.value.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`
    }
  })
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#0b0b0f] font-sans selection:bg-primary-500/30 selection:text-white relative overflow-hidden">
    
    <!-- Subtle Dot Grid Background -->
    <div class="absolute inset-0 z-0 opacity-[0.15]" style="background-image: radial-gradient(#a78bfa 1px, transparent 1px); background-size: 32px 32px;"></div>

    <!-- Mouse Follow Glow (Purple Emboss) -->
    <div 
      ref="cursorGlow"
      class="fixed top-0 left-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none z-0 transition-transform duration-100 ease-out mix-blend-screen"
      style="transform: translate(-500px, -500px);"
    ></div>

    <!-- Purple Emboss / Glow Backgrounds -->
    <div class="absolute top-0 right-0 w-[80vw] max-w-[800px] h-[80vh] pointer-events-none mix-blend-screen" style="background: radial-gradient(closest-side circle at 80% 20%, rgba(139,92,246,0.08) 0%, transparent 100%);"></div>
    <div class="absolute bottom-0 left-0 w-[100vw] h-[100vh] pointer-events-none mix-blend-screen" style="background: radial-gradient(closest-side circle at 20% 80%, rgba(76,29,149,0.15) 0%, transparent 100%);"></div>

    <Header />
    <div class="flex-grow relative z-10">
      <router-view></router-view>
    </div>
    <Footer class="relative z-10" />
  </div>
</template>

<style>
@keyframes shoot-right {
  0% { transform: translateX(-100vw); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100vw); opacity: 0; }
}
@keyframes shoot-left {
  0% { transform: translateX(100vw); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(-100vw); opacity: 0; }
}
@keyframes shoot-down {
  0% { transform: translateY(-100vh); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}
@keyframes shoot-up {
  0% { transform: translateY(100vh); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(-100vh); opacity: 0; }
}

/* Any global specific overrides can go here, but mostly handled by tailwind */
</style>
