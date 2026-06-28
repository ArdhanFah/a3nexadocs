<template>
  <div class="w-full flex justify-center fixed top-4 md:top-8 z-50 px-4 pointer-events-none">
    <header class="pointer-events-auto flex items-center justify-between px-2 py-2 bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl rounded-[2rem] w-full max-w-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 hover:bg-white/[0.05] hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.15)] group">
      
      <!-- Logo Section -->
      <router-link to="/" class="flex items-center gap-3 pl-3 pr-4 py-2 rounded-full hover:bg-white/[0.04] transition-colors">
        <div class="relative w-8 h-8 rounded-full bg-gradient-to-tr from-primary-600 to-purple-400 flex items-center justify-center overflow-hidden">
          <div class="absolute inset-0 bg-white/20 animate-pulse mix-blend-overlay"></div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span class="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight">docs</span>
      </router-link>

      <!-- Navigation Links -->
      <nav class="hidden md:flex items-center gap-1 px-4 py-1.5 bg-dark-900/50 rounded-full border border-white/[0.03]">
        <router-link to="/tutorial" class="px-4 py-1.5 rounded-full text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all">Panduan</router-link>
        <a href="#" class="px-4 py-1.5 rounded-full text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all">Kompatibilitas</a>
      </nav>

      <!-- Action Button -->
      <div class="pr-2 flex items-center">
        <button class="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div class="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 hover:bg-primary-500 hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

    </header>
  </div>
  <!-- Spacer to prevent content from hiding behind floating header -->
  <div class="h-24 md:h-32 w-full"></div>
</template>
