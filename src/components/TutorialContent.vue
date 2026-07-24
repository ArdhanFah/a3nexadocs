<template>
  <main class="max-w-3xl mx-auto px-6 pb-12 pt-28 md:pt-36">
    <!-- Premium Breadcrumb Navigation -->
    <nav class="mb-10 md:mb-12 relative z-10 flex items-center gap-3 text-sm font-medium">
      <router-link to="/tutorial" class="group flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.03] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.05]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Pilih Router
      </router-link>
      <span class="text-gray-400 dark:text-gray-600">/</span>
      <span class="text-primary-600 dark:text-primary-400 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]">{{ currentBrandName }}</span>
    </nav>

    <!-- Status Loading / Error -->
    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-500/10 border border-red-500/30 text-red-500 dark:text-red-400 px-6 py-4 rounded-xl text-center">
      <h3 class="font-bold mb-1">Terjadi Kesalahan</h3>
      <p>{{ error }}</p>
    </div>

    <!-- Konten Kustom (Rendered from MD) -->
    <div v-else>
      <div class="custom-md-container" v-html="htmlContent"></div>
      
      <!-- Call to Action Button at the bottom -->
      <div class="mt-20 pt-12 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col items-center text-center">
        <h3 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">Sudah Paham Langkahnya?</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">Jangan cuma dibaca, praktikkan sekarang! Sistem akan otomatis mengarahkan Anda ke IP bawaan router ini.</p>
        
        <button @click="openRouter" class="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary-600 to-purple-500 text-white font-bold text-base shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
          <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span class="relative z-10">Akses Halaman Router Asli</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { supabase, hasSupabaseConfig } from '../lib/supabaseClient'

const route = useRoute()
const htmlContent = ref('')
const loading = ref(true)
const error = ref(null)
const currentBrandName = ref('')

const openRouter = () => {
  let ip = 'http://192.168.1.1'
  const name = currentBrandName.value.toLowerCase()
  if (name.includes('tp-link')) {
    ip = 'http://192.168.0.1'
  }
  window.open(ip, '_blank', 'noopener,noreferrer')
}

