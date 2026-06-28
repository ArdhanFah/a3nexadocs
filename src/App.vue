<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const cursorGlow = ref(null)

const handleMouseMove = (e) => {
  if (cursorGlow.value) {
    // Centering the glow on the mouse pointer
    cursorGlow.value.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`
  }
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
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
    <div class="absolute top-[10%] left-[80%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-primary-600/10 rounded-[100%] blur-[120px] pointer-events-none -rotate-45"></div>
    <div class="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#4c1d95]/20 rounded-[100%] blur-[150px] pointer-events-none"></div>

    <Header class="relative z-10" />
    <div class="flex-grow relative z-10">
      <router-view></router-view>
    </div>
    <Footer class="relative z-10" />
  </div>
</template>

<style>
/* Any global specific overrides can go here, but mostly handled by tailwind */
</style>
