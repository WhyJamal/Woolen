<template>
  <header
    class="fixed inset-x-0 top-0 h-[70px] bg-white shadow z-50 flex items-center justify-between px-4"
  >
    <!-- <img :src="`http://localhost/api/hs/v1/photo?article=FMAA0001`" 
     alt="Фото" 
     class="w-12 h-12 rounded-full object-cover" /> -->

    <div class="flex items-center gap-3">
      <button
        v-if="$route.path !== '/'"
        @click="goBack"
        class="p-2 rounded-md bg-gray-100"
      >
        <svg
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m15 19-7-7 7-7"
          />
        </svg>
      </button>

      <div class="flex items-center gap-3">
        <img
          src="/logos/Woolen.png"
          alt="WoolenTex logo"
          class="w-10 h-10 object-contain"
          loading="lazy"
        />
        <div class="font-bold text-lg inline-block border-b-2 border-gray-800">
          WoolenTex
        </div>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <div class="relative">
        <button
          @click.stop="isOpen = !isOpen"
          class="flex items-center gap-1 text-sm text-blue-700"
        >
          {{ currentLanguageLabel }}
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <!-- Dropdown menyu -->
        <div
          v-if="isOpen"
          class="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-32 z-50 language_dropdown"
        >
          <ul>
            <li
              v-for="lang in languages"
              :key="lang.code"
              @click="selectLanguage(lang.code)"
              class="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {{ lang.label }}
            </li>
          </ul>
        </div>
      </div>

      <div
        v-if="userStore.user?.name"
        class="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center font-semibold"
      >
        {{ firstLetter(userStore.user.name) }}
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const userStore = useUserStore();

function firstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase();
}

const isOpen = ref(false);
const selectedLanguage = ref(localStorage.getItem("lang") || "ru"); // default Русский

const languages = [
  { code: "uz", label: "Oʻzbekcha" },
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
];

const currentLanguageLabel = computed(() => {
  const lang = languages.find((l) => l.code === selectedLanguage.value);
  return lang ? lang.label : "Русский";
});

function selectLanguage(code) {
  selectedLanguage.value = code;
  localStorage.setItem("lang", code);
  isOpen.value = false;
  locale.value = selectedLanguage.value;
}

function goBack() {
  window.history.back();
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".language_dropdown")) {
    isOpen.value = false;
  }
});
</script>
