<template>
  <main class="max-w-4xl mx-auto px-6 py-20 text-center">
    <!-- Hero Section -->
    <div class="mb-16">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-semibold tracking-wide mb-8">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
        </span>
        Selamat Datang di Docs
      </div>
      <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
        Pusat Dokumentasi <br/> 
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Jaringan & Keamanan</span>
      </h1>
      <p class="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
        Website ini didedikasikan untuk membantu Anda mengelola jaringan WiFi dan perangkat router Anda dengan mudah. Temukan panduan langkah demi langkah yang aman, cepat, dan mudah dipahami.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <router-link to="/tutorial" class="px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/25 transition-all active:scale-95 flex items-center gap-2">
          Baca Dokumentasi
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </router-link>
        <a href="#features" class="px-8 py-3 bg-dark-800 hover:bg-dark-700 text-gray-300 border border-dark-700 rounded-xl font-semibold transition-all">
          Lihat Daftar Router
        </a>
      </div>
    </div>

    <!-- Features Section -->
    <div id="features" class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-24">
      <div class="p-6 rounded-2xl bg-dark-800/50 border border-dark-700 hover:border-primary-500/30 transition-colors">
        <div class="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-400 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Keamanan Jaringan</h3>
        <p class="text-gray-400 text-sm leading-relaxed">
          Pelajari cara terbaik untuk mengamankan jaringan Anda dari akses yang tidak sah dengan mengubah kata sandi secara rutin.
        </p>
      </div>

      <div class="p-6 rounded-2xl bg-dark-800/50 border border-dark-700 hover:border-primary-500/30 transition-colors">
        <div class="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-400 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Cepat & Mudah</h3>
        <p class="text-gray-400 text-sm leading-relaxed">
          Tutorial dirancang dengan langkah-langkah yang terstruktur agar siapa pun dapat mengikutinya tanpa harus ahli IT.
        </p>
      </div>

      <div class="p-6 rounded-2xl bg-dark-800/50 border border-dark-700 hover:border-primary-500/30 transition-colors">
        <div class="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-400 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Dukungan Berbagai Router</h3>
        <p class="text-gray-400 text-sm leading-relaxed">
          Panduan yang tersedia dapat diterapkan untuk berbagai macam merek dan tipe router yang umum digunakan.
        </p>
      </div>
    </div>
  </main>
</template>
