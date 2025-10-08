<template>
  <div class="login-page">
    <Header />
    <form @submit.prevent="handleLogin">
      <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#eef1f4] to-[#f8fafc]"
      >
        <div
          class="relative bg-white rounded-2xl shadow-xl border p-6 w-full max-w-sm flex flex-col gap-4"
        >
          <!-- LOADER OVERLAY -->
          <div
            v-if="loading"
            class="absolute inset-0 bg-gray-400/70 flex items-center justify-center rounded-2xl z-10"
          >
            <div class="loader"></div>
          </div>

          <h2 class="text-xl font-bold text-center">Вход</h2>
          <div
            class="relative bg-gray-100 border border-slate-200 rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6"
          >
            <div class="relative w-48 h-32 flex items-center justify-center">
              <div
                class="relative w-40 h-24 rounded-lg bg-white shadow-lg border border-gray-200 p-3 flex flex-col justify-between"
              >
                <div class="text-sm font-semibold text-gray-700">ID</div>
                <!--<div class="w-10 h-6 bg-amber-300 rounded-sm"></div>
              <div class="text-xs text-gray-500">123456789</div> -->
              </div>

              <div
                aria-hidden="true"
                class="absolute w-56 h-56 rounded-full flex items-center justify-center pointer-events-none"
              >
                <span
                  class="absolute w-28 h-28 rounded-full border-2 border-slate-300/40 anim-ripple"
                ></span>
                <span
                  class="absolute w-20 h-20 rounded-full border-2 border-slate-300/30 anim-ripple"
                  style="animation-delay: 0.45s"
                ></span>
                <span
                  class="absolute w-12 h-12 rounded-full border-2 border-slate-300/20 anim-ripple"
                  style="animation-delay: 0.9s"
                ></span>
              </div>
            </div>

            <h2 class="text-lg font-semibold text-slate-800">
              Приложите карту
            </h2>

            <div aria-live="polite" id="nfc-status" class="sr-only">
              Ожидается карта
            </div>
          </div>

          <div class="relative">
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1V9a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2Z"
              />
            </svg>
            <input
              ref="inputRef"
              v-model="code"
              type="text"
              class="w-full pl-10 pr-4 py-3 rounded-xl border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              placeholder="Введите код сотрудника"
              @blur="keepFocus"
              @keydown.tab.prevent
            />
          </div>

          <!-- @click="handleLogin" -->
          <button
            class="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 active:scale-95 transition"
          >
            Вход
          </button>

          <!-- <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p> -->
        </div>
      </div>
    </form>
    <!-- Modal -->
    <div
      v-if="errorAuthentication"
      id="popup-modal"
      tabindex="-1"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <button
            @click="errorAuthentication = false"
            type="button"
            class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-4 md:p-5 text-center">
            <svg
              class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3
              class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
            >
              {{ error }}
            </h3>
            <button
              @click="errorAuthentication = false"
              data-modal-hide="popup-modal"
              type="button"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Ок
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/headers/Header.vue";
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import api from "@/utils/axios";
import { useUserStore } from "@/stores/user";
import { stageRoutes } from "@/config/stageRoutes";

const code = ref("");
const inputRef = ref(null);
const error = ref("");
const errorAuthentication = ref(false);
const router = useRouter();
const userStore = useUserStore();
const loading = ref(false);

const handleLogin = async () => {
  if (!code.value.trim()) {
    alert("Введите код сотрудника.");
    return;
  }

  loading.value = true;
  try {
    const response = await api.get(`/v1/login?code=${code.value}`);

    if (response.status === 200 && response.data.length) {
      const user = response.data[0];
      user.code = code.value;
      userStore.setUser(user);

      const stage = user.stage;
      const route = stageRoutes[stage] || "/not-authorized";
      router.push(route);
    } else {
      errorAuthentication.value = true;
      error.value =
        "У вас нет прав для входа в систему, пожалуйста, проверьте и войдите снова";
    }
  } catch (err) {
    errorAuthentication.value = true;
    error.value =
      "У вас нет прав для входа в систему, пожалуйста, проверьте и войдите снова";
    //error.value = err.response || err;
  } finally {
    loading.value = false;
  }
};

async function focusInput() {
  await nextTick();
  inputRef.value?.focus();
}

onMounted(focusInput);

function keepFocus() {
  setTimeout(() => {
    inputRef.value?.focus();
  }, 0);
}
</script>

<style>
@keyframes floatUpDown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes ripple {
  0% {
    transform: scale(0.6);
    opacity: 0.8;
  }
  100% {
    transform: scale(2.6);
    opacity: 0;
  }
}

.anim-float {
  animation: floatUpDown 2.8s ease-in-out infinite;
}
.anim-ripple {
  animation: ripple 1.6s ease-out infinite;
  transform-origin: center;
}

.focus-ring:focus {
  outline: 3px solid rgba(99, 102, 241, 0.25);
  outline-offset: 3px;
  border-radius: 0.5rem;
}
</style>
