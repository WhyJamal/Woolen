<template>
  <Layout>
    <template #exit-button>
      <button
        @click="exit"
        class="px-3 py-2 rounded-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm"
      >
        Выход
      </button>
    </template>

    <div class="p-6">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-xl font-semibold">История действие</h1>

        <div class="flex items-center gap-3">
          <input
            type="text"
            placeholder="Поиск"
            class="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
          />
          <button
            type="submit"
            class="p-2.5 text-sm font-medium text-white bg-gray-400 rounded-lg border border-gray-200 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg
              class="w-4 h-4"
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
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
          <div class="flex items-center gap-2">
            <div
              id="date-range-picker"
              date-rangepicker
              class="flex items-center"
            >
              <div class="relative">
                <div
                  class="absolute inset-y-0 start-0 flex items-center justify-center w-9 pointer-events-none"
                >
                  <svg
                    class="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                    />
                  </svg>
                </div>

                <input
                  ref="startInput"
                  id="datepicker-range-start"
                  name="start"
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-40 sm:w-36 ps-10 py-1.5"
                  placeholder="Start"
                />
              </div>

              <span class="mx-2 text-gray-500">to</span>

              <div class="relative">
                <div
                  class="absolute inset-y-0 start-0 flex items-center justify-center w-9 pointer-events-none"
                >
                  <svg
                    class="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                    />
                  </svg>
                </div>

                <input
                  ref="endInput"
                  id="datepicker-range-end"
                  name="end"
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-40 sm:w-36 ps-10 py-1.5"
                  placeholder="End"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="border border-gray-200 rounded-lg bg-gray-200 p-4 h-[550px] flex flex-col"
      >
        <div class="overflow-y-auto custom-scroll flex-1">
          <!-- Header -->
          <div class="table-grid-header sticky top-0 z-20 mb-3">
            <div class="cell header">Заказ № / ID</div>
            <div class="cell header">Дата</div>
            <div class="cell header">Модел</div>
            <div class="cell header">Размер</div>
            <div class="cell header">Действие</div>
            <div class="cell header">Лента</div>
            <div class="cell header">Кол-во</div>
            <div class="cell header">Коэффициент</div>
          </div>

          <!-- Rows -->
          <div
            v-for="(row, idx) in paginatedData"
            :key="idx"
            class="table-row mb-3"
          >
            <div class="cell" data-label="Заказ № / ID">{{ row.order }}</div>
            <div class="cell" data-label="Дата">{{ row.date }}</div>
            <div class="cell" data-label="Модел">{{ row.model }}</div>
            <div class="cell" data-label="Размер">{{ row.size }}</div>
            <div class="cell" data-label="Действие">{{ row.action }}</div>
            <div class="cell" data-label="Лента">{{ row.tape }}</div>
            <div class="cell" data-label="Кол-во">{{ row.qty }}</div>
            <div class="cell" data-label="Коэффициент">{{ row.coeff }}</div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-end gap-2">
          <button
            class="px-3 py-1 rounded-md text-sm border border-gray-300 bg-white disabled:opacity-50"
            :disabled="currentPage === 1"
            @click="prevPage"
          >
            Prev
          </button>

          <div class="flex items-center gap-1">
            <button
              v-for="p in pagesArray"
              :key="p"
              @click="goToPage(p)"
              :class="[
                'px-3 py-1 rounded-md text-sm border',
                p === currentPage
                  ? 'bg-blue-100 text-blue-800 border-blue-200'
                  : 'bg-white border-gray-200',
              ]"
            >
              {{ p }}
            </button>
          </div>

          <button
            class="px-3 py-1 rounded-md text-sm border border-gray-300 bg-white disabled:opacity-50"
            :disabled="currentPage === pagesCount"
            @click="nextPage"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { Datepicker } from "flowbite-datepicker";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import api from "@/utils/axios";
import Layout from "@/components/Layout.vue";

const router = useRouter();
const userStore = useUserStore();

