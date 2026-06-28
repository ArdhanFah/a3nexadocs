<template>
  <header class="w-full border-b border-dark-700 bg-dark-900/80 backdrop-blur-md sticky top-0 z-50">
    <div class="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        </div>
        <span class="font-bold text-xl text-white tracking-tight">Docs</span>
      </router-link>
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
        <router-link to="/tutorial" class="hover:text-primary-400 transition-colors">Tutorials</router-link>
        <a href="#" class="hover:text-primary-400 transition-colors">Supported Routers</a>
        <a href="#" class="hover:text-primary-400 transition-colors">FAQ</a>
      </nav>
      <button class="md:hidden text-gray-400 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup>
</script>
