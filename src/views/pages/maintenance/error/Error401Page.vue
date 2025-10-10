<template>
  <div
    class="min-h-screen w-full flex items-center bg-white justify-center p-6"
  >
    <div
      class="relative w-full max-w-6xl flex flex-col md:flex-row items-center justify-center"
    >
      <div class="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16">
        <div class="relative w-full max-w-xl animate-float">
          <img
            :src="errorImg"
            alt="401 Unauthorized"
            class="w-full h-auto rounded-xl"
          />
          <div
            class="absolute -top-6 -right-6 bg-blue-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-xl rotate-6"
          >
            Unauthorized
          </div>
        </div>
      </div>

      <div
        class="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center text-center md:text-left p-6 md:p-12 space-y-6"
      >
        <div class="inline-flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-14 h-14 text-blue-500"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <div>
            <h1 class="text-5xl font-extrabold text-blue-800">401</h1>
            <p class="text-lg text-blue-500">Not authorized</p>
          </div>
        </div>

        <h2 class="text-2xl font-semibold text-blue-700">
          Вам не предоставлен доступ
        </h2>
        <p class="text-blue-600 leading-relaxed max-w-md">
          Доступ к данной странице ограничен. Возможно, ваша учетная запись не
          имеет нужных прав или не связана с соответствующим разделом в 1С.
          Обратитесь к администратору для проверки прав доступа.
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-wrap justify-center md:justify-start gap-4">
          <button
            @click="goBack"
            class="px-6 py-3 rounded-lg bg-white text-blue-800 font-medium shadow hover:shadow-lg transition-shadow"
          >
            Go Back
          </button>
          <button
            @click="goHome"
            class="px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
          >
            Go to login
          </button>
          <a
            href="mailto:admin@example.com"
            class="px-6 py-3 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
          >
            Contact admin
          </a>
        </div>

        <div class="mt-4 text-xs text-blue-400">
          Error code: <span class="font-mono text-blue-600">401</span> · If you
          believe this is an error, try clearing cookies or logging in again.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import errorImg from "@/assets/images/maintenance/Error401.webp";

const router = useRouter();
const goHome = () => router?.push("/") || (window.location.href = "/");
const goBack = () => history.back();
</script>

<style scoped>
/* empty */
</style>