const actions = ref([]);

// --- datepicker refs & state --- //
const startInput = ref(null);
const endInput = ref(null);
const startDate = ref("");
const endDate = ref("");

let startPicker = null;
let endPicker = null;
let startChange = null;
let endChange = null;

onMounted(async () => {
  try {
    // --- Get History Actions --- //
    const response = await api.get("/v1/actions", {
      params: { user: userStore.user.name },
    });
    actions.value = response.data;

    // --- Start Datepicker --- //
    if (startInput.value) {
      startPicker = new Datepicker(startInput.value, {
        autohide: true,
        format: "dd.mm.yyyy",
      });

      startChange = (e) => {
        startDate.value = e.target?.value || startInput.value?.value || "";
      };

      startInput.value.addEventListener("changeDate", startChange);
      startInput.value.addEventListener("change", startChange);
    }

    // --- End Datepicker --- //
    if (endInput.value) {
      endPicker = new Datepicker(endInput.value, {
        autohide: true,
        format: "dd.mm.yyyy",
      });

      endChange = (e) => {
        endDate.value = e.target?.value || endInput.value?.value || "";
      };

      endInput.value.addEventListener("changeDate", endChange);
      endInput.value.addEventListener("change", endChange);
    }
  } catch (err) {
    console.error("❌ Xatolik /v1/actions ni olishda:", err);
  }
});

// --- Pagination --- //
const currentPage = ref(1);
const pageSize = ref(5);

const pagesCount = computed(() =>
  Math.max(1, Math.ceil(actions.value.length / pageSize.value))
);

const pagesArray = computed(() =>
  Array.from({ length: pagesCount.value }, (_, i) => i + 1)
);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return actions.value.slice(start, start + pageSize.value);
});

function goToPage(p) {
  if (p >= 1 && p <= pagesCount.value) currentPage.value = p;
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
function nextPage() {
  if (currentPage.value < pagesCount.value) currentPage.value++;
}

// --- Cleanup --- //
onBeforeUnmount(() => {
  try {
    if (startInput.value && startChange) {
      startInput.value.removeEventListener("changeDate", startChange);
      startInput.value.removeEventListener("change", startChange);
    }
    if (endInput.value && endChange) {
      endInput.value.removeEventListener("changeDate", endChange);
      endInput.value.removeEventListener("change", endChange);
    }
  } catch (e) {}
});

// --- Logout --- //
function exit() {
  userStore.clearUser();
  router.push("/");
}
</script>

<style scoped>
/* Grid: 8 row */
.table-grid-header,
.table-row {
  display: grid;
  grid-template-columns: repeat(8, minmax(120px, 1fr));
  align-items: center;
  gap: 8px;
}

/* Header */
.table-grid-header {
  background: #ffffff;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(229, 231, 235, 1);
  font-weight: 600;
  color: #111827;
}

/* Row card */
.table-row {
  background: #ffffff;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid rgba(229, 231, 235, 1);
  transition: background-color 0.15s ease, transform 0.08s ease;
}

.table-row:hover {
  background-color: #eff9ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(14, 165, 233, 0.06);
}

.cell {
  padding: 0 8px;
  font-size: 0.95rem;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
}

.cell.header {
  color: #374151;
  font-size: 0.95rem;
}

.custom-scroll::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: #9ca3af;
  border-radius: 9999px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

@media (max-width: 768px) {
  .table-grid-header {
    display: none;
  }

  .table-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 10px;
  }

  .table-row .cell {
    display: flex;
    justify-content: space-between;
    white-space: normal;
  }

  .table-row .cell::before {
    content: attr(data-label);
    font-weight: 600;
    color: #374151;
    margin-right: 8px;
  }
}

@media (max-width: 420px) {
  .table-row .cell {
    font-size: 0.88rem;
  }
}

button:disabled {
  cursor: not-allowed;
}

.custom-scroll::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: #9ca3af;
  border-radius: 9999px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
