<template>
  <footer class="w-full mt-24 border-t border-black/[0.05] dark:border-white/[0.05] bg-black/[0.01] dark:bg-black/20 backdrop-blur-md relative z-10">
    <div class="max-w-5xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <span class="text-xs text-gray-400 dark:text-gray-500 font-medium">© 2026 ArdhanFah. All rights reserved.</span>
      </div>
      <div class="flex items-center gap-6">
        <router-link to="/blog" class="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Blog</router-link>
        <a href="#" class="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">GitHub</a>
        <a href="#" class="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Privacy</a>
        <a href="#" class="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Terms</a>
      </div>
    </div>
  </footer>
</template>
