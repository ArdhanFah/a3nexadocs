<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <div class="w-full flex justify-center fixed top-4 md:top-8 z-50 px-4 pointer-events-none">
    <header class="relative pointer-events-auto flex flex-col px-2 py-2 bg-[#0b0b0f]/80 border border-white/[0.08] backdrop-blur-2xl rounded-[2rem] w-full max-w-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 group" :class="{ 'rounded-3xl': isMobileMenuOpen }">
      
      <!-- Top Bar -->
      <div class="flex items-center justify-between w-full">
        <!-- Logo Section -->
        <router-link to="/" class="flex items-center gap-3 pl-4 pr-4 py-2 rounded-full hover:bg-white/[0.04] transition-colors z-10">
          <div class="relative w-8 h-8 rounded-full bg-gradient-to-tr from-primary-600 to-purple-400 flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 bg-white/20 animate-pulse mix-blend-overlay"></div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span class="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight">docs</span>
        </router-link>

        <!-- Navigation Links (Absolute Centered for perfect precision) -->
        <nav class="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 px-4 py-1.5 bg-black/30 rounded-full border border-white/[0.03] shadow-inner shadow-black/50 z-10">
          <router-link to="/tutorial" class="px-4 py-1.5 rounded-full text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all">Panduan</router-link>
          <a href="#" class="px-4 py-1.5 rounded-full text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all">Kompatibilitas</a>
        </nav>

        <!-- Action Button / Mobile Hamburger -->
        <div class="pr-4 flex items-center z-10">
          <!-- Hamburger Menu -->
          <button @click="toggleMobileMenu" class="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none">
            <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <!-- Desktop Search/Action Icon -->
          <div class="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 hover:bg-primary-500 hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div v-show="isMobileMenuOpen" class="md:hidden flex flex-col w-full px-4 pt-4 pb-2 border-t border-white/[0.05] mt-2 gap-2">
        <router-link to="/tutorial" @click="isMobileMenuOpen = false" class="px-4 py-3 rounded-xl font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Panduan</router-link>
        <a href="#" @click="isMobileMenuOpen = false" class="px-4 py-3 rounded-xl font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors">Kompatibilitas</a>
      </div>

    </header>
  </div>
</template>
