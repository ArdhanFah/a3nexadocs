<template>
  <main class="max-w-5xl mx-auto px-6 pb-12 pt-28 md:pt-36">
    <div class="mb-12 text-center">
      <h1 class="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
        Blog Jaringan & Tips WiFi
      </h1>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">
        Kumpulan artikel edukatif, panduan praktis, dan tips seputar dunia jaringan komputer dan optimasi Wi-Fi rumah Anda.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-xl text-center">
      <h3 class="font-bold mb-1">Gagal Memuat Blog</h3>
      <p>{{ error }}</p>
    </div>

    <!-- Blog Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <router-link 
        v-for="post in posts" 
        :key="post.slug" 
        :to="'/blog/' + post.slug"
        class="group relative p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-primary-500/30 transition-all duration-300 backdrop-blur-md overflow-hidden hover:-translate-y-1.5 flex flex-col justify-between"
      >
        <!-- Background Gradient glow on hover -->
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <div>
          <!-- Meta Header (Tag and Read Time) -->
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/10 text-primary-400 border border-primary-500/20">
              {{ post.tag }}
            </span>
            <span class="text-xs text-gray-500 font-medium">
              {{ post.readTime }}
            </span>
          </div>

          <!-- Title -->
          <h3 class="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors tracking-tight leading-snug">
            {{ post.title }}
          </h3>

          <!-- Summary -->
          <p class="text-gray-400 text-sm leading-relaxed mb-6 font-light">
            {{ post.summary }}
          </p>
        </div>

        <!-- Footer Meta (Date and Link) -->
        <div class="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.04]">
          <span class="text-xs text-gray-500 font-medium">
            {{ post.date }}
          </span>
          <span class="text-xs font-bold text-primary-400 group-hover:text-primary-300 flex items-center gap-1 transition-colors">
            Baca Selengkapnya
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2..5" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </router-link>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('/content/blog/posts.json')
    if (!res.ok) throw new Error('Daftar artikel tidak dapat ditemukan.')
    posts.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
