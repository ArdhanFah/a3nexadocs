<template>
  <main class="max-w-4xl mx-auto px-6 pb-12 pt-28 md:pt-36">
    <div class="mb-12 text-center">
      <h1 class="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
        Pilih Merek Router Anda
      </h1>
      <p class="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
        Setiap router memiliki antarmuka admin yang sedikit berbeda. Silakan pilih merek router yang Anda gunakan untuk mendapatkan panduan yang sesuai.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-8 relative">
      
      <!-- TP-Link -->
      <router-link to="/tutorial/tp-link" class="group relative p-8 rounded-3xl bg-white/60 dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.05] hover:bg-white/90 dark:hover:bg-white/[0.04] hover:border-primary-500/30 transition-all duration-300 backdrop-blur-md overflow-hidden hover:-translate-y-2 shadow-sm dark:shadow-none">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-600/5 dark:from-primary-500/20 dark:to-primary-600/10 text-primary-600 dark:text-primary-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.05)] dark:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors tracking-tight">TP-Link</h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Router sejuta umat, sangat mudah diatur dan sering digunakan secara mandiri atau bawaan ISP.</p>
      </router-link>

      <!-- ZTE (IndiHome) -->
      <div @click="showZteMenu = true" class="group relative p-8 rounded-3xl bg-white/60 dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.05] hover:bg-white/90 dark:hover:bg-white/[0.04] hover:border-primary-500/30 transition-all duration-300 backdrop-blur-md overflow-hidden hover:-translate-y-2 md:translate-y-4 cursor-pointer shadow-sm dark:shadow-none">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-600/5 dark:from-primary-500/20 dark:to-primary-600/10 text-primary-600 dark:text-primary-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.05)] dark:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors tracking-tight">ZTE</h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Router tangguh bawaan default yang sering dipasang oleh penyedia layanan seperti IndiHome.</p>
        
        <!-- Badge sub-menu indikator -->
        <div class="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400 group-hover:bg-primary-500/20 group-hover:text-primary-350 dark:group-hover:text-primary-300 group-hover:border-primary-500/30 transition-colors">
          <span>Pilih Tipe</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <!-- Huawei -->
      <router-link to="/tutorial/huawei" class="group relative p-8 rounded-3xl bg-white/60 dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.05] hover:bg-white/90 dark:hover:bg-white/[0.04] hover:border-primary-500/30 transition-all duration-300 backdrop-blur-md overflow-hidden hover:-translate-y-2 md:translate-y-4 lg:translate-y-0 shadow-sm dark:shadow-none">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-600/5 dark:from-primary-500/20 dark:to-primary-600/10 text-primary-600 dark:text-primary-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.05)] dark:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors tracking-tight">Huawei</h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Router cerdas yang banyak digunakan oleh provider internet fiber optik dan broadband modern.</p>
      </router-link>

      <!-- Tenda -->
      <router-link to="/tutorial/tenda" class="group relative p-8 rounded-3xl bg-white/60 dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.05] hover:bg-white/90 dark:hover:bg-white/[0.04] hover:border-primary-500/30 transition-all duration-300 backdrop-blur-md overflow-hidden hover:-translate-y-2 md:translate-y-0 lg:translate-y-4 shadow-sm dark:shadow-none">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-600/5 dark:from-primary-500/20 dark:to-primary-600/10 text-primary-600 dark:text-primary-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.05)] dark:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors tracking-tight">Tenda</h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Alternatif populer dengan jangkauan luas untuk memperkuat sinyal WiFi rumahan Anda.</p>
      </router-link>

      <!-- Fiberhome -->
      <router-link to="/tutorial/fiberhome" class="group relative p-8 rounded-3xl bg-white/60 dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.05] hover:bg-white/90 dark:hover:bg-white/[0.04] hover:border-primary-500/30 transition-all duration-300 backdrop-blur-md overflow-hidden hover:-translate-y-2 md:translate-y-4 lg:translate-y-8 shadow-sm dark:shadow-none">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-600/5 dark:from-primary-500/20 dark:to-primary-600/10 text-primary-600 dark:text-primary-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.05)] dark:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors tracking-tight">Fiberhome</h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Router handal yang banyak disediakan oleh ISP fiber optic terbaru dengan performa stabil.</p>
      </router-link>

      <!-- Totolink -->
      <div @click="showTotolinkMenu = true" class="group relative p-8 rounded-3xl bg-white/60 dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.05] hover:bg-white/90 dark:hover:bg-white/[0.04] hover:border-primary-500/30 transition-all duration-300 backdrop-blur-md overflow-hidden hover:-translate-y-2 md:translate-y-0 lg:translate-y-0 cursor-pointer shadow-sm dark:shadow-none">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-600/5 dark:from-primary-500/20 dark:to-primary-600/10 text-primary-600 dark:text-primary-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.05)] dark:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors tracking-tight">Totolink</h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Router populer dengan desain kompak namun jangkauan sinyal sangat optimal.</p>
        
        <!-- Badge sub-menu indikator -->
        <div class="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400 group-hover:bg-primary-500/20 group-hover:text-primary-350 dark:group-hover:text-primary-300 group-hover:border-primary-500/30 transition-colors">
          <span>Pilih Tipe</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
    </div>

    <!-- ZTE Sub-menu Modal -->
    <div v-if="showZteMenu" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-[#0b0b0f]/80 backdrop-blur-sm" @click.self="showZteMenu = false">
      <div class="bg-white dark:bg-dark-900 border border-black/10 dark:border-white/[0.1] rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative animate-fade-in">
        <button @click="showZteMenu = false" class="absolute top-5 right-5 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors bg-black/5 dark:bg-white/5 rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Pilih Tipe ZTE</h3>
        <div class="space-y-4">
          <router-link to="/tutorial/zte-f609" class="block p-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.05] bg-black/[0.01] dark:bg-white/[0.02] hover:bg-primary-500/10 hover:border-primary-500/30 transition-all group">
             <div class="flex items-center justify-between mb-1">
               <div class="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">ZTE F609</div>
               <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
               </svg>
             </div>
             <div class="text-sm text-gray-500 dark:text-gray-400">Versi klasik (1 Antena / Umum)</div>
          </router-link>
          <router-link to="/tutorial/zte-f670l" class="block p-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.05] bg-black/[0.01] dark:bg-white/[0.02] hover:bg-primary-500/10 hover:border-primary-500/30 transition-all group">
             <div class="flex items-center justify-between mb-1">
               <div class="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">ZTE F670L</div>
               <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
               </svg>
             </div>
             <div class="text-sm text-gray-500 dark:text-gray-400">Versi modern (Dual Band)</div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Totolink Sub-menu Modal -->
    <div v-if="showTotolinkMenu" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-[#0b0b0f]/80 backdrop-blur-sm" @click.self="showTotolinkMenu = false">
      <div class="bg-white dark:bg-dark-900 border border-black/10 dark:border-white/[0.1] rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative animate-fade-in">
        <button @click="showTotolinkMenu = false" class="absolute top-5 right-5 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors bg-black/5 dark:bg-white/5 rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Pilih Tipe Totolink</h3>
        <div class="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <router-link to="/tutorial/totolink-n200re-v4" class="block p-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.05] bg-black/[0.01] dark:bg-white/[0.02] hover:bg-primary-500/10 hover:border-primary-500/30 transition-all group">
             <div class="flex items-center justify-between mb-1">
               <div class="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">N200RE v4</div>
               <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
               </svg>
             </div>
             <div class="text-sm text-gray-500 dark:text-gray-400">Hardware Versi 4</div>
          </router-link>
          <router-link to="/tutorial/totolink-n200re-v5" class="block p-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.05] bg-black/[0.01] dark:bg-white/[0.02] hover:bg-primary-500/10 hover:border-primary-500/30 transition-all group">
             <div class="flex items-center justify-between mb-1">
               <div class="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">N200RE v5</div>
               <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
               </svg>
             </div>
             <div class="text-sm text-gray-500 dark:text-gray-400">Hardware Versi 5</div>
          </router-link>
          <router-link to="/tutorial/totolink-n300rt" class="block p-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.05] bg-black/[0.01] dark:bg-white/[0.02] hover:bg-primary-500/10 hover:border-primary-500/30 transition-all group">
             <div class="flex items-center justify-between mb-1">
               <div class="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">N300RT</div>
               <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
               </svg>
             </div>
             <div class="text-sm text-gray-500 dark:text-gray-400">Seri N300RT</div>
          </router-link>
          <router-link to="/tutorial/totolink-n355rt" class="block p-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.05] bg-black/[0.01] dark:bg-white/[0.02] hover:bg-primary-500/10 hover:border-primary-500/30 transition-all group">
             <div class="flex items-center justify-between mb-1">
               <div class="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">N355RT</div>
               <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
               </svg>
             </div>
             <div class="text-sm text-gray-500 dark:text-gray-400">Seri N355RT</div>
          </router-link>
        </div>
      </div>
    </div>

  </main>
</template>

<script setup>
import { ref } from 'vue'

const showZteMenu = ref(false)
const showTotolinkMenu = ref(false)
</script>
