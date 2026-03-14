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

        <div class="flex items-center gap-3 flex-wrap">
          <Listbox v-model="searchType" as="div" class="relative">
            <ListboxButton
              class="w-36 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm flex items-center justify-between"
            >
              <span class="truncate">
                {{ searchType ? searchType.name : "Поиск по..." }}
              </span>
              <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </ListboxButton>
            <ListboxOptions class="absolute mt-1 w-36 bg-white border rounded-md shadow-md max-h-60 overflow-y-auto z-50">
              <ListboxOption
                v-for="typ in searchTypes"
                :key="typ.id"
                :value="typ"
                class="cursor-pointer px-3 py-2 hover:bg-blue-50 text-sm"
              >
                {{ typ.name }}
              </ListboxOption>
            </ListboxOptions>
          </Listbox>

          <input
            type="text"
            v-model="searchText"
            @keyup.enter="doSearch"
            placeholder="Поиск"
            class="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
          />

          <button
            type="button"
            @click="doSearch"
            class="p-2.5 text-sm font-medium text-white bg-gray-400 rounded-lg border border-gray-200 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </button>

          <div class="flex items-center gap-2">
            <div id="date-range-picker" date-rangepicker class="flex items-center">
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center justify-center w-9 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                  </svg>
                </div>
                <input ref="startInput" id="datepicker-range-start" name="start" type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-40 sm:w-36 ps-10 py-1.5"
                  placeholder="Период с" />
              </div>
              <span class="mx-2 text-gray-500">по</span>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center justify-center w-9 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                  </svg>
                </div>
                <input ref="endInput" id="datepicker-range-end" name="end" type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-40 sm:w-36 ps-10 py-1.5"
                  placeholder="период окончания" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 rounded-lg bg-gray-200 p-4 h-[550px] flex flex-col">
        <div class="overflow-y-auto overflow-x-auto custom-scroll flex-1">
          <div class="min-w-max">
            <div class="table-grid-header sticky top-0 z-20 mb-3">
              <div class="cell header">Заказ № / ID</div>
              <div class="cell header">Дата</div>
              <div class="cell header">Модел</div>
              <div class="cell header">Размер</div>
              <div class="cell header">Действие</div>
              <div class="cell header">Лента</div>
              <div class="cell header">Кол-во</div>
              <div class="cell header">Коэффициент</div>
              <!-- ПЕЧАТЬ: колонка заголовка скрыта -->
              <!-- <div class="cell header justify-center">Печать</div> -->
            </div>

            <div v-for="(row, idx) in paginatedData" :key="idx" class="table-row mb-3">
              <div class="cell" data-label="Заказ № / ID">{{ row.order }}</div>
              <div class="cell" data-label="Дата">{{ row.date }}</div>
              <div class="cell" data-label="Модел">{{ row.model }}</div>
              <div class="cell" data-label="Размер">{{ row.size }}</div>
              <div class="cell" data-label="Действие">{{ row.action }}</div>
              <div class="cell" data-label="Лента">{{ row.tape }}</div>
              <div class="cell" data-label="Кол-во">{{ row.qty }}</div>
              <div class="cell" data-label="Коэффициент">{{ row.coeff }}</div>
              <!-- ПЕЧАТЬ: кнопка печати скрыта -->
              <!--
              <div class="cell justify-center" data-label="Печать">
                <button
                  @click="printRow(row)"
                  class="p-1.5 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                  title="Печать этикетки"
                >
                  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z" />
                  </svg>
                </button>
              </div>
              -->
            </div>

            <div v-if="!filteredActions.length" class="mb-3">
              <div class="flex flex-col bg-white items-center justify-center text-gray-500 rounded-lg text-center py-4">
                <img src="@/assets/images/empty-product.svg" title="No data found" class="w-32 h-32 object-contain" />
                <p class="text-center text-sm font-bold">No data</p>
              </div>
            </div>
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
          <div class="flex items-center gap-1 overflow-x-auto max-w-[60vw] custom-scroll pb-1">
            <button
              v-for="p in pagesArray"
              :key="p"
              @click="goToPage(p)"
              :class="[
                'px-3 py-1 rounded-md text-sm border flex-shrink-0',
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
            :disabled="currentPage === pagesCountFiltered"
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
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const router = useRouter();
const userStore = useUserStore();

