<template>
  <main class="max-w-3xl mx-auto px-6 pb-12 pt-28 md:pt-36">
    <!-- Breadcrumb -->
    <nav class="mb-10 md:mb-12 relative z-10 flex items-center gap-3 text-sm font-medium">
      <router-link to="/blog" class="group flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.03] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.05]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Blog
      </router-link>
      <span class="text-gray-400 dark:text-gray-600">/</span>
      <span class="text-primary-600 dark:text-primary-400 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]">Artikel</span>
    </nav>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-500/10 border border-red-500/30 text-red-500 dark:text-red-400 px-6 py-4 rounded-xl text-center">
      <h3 class="font-bold mb-1">Artikel Tidak Ditemukan</h3>
      <p>{{ error }}</p>
    </div>

    <!-- Article Content -->
    <article v-else class="relative z-10">
      <!-- Article Header Metadata -->
      <div class="mb-8 flex items-center gap-3 text-xs md:text-sm text-gray-500 font-medium">
        <span class="px-3 py-1 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20 font-bold">
          {{ postMeta?.tag }}
        </span>
        <span>•</span>
        <span>{{ postMeta?.date }}</span>
        <span>•</span>
        <span>{{ postMeta?.readTime }}</span>
      </div>

      <!-- Rendered Markdown HTML -->
      <div class="blog-md-container" v-html="htmlContent"></div>

      <!-- Article Share / Call To Action Footer -->
      <div class="mt-16 pt-8 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
        <router-link to="/blog" class="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1.5 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Lihat Artikel Lainnya
        </router-link>
      </div>
    </article>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'

const route = useRoute()
const htmlContent = ref('')
const postMeta = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  const slug = route.params.slug
  try {
    // 1. Fetch metadata list to find this specific post details
    const metaRes = await fetch('/content/blog/posts.json')
    if (!metaRes.ok) throw new Error('Gagal memuat metadata blog.')
    const posts = await metaRes.json()
    postMeta.value = posts.find(p => p.slug === slug)

    // 2. Fetch markdown content
    const res = await fetch(`/content/blog/${slug}.md`)
    if (!res.ok) throw new Error('Artikel yang Anda cari tidak ditemukan.')
    const rawMarkdown = await res.text()

    // 3. Customize marked renderer for nice styling
    const renderer = new marked.Renderer()

    renderer.heading = function (token) {
      const depth = token.depth
      const text = this.parser.parseInline(token.tokens)
      
      if (depth === 1) {
        return `
          <h1 class="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">${text}</h1>
        `
      }
      if (depth === 2) {
        return `
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-4 tracking-tight border-b border-black/[0.06] dark:border-white/[0.05] pb-2">${text}</h2>
        `
      }
      return `<h${depth} class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">${text}</h${depth}>`
    }

    renderer.paragraph = function (token) {
      const text = this.parser.parseInline(token.tokens)
      return `<p class="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6 font-light">${text}</p>`
    }

    renderer.blockquote = function (token) {
      const text = this.parser.parse(token.tokens)
      return `
        <div class="my-8 p-6 rounded-2xl bg-primary-500/5 dark:bg-white/[0.02] border border-primary-500/10 dark:border-white/[0.05] relative overflow-hidden">
          <div class="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary-500 to-purple-600"></div>
          <div class="flex items-center gap-2 mb-2 text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-wider">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
             </svg>
             Info Penting
          </div>
          <div class="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed font-light">${text}</div>
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
        <${tag} class="${classes} pl-6 pr-4 my-6 text-gray-600 dark:text-gray-300 space-y-3 font-light leading-relaxed">${body}</${tag}>
      `
    }
    
    renderer.listitem = function (token) {
      const text = this.parser.parse(token.tokens)
      return `<li class="pl-2">${text}</li>`
    }

    htmlContent.value = marked(rawMarkdown, { renderer })
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style>
.blog-md-container hr {
  @apply border-black/[0.06] dark:border-white/[0.08] my-8;
}
.blog-md-container strong {
  @apply text-gray-900 dark:text-white font-semibold;
}
.blog-md-container a {
  @apply text-primary-500 dark:text-primary-400 underline underline-offset-2 hover:text-primary-600 dark:hover:text-primary-300 transition-colors;
}
</style>
