<template>
  <main class="max-w-4xl mx-auto px-6 pb-12 pt-28 md:pt-36">
    <div class="mb-12 text-center">
      <h1 class="text-3xl md:text-5xl font-extrabold text-white mb-4">
        Pilih Merek Router Anda
      </h1>
      <p class="text-gray-400 text-lg max-w-xl mx-auto">
        Setiap router memiliki antarmuka admin yang sedikit berbeda. Silakan pilih merek router yang Anda gunakan untuk mendapatkan panduan yang sesuai.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-8 relative">
      
      <!-- TP-Link -->
      <router-link to="/tutorial/tp-link" class="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-primary-500/30 transition-all duration-300 backdrop-blur-md overflow-hidden hover:-translate-y-2">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 text-primary-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.1)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors tracking-tight">TP-Link</h3>
        <p class="text-gray-400 text-sm leading-relaxed">Router sejuta umat, sangat mudah diatur dan sering digunakan secara mandiri atau bawaan ISP.</p>
      </router-link>

      <!-- ZTE (IndiHome) -->
      <router-link to="/tutorial/zte" class="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-primary-500/30 transition-all duration-300 backdrop-blur-md overflow-hidden hover:-translate-y-2 md:translate-y-4">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 text-primary-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.1)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors tracking-tight">ZTE</h3>
        <p class="text-gray-400 text-sm leading-relaxed">Router tangguh bawaan default yang sering dipasang oleh penyedia layanan seperti IndiHome.</p>
      </router-link>

      <!-- Huawei -->
      <router-link to="/tutorial/huawei" class="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-primary-500/30 transition-all duration-300 backdrop-blur-md overflow-hidden hover:-translate-y-2 lg:translate-y-8">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 text-primary-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.1)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors tracking-tight">Huawei</h3>
        <p class="text-gray-400 text-sm leading-relaxed">Router cerdas yang banyak digunakan oleh provider internet fiber optik dan broadband modern.</p>
      </router-link>

      <!-- Tenda -->
      <router-link to="/tutorial/tenda" class="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-primary-500/30 transition-all duration-300 backdrop-blur-md overflow-hidden hover:-translate-y-2 md:translate-y-4 lg:translate-y-0">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 text-primary-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.1)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors tracking-tight">Tenda</h3>
        <p class="text-gray-400 text-sm leading-relaxed">Alternatif populer dengan jangkauan luas untuk memperkuat sinyal WiFi rumahan Anda.</p>
      </router-link>
      
    </div>
  </main>
</template>

<script setup>
</script>
