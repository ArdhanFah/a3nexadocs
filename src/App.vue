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
  <div class="min-h-screen flex flex-col bg-dark-900 font-sans selection:bg-primary-500/30 selection:text-white relative overflow-hidden">
    <!-- Mouse Follow Glow (Purple Emboss) -->
    <div 
      ref="cursorGlow"
      class="fixed top-0 left-0 w-[400px] h-[400px] bg-primary-500/15 rounded-full blur-[100px] pointer-events-none z-0 transition-transform duration-75 ease-out"
      style="transform: translate(-500px, -500px);"
    ></div>

    <!-- Purple Emboss / Glow Backgrounds -->
    <div class="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-600/15 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[150px] pointer-events-none"></div>

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
