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
          <div class="mb-12">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold tracking-wide uppercase mb-4">
              Tutorial
            </div>
            <h1 class="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">${text}</h1>
          </div>
        `
      }
      if (depth === 2) {
        const html = `
          <div class="flex items-center gap-4 mb-4 mt-12 group cursor-default">
            <div class="w-10 h-10 rounded-xl bg-dark-800 border border-dark-700 flex shrink-0 items-center justify-center text-primary-400 font-bold text-lg group-hover:bg-primary-500/10 group-hover:border-primary-500/30 transition-colors">
              ${stepCounter}
            </div>
            <h2 class="text-2xl font-bold text-gray-100">${text}</h2>
          </div>
        `
        stepCounter++
        return html
      }
      return `<h${depth} class="text-xl font-bold text-white mt-8 mb-4 md:pl-14">${text}</h${depth}>`
    }

    renderer.paragraph = function (token) {
      const text = this.parser.parseInline(token.tokens)
      if (stepCounter === 1) {
        return `<p class="text-gray-400 text-lg md:text-xl leading-relaxed mb-12">${text}</p>`
      }
      return `<p class="text-gray-400 leading-relaxed mb-4 md:pl-14">${text}</p>`
    }

    renderer.blockquote = function (token) {
      const text = this.parser.parse(token.tokens)
      return `
        <div class="md:ml-14 p-5 rounded-2xl bg-dark-800 border border-dark-700 shadow-inner mb-6">
          <div class="flex items-center gap-2 mb-3 border-b border-dark-700 pb-3">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
             </svg>
             <span class="text-sm font-medium text-gray-400">Tips / Info</span>
          </div>
          <div class="text-sm text-gray-300 leading-relaxed">${text}</div>
        </div>
      `
    }

    renderer.code = function (token) {
      const text = token.text
      const lang = token.lang
      return `
        <div class="md:ml-14 bg-[#1e1e28] rounded-xl overflow-hidden border border-dark-700 mb-6 mt-4">
          <div class="bg-[#181820] px-4 py-2 border-b border-dark-700 flex items-center gap-2">
             <div class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
             <div class="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
             <div class="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
             <span class="ml-2 text-xs text-gray-500 font-mono">${lang || 'config'}</span>
          </div>
          <div class="p-4 text-sm font-mono text-primary-300 overflow-x-auto">
            <pre><code>${text}</code></pre>
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
      return `<${tag} class="${classes} md:pl-20 pl-8 pr-4 text-gray-400 space-y-2 mb-6">${body}</${tag}>`
    }
    
    renderer.listitem = function (token) {
      const text = this.parser.parse(token.tokens)
      return `<li class="pl-2">${text}</li>`
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