const actions = ref([]);
const searchTypes = ref([
  { id: "model", name: "Модел" },
  { id: "order", name: "ЗаказID" },
  { id: "tape", name: "Лента" },
]);
const searchType = ref(null);
const searchText = ref("");
const activeSearchType = ref(null);
const activeSearchText = ref("");

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
    const response = await api.get("/v1/actions", {
      params: { user: userStore.user.name },
    });
    actions.value = response.data;

    if (startInput.value) {
      startPicker = new Datepicker(startInput.value, { autohide: true, format: "dd.mm.yyyy" });
      startChange = (e) => {
        startDate.value = e.target?.value || startInput.value?.value || "";
        doSearch();
      };
      startInput.value.addEventListener("changeDate", startChange);
      startInput.value.addEventListener("change", startChange);
    }

    if (endInput.value) {
      endPicker = new Datepicker(endInput.value, { autohide: true, format: "dd.mm.yyyy" });
      endChange = (e) => {
        endDate.value = e.target?.value || endInput.value?.value || "";
        doSearch();
      };
      endInput.value.addEventListener("changeDate", endChange);
      endInput.value.addEventListener("change", endChange);
    }
  } catch (err) {}
});

function doSearch() {
  activeSearchType.value = searchType.value;
  activeSearchText.value = searchText.value;
  currentPage.value = 1;
}

// ПЕЧАТЬ: функция и маппинг полей закомментированы.
// Для включения: раскомментировать printRow и кнопку печати в шаблоне,
// а также добавить колонку "Печать" в заголовок таблицы и grid-template-columns.
//
// 🖨️ Маппинг точно по полям которые возвращает /v1/actions
// Поля из API: order, date, model, size, action, tape, qty, coeff,
//              nomenclature, article, color, tape_number, width, mass,
//              brutto, netto, machine_id, author, components, sort, composition, batch
//
// function printRow(row) {
//   const labelData = {
//     order:        row.order        || "",
//     nomenclature: row.nomenclature || row.model || "",
//     article:      row.article      || "",
//     color:        row.color        || "",
//     batch:        row.batch        || "",
//     tape_number:  row.tape_number  || row.tape || "",
//     width:        row.width        || "",
//     brutto:       row.brutto       || row.qty  || "",
//     netto:        row.netto        || row.qty  || "",
//     mass:         row.mass         || "",
//     finish:       row.finish       || "Standart",
//     sort:         row.sort         || "",
//     composition:  row.composition  || "",
//     machine_id:   row.machine_id   || "",
//     author:       row.author       || "",
//     components:   row.components   || "",
//   };
//
//   const encoded = encodeURIComponent(JSON.stringify(labelData));
//   window.open(`/print-label?data=${encoded}`, "_blank");
// }

const currentPage = ref(1);
const pageSize = ref(5);

const filteredActions = computed(() => {
  const text = activeSearchText.value.toLowerCase().trim();

  return actions.value.filter((item) => {
    let matchesSearch = true;
    let matchesDate = true;

    if (text) {
      if (activeSearchType.value) {
        const key = activeSearchType.value.id;
        const itemValue = (item[key] ?? "").toString().toLowerCase();
        matchesSearch = fuzzyMatch(itemValue, text);
      } else {
        const allFields = Object.values(item).join(" ").toLowerCase();
        matchesSearch = fuzzyMatch(allFields, text);
      }
    }

    if (startDate.value || endDate.value) {
      const itemDate = parseDate(item.date);
      const start = startDate.value ? parseDate(startDate.value) : null;
      const end = endDate.value ? parseDate(endDate.value) : null;
      if (start && itemDate < start) matchesDate = false;
      if (end && itemDate > end) matchesDate = false;
    }

    return matchesSearch && matchesDate;
  });
});

function fuzzyMatch(source, query) {
  if (!query) return true;
  const pattern = query
    .split("")
    .map((ch) => ch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join(".*?");
  return new RegExp(pattern, "i").test(source);
}

function parseDate(str) {
  if (!str) return null;
  const datePart = str.split(" ")[0];
  const [d, m, y] = datePart.split(".").map((n) => parseInt(n));
  return new Date(y, m - 1, d);
}

const pagesCountFiltered = computed(() =>
  Math.max(1, Math.ceil(filteredActions.value.length / pageSize.value))
);

const pagesArray = computed(() =>
  Array.from({ length: pagesCountFiltered.value }, (_, i) => i + 1)
);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredActions.value.slice(start, start + pageSize.value);
});

function goToPage(p) {
  if (p >= 1 && p <= pagesCountFiltered.value) currentPage.value = p;
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
function nextPage() {
  if (currentPage.value < pagesCountFiltered.value) currentPage.value++;
}

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

function exit() {
  userStore.clearUser();
  router.push("/");
}
</script>

<style scoped>
.table-grid-header,
.table-row {
  /* ПЕЧАТЬ: было repeat(8, ...) 60px — последняя колонка для кнопки печати убрана */
  /* Для включения печати вернуть: grid-template-columns: repeat(8, minmax(120px, 1fr)) 60px; */
  display: grid;
  grid-template-columns: repeat(8, minmax(120px, 1fr));
  align-items: center;
  gap: 8px;
}

.table-grid-header {
  background: #ffffff;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(229, 231, 235, 1);
  font-weight: 600;
  color: #111827;
}

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

button:disabled {
  cursor: not-allowed;
}
</style>