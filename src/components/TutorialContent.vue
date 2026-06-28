<template>
  <main class="max-w-3xl mx-auto px-6 py-12">
    <!-- Tombol Kembali -->
    <div class="mb-8">
      <router-link to="/tutorial" class="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors text-sm font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Pilihan Router
      </router-link>
    </div>

    <!-- Status Loading / Error -->
    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-xl text-center">
      <h3 class="font-bold mb-1">Terjadi Kesalahan</h3>
      <p>{{ error }}</p>
    </div>

    <!-- Konten Kustom (Rendered from MD) -->
    <div v-else class="custom-md-container" v-html="htmlContent">
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'

const route = useRoute()
const htmlContent = ref('')
const loading = ref(true)
const error = ref(null)

const fetchMarkdown = async (brandId) => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch(`/content/${brandId}.md`)
    
    if (!response.ok) {
      throw new Error(`Panduan untuk router ${brandId} belum tersedia.`)
    }
    
    const markdownText = await response.text()
    
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
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              Tutorial Panduan
            </div>
            <h1 class="text-3xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-6 leading-tight tracking-tight">${text}</h1>
          </div>
        `
      }
      if (depth === 2) {
        const html = `
          <div class="relative flex items-start gap-4 mb-3 mt-12 md:mt-16 group cursor-default">
            <div class="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 border border-white/[0.08] flex shrink-0 items-center justify-center text-primary-400 font-black text-xl shadow-lg group-hover:scale-110 group-hover:text-primary-300 group-hover:border-primary-500/30 transition-all duration-300">
              ${stepCounter}
            </div>
            <h2 class="text-xl md:text-2xl font-bold text-gray-100 mt-2 tracking-tight group-hover:text-white transition-colors">${text}</h2>
          </div>
        `
        stepCounter++
        return html
      }
      return `<h${depth} class="text-lg md:text-xl font-bold text-white mt-8 mb-4 md:pl-16">${text}</h${depth}>`
    }

    renderer.paragraph = function (token) {
      const text = this.parser.parseInline(token.tokens)
      if (stepCounter === 1) {
        return `<p class="text-gray-400 text-base md:text-xl leading-relaxed mb-12 text-center md:text-left font-light max-w-2xl">${text}</p>`
      }
      return `
        <div class="relative">
          <div class="hidden md:block absolute left-6 top-0 bottom-[-2rem] w-px bg-gradient-to-b from-white/[0.08] to-transparent -z-10"></div>
          <p class="text-gray-400 text-base leading-relaxed mb-5 md:pl-16 font-light">${text}</p>
        </div>
      `
    }

    renderer.blockquote = function (token) {
      const text = this.parser.parse(token.tokens)
      return `
        <div class="relative mb-8 mt-2">
          <div class="hidden md:block absolute left-6 top-0 bottom-[-2rem] w-px bg-gradient-to-b from-white/[0.08] to-transparent -z-10"></div>
          <div class="md:ml-16 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] shadow-2xl backdrop-blur-sm relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-500 to-purple-600"></div>
            <div class="flex items-center gap-3 mb-3">
               <div class="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                 </svg>
               </div>
               <span class="text-sm font-bold text-gray-300 tracking-wide uppercase">Tips / Info</span>
            </div>
            <div class="text-sm md:text-base text-gray-400 leading-relaxed font-light">${text}</div>
          </div>
        </div>
      `
    }

    renderer.code = function (token) {
      const text = token.text
      const lang = token.lang
      return `
        <div class="relative mb-8 mt-4">
          <div class="hidden md:block absolute left-6 top-0 bottom-[-2rem] w-px bg-gradient-to-b from-white/[0.08] to-transparent -z-10"></div>
          <div class="md:ml-16 bg-[#0f0f13]/80 rounded-2xl overflow-hidden border border-white/[0.05] shadow-2xl backdrop-blur-md">
            <div class="bg-white/[0.02] px-4 py-3 border-b border-white/[0.05] flex items-center gap-2">
               <div class="flex gap-1.5">
                 <div class="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
                 <div class="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
                 <div class="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
               </div>
               <span class="ml-auto text-xs text-gray-500 font-mono tracking-wider">${lang || 'config'}</span>
            </div>
            <div class="p-5 text-sm font-mono text-primary-200 overflow-x-auto leading-relaxed">
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
          <div class="hidden md:block absolute left-6 top-0 bottom-[-2rem] w-px bg-gradient-to-b from-white/[0.08] to-transparent -z-10"></div>
          <${tag} class="${classes} md:ml-16 pl-6 pr-4 text-gray-400 space-y-3 font-light">${body}</${tag}>
        </div>
      `
    }
    
    renderer.listitem = function (token) {
      const text = this.parser.parse(token.tokens)
      return `<li class="pl-2 leading-relaxed text-base">${text}</li>`
    }

    // Gunakan renderer khusus
    htmlContent.value = marked(markdownText, { renderer })
    
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMarkdown(route.params.brand)
})

watch(() => route.params.brand, (newBrand) => {
  if (newBrand) {
    fetchMarkdown(newBrand)
  }
})
</script>

<style>
/* Reset styling jika diperlukan (kebanyakan sudah di-handle oleh renderer/Tailwind classes) */
.custom-md-container strong {
  @apply text-gray-200 font-bold;
}
.custom-md-container a {
  @apply text-primary-400 underline underline-offset-2;
}
.custom-md-container a:hover {
  color: #c4b5fd;
}
.custom-md-container code:not(pre code) {
  @apply px-1.5 py-0.5 bg-dark-800 text-primary-400 rounded-md border border-dark-700 font-mono text-sm;
}
</style>
