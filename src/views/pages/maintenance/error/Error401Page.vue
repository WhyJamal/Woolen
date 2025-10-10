<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-6">
    <div class="w-full max-w-5xl bg-white/60 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center">
      <div class="p-8 md:p-12 space-y-6">
        <div class="inline-flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-12 h-12 text-amber-500">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <div>
            <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-800">401</h1>
            <p class="text-sm text-slate-500">Not authorized</p>
          </div>
        </div>

        <h2 class="text-2xl font-semibold text-slate-700">Вам не предоставлен доступ</h2>
        <p class="text-slate-600 leading-relaxed">Токен или разрешение на доступ к этой странице недействительны или истекли. Если вы администратор, обратитесь к системному администратору или нажмите одну из кнопок ниже.</p>

        <div class="flex flex-wrap gap-3">
          <button @click="goBack" class="px-4 py-2 rounded-lg border border-slate-200 hover:shadow-md transition-shadow duration-200 bg-white">Go back</button>
          <button @click="goHome" class="px-4 py-2 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors">Home</button>
          <a href="mailto:admin@example.com" class="px-4 py-2 rounded-lg border border-amber-100 text-amber-700 hover:bg-amber-50 transition">Contact admin</a>
        </div>

        <div class="mt-6 text-xs text-slate-400">Error code: <span class="font-mono text-slate-600">401</span> · If you believe this is an error, try clearing cookies or logging in again.</div>
      </div>

      <div class="p-6 md:p-10 flex items-center justify-center bg-gradient-to-tr from-white to-slate-50">
        <div class="relative w-full max-w-md animate-float">
          <img :src="errorImg" alt="401 illustration" class="w-full h-auto object-contain drop-shadow-lg rounded-lg" />

          <div class="absolute -top-4 -right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg transform rotate-6">Unauthorized</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import errorImg from '@/assets/images/maintenance/Error401.webp'

const router = useRouter()
const goHome = () => router ? router.push('/') : (window.location.href = '/')
const goBack = () => history.back()
</script>

<style scoped>
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

/* small viewport tweak for better spacing when Tailwind not present */
@media (max-width: 768px) {
  .animate-float { animation-duration: 6s; }
}
</style>