const fetchMarkdown = async (brandId) => {
  loading.value = true
  error.value = null
  try {
    let rawMarkdown = ''

    if (hasSupabaseConfig) {
      try {
        const { data, error: sbError } = await supabase
          .from('tutorials')
          .select('content')
          .eq('slug', brandId)
          .single()
        
        if (sbError) throw sbError
        if (data && data.content) {
          rawMarkdown = data.content
        }
      } catch (dbErr) {
        console.warn("Gagal mengambil dari Supabase, mencoba file lokal...", dbErr)
      }
    }

    // Fallback if Supabase is not configured or fails
    if (!rawMarkdown) {
      const res = await fetch(`/content/${brandId}.md`)
      if (!res.ok) throw new Error('Panduan tidak ditemukan')
      rawMarkdown = await res.text()
    }

    // Konfigurasi Custom Renderer untuk Marked v18
    const renderer = new marked.Renderer()
    let stepCounter = 1

    renderer.heading = function (token) {
      const depth = token.depth
      const text = this.parser.parseInline(token.tokens)
      
      if (depth === 1) {
        stepCounter = 1; // Reset step counter
        return `
          <div class="mb-10 md:mb-16 text-center md:text-left">
            <h1 class="text-3xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-650 dark:from-white dark:to-gray-400 mb-6 leading-tight tracking-tight">${text}</h1>
          </div>
        `
      }
      if (depth === 2) {
        const html = `
          <div class="relative flex items-start gap-4 mb-3 mt-12 md:mt-16 group cursor-default">
            <div class="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-gray-100 dark:from-dark-800 dark:to-dark-900 border border-black/[0.06] dark:border-white/[0.08] flex shrink-0 items-center justify-center text-primary-600 dark:text-primary-400 font-black text-xl shadow-md group-hover:scale-110 group-hover:text-primary-550 dark:group-hover:text-primary-300 group-hover:border-primary-500/30 transition-all duration-300">
              ${stepCounter}
            </div>
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2 tracking-tight group-hover:text-primary-600 dark:group-hover:text-white transition-colors">${text}</h2>
          </div>
        `
        stepCounter++
        return html
      }
      return `<h${depth} class="text-lg md:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4 md:pl-16">${text}</h${depth}>`
    }

    renderer.paragraph = function (token) {
      const text = this.parser.parseInline(token.tokens)
      if (stepCounter === 1) {
        return `<p class="text-gray-500 dark:text-gray-400 text-base md:text-xl leading-relaxed mb-12 text-center md:text-left font-light max-w-2xl">${text}</p>`
      }
      return `
        <div class="relative">
          <div class="hidden md:block absolute left-6 top-0 bottom-[-2rem] w-px bg-gradient-to-b from-black/[0.06] dark:from-white/[0.08] to-transparent -z-10"></div>
          <p class="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-5 md:pl-16 font-light">${text}</p>
        </div>
      `
    }

    renderer.blockquote = function (token) {
      const text = this.parser.parse(token.tokens)
      return `
        <div class="relative mb-8 mt-2">
          <div class="hidden md:block absolute left-6 top-0 bottom-[-2rem] w-px bg-gradient-to-b from-black/[0.06] dark:from-white/[0.08] to-transparent -z-10"></div>
          <div class="md:ml-16 p-6 rounded-3xl bg-primary-500/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] shadow-sm dark:shadow-2xl backdrop-blur-sm relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-500 to-purple-600"></div>
            <div class="flex items-center gap-3 mb-3">
               <div class="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-600 dark:text-primary-400">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                 </svg>
               </div>
               <span class="text-sm font-bold text-gray-700 dark:text-gray-300 tracking-wide uppercase">Tips / Info</span>
            </div>
            <div class="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-light">${text}</div>
          </div>
        </div>
      `
    }

    renderer.code = function (token) {
      const text = token.text
      const lang = token.lang
      return `
        <div class="relative mb-8 mt-4">
          <div class="hidden md:block absolute left-6 top-0 bottom-[-2rem] w-px bg-gradient-to-b from-black/[0.06] dark:from-white/[0.08] to-transparent -z-10"></div>
          <div class="md:ml-16 bg-white dark:bg-[#0f0f13]/80 rounded-2xl overflow-hidden border border-black/[0.06] dark:border-white/[0.05] shadow-sm dark:shadow-2xl backdrop-blur-md">
            <div class="bg-black/[0.02] dark:bg-white/[0.02] px-4 py-3 border-b border-black/[0.05] dark:border-white/[0.05] flex items-center gap-2">
               <div class="flex gap-1.5">
                 <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
                 <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                 <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
               </div>
               <span class="ml-auto text-xs text-gray-400 dark:text-gray-500 font-mono tracking-wider">${lang || 'config'}</span>
            </div>
            <div class="p-5 text-sm font-mono text-primary-700 dark:text-primary-200 overflow-x-auto leading-relaxed">
              <pre><code>${text}</code></pre>
            </div>
          </div>
        </div>
      `
    }

    renderer.list = function (token) {
      const ordered = token.ordered
      const classes = ordered ? 'list-decimal marker:text-primary-500' : 'list-disc marker:text-primary-500'
      const tag = ordered ? 'ol' : 'ul'
      
      let body = ''
      for (let i = 0; i < token.items.length; i++) {
        body += this.listitem(token.items[i])
      }
      return `
        <div class="relative mb-8">
          <div class="hidden md:block absolute left-6 top-0 bottom-[-2rem] w-px bg-gradient-to-b from-black/[0.06] dark:from-white/[0.08] to-transparent -z-10"></div>
          <${tag} class="${classes} md:ml-16 pl-6 pr-4 text-gray-500 dark:text-gray-400 space-y-3 font-light">${body}</${tag}>
        </div>
      `
    }
    
    renderer.listitem = function (token) {
      const text = this.parser.parse(token.tokens)
      return `<li class="pl-2 leading-relaxed text-base">${text}</li>`
    }

    // Gunakan renderer khusus
    htmlContent.value = marked(rawMarkdown, { renderer })
    
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (route.params.brand) {
    currentBrandName.value = route.params.brand.toUpperCase()
  }
  fetchMarkdown(route.params.brand)
})

watch(() => route.params.brand, (newBrand) => {
  if (newBrand) {
    currentBrandName.value = newBrand.toUpperCase()
    fetchMarkdown(newBrand)
  }
})
</script>

<style>
.custom-md-container strong {
  @apply text-gray-900 dark:text-gray-200 font-semibold;
}
.custom-md-container a {
  @apply text-primary-600 dark:text-primary-400 underline underline-offset-2;
}
.custom-md-container a:hover {
  @apply text-primary-500 dark:text-primary-300;
}
.custom-md-container code:not(pre code) {
  @apply px-1.5 py-0.5 bg-black/5 dark:bg-dark-800 text-primary-600 dark:text-primary-400 rounded-md border border-black/10 dark:border-dark-700 font-mono text-sm;
}
</style>
