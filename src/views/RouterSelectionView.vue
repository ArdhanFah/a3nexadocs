<template>
  <main class="max-w-4xl mx-auto px-6 py-12">
    <div class="mb-12 text-center">
      <h1 class="text-3xl md:text-5xl font-extrabold text-white mb-4">
        Pilih Merek Router Anda
      </h1>
      <p class="text-gray-400 text-lg max-w-xl mx-auto">
        Setiap router memiliki antarmuka admin yang sedikit berbeda. Silakan pilih merek router yang Anda gunakan untuk mendapatkan panduan yang sesuai.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <!-- TP-Link -->
      <router-link to="/tutorial/tp-link" class="group block p-6 rounded-2xl bg-dark-800/80 border border-dark-700 hover:border-primary-500/50 hover:bg-dark-800 transition-all cursor-pointer">
        <div class="w-16 h-16 rounded-2xl bg-primary-500/10 text-primary-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">TP-Link</h3>
        <p class="text-gray-400 text-sm">Router sejuta umat, sering digunakan secara mandiri atau bawaan ISP.</p>
      </router-link>

      <!-- ZTE (IndiHome) -->
      <router-link to="/tutorial/zte" class="group block p-6 rounded-2xl bg-dark-800/80 border border-dark-700 hover:border-primary-500/50 hover:bg-dark-800 transition-all cursor-pointer">
        <div class="w-16 h-16 rounded-2xl bg-primary-500/10 text-primary-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">ZTE (IndiHome)</h3>
        <p class="text-gray-400 text-sm">Router bawaan default yang sering dipasang oleh ISP seperti IndiHome.</p>
      </router-link>

      <!-- Huawei -->
      <router-link to="/tutorial/huawei" class="group block p-6 rounded-2xl bg-dark-800/80 border border-dark-700 hover:border-primary-500/50 hover:bg-dark-800 transition-all cursor-pointer">
        <div class="w-16 h-16 rounded-2xl bg-primary-500/10 text-primary-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">Huawei</h3>
        <p class="text-gray-400 text-sm">Banyak digunakan oleh provider internet fiber optik dan broadband modern.</p>
      </router-link>

      <!-- Tenda -->
      <router-link to="/tutorial/tenda" class="group block p-6 rounded-2xl bg-dark-800/80 border border-dark-700 hover:border-primary-500/50 hover:bg-dark-800 transition-all cursor-pointer">
        <div class="w-16 h-16 rounded-2xl bg-primary-500/10 text-primary-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">Tenda</h3>
        <p class="text-gray-400 text-sm">Router murah meriah namun andal yang banyak dipakai pengguna rumahan.</p>
      </router-link>
      
    </div>
  </main>
</template>

<script setup>
</script>
