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
    <div class="flex space-x-2 mb-4">
      <!-- <button
        class="px-4 py-2 rounded-lg font-medium transition-all duration-200"
        :class="activeTab === 'active'
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        @click="activate('active')"
      >
        Активный
      </button>
      <button
        class="px-4 py-2 rounded-lg font-medium transition-all duration-200"
        :class="activeTab === 'history'
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        @click="activate('history')"
      >
        История
      </button>
    </div> -->

    <!-- Active tab -->
    <!-- <div
      v-if="activeTab === 'active'"
      class="flex items-center justify-between mb-4"
    >
      <h1 class="text-xl font-semibold">Сырье в производстве</h1>
      <button
        @click="openModal"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2"
      >
        <svg
          class="w-3.5 h-3.5 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 18"
        >
          <path
            d="M9 4a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2H10v3a1 1 0 1 1-2 0V10H5a1 1 0 1 1 0-2h3V5a1 1 0 0 1 1-1z"
          />
        </svg>
        Добавить
      </button> -->
      
    </div><!-- v-if="activeTab === 'history'" -->
    <div
      class="flex items-center justify-between mb-4"
    >
      <h1 class="text-xl font-semibold">Расход сырья</h1>
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
    <!-- Table -->
    <div
      class="border border-gray-200 rounded-lg bg-gray-200 p-4 h-[550px] flex flex-col"
    >
      <div class="overflow-y-auto custom-scroll flex-1">
        <!-- Header -->
        <div
          v-if="activeTab === 'active'"
          class="table-grid-header sticky top-0 z-20 mb-3"
        >
          <div class="cell header">Материал</div>
          <div class="cell header">Продукт</div>
          <div class="cell header">Ед. изм.</div>
          <div class="cell header">Кол-во</div>
          <div class="cell header">Дата</div>
        </div>

        <!-- Rows --> <!--v-if="activeTab === 'active'"
        <div
          v-if="activeTab === 'active'"
          v-for="(row, idx) in paginatedData"
          :key="idx"
          class="table-row mb-3"
        >
          <div class="cell">{{ row.material }}</div>
          <div class="cell">{{ row.product }}</div>
          <div class="cell">{{ row.measurement }}</div>
          <div class="cell">{{ row.quantity }}</div>
          <div class="cell">{{ row.date }}</div>
        </div>-->
        <!-- Header history -->
        <div
          v-if="activeTab === 'history'"
          class="table-grid-header sticky top-0 z-20 mb-3"
        >
          <div class="cell header text-center">
            Заказ ID<br />
            (производство)
          </div>
          <div class="cell header">Материал</div>
          <div class="cell header">Кол-во</div>
          <div class="cell header">Ед. изм.</div>
          <div class="cell header">Дата</div>
        </div>

        <!-- Rows --><!--v-if="activeTab === 'history'"-->
        <div
          v-for="(row, idx) in historyData"
          :key="idx"
          class="table-row mb-3"
        >
          <div class="cell" data-label="Заказ № / ID">{{ modelStore.model[0].nomenclature.name }}</div>
          <div class="cell" data-label="Дата">{{ row.product }}</div>
          <div class="cell" data-label="Модел">{{ row.quantity }}</div>
          <div class="cell" data-label="Размер">{{ row.measurement }}</div>
          <div class="cell" data-label="Действие">{{ row.date }}</div>
        </div>
        </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative"
    >
      <button
        @click="closeModal"
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      <h2 class="text-lg font-semibold mb-4">
        Добавление материал на производство
      </h2>

      <form @submit.prevent="submitForm" class="space-y-3">
        <input
          v-model="modelStore.model[0].nomenclature.name"
          placeholder="Введите название"
          class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
        />

        <select
          v-model="formData.product"
          class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
        >
          <option disabled value="">Выберите материал</option>
          <option v-for="item in items" :key="item.id" :value="item.name">
            {{ item.name }}
          </option>
        </select>

        <input
          v-model="formData.quantity"
          type="number"
          placeholder="Введите кол-во"
          class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
        />

        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white rounded py-2 text-sm font-medium"
        >
          Добавить
        </button>
      </form>
    </div>
  </div>
  </Layout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Layout from "@/components/Layout.vue";
import api from "@/utils/axios";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { useModelStore } from '@/stores/model'

const modelStore = useModelStore()
const userStore = useUserStore();
const router = useRouter();
const activeTab = ref("active");
const showModal = ref(false);
const items = ref([]);

const historyData = ref([]);

onMounted(async () => {
  try {
    const response = await api.get("/v1/consumes", {
      params: {
        productionplan: modelStore.model[0].productionplan,
        date_productionplan: modelStore.model[0].date_productionplan,
      },
    });
    historyData.value = response.data;
  } catch (error) {
  }
});

const formData = ref({
  nomenclature: "",
  product: "",
  quantity: "",
});

function activate(tab) {
  activeTab.value = tab;
}

function openModal() {
  showModal.value = true;
  GetItems();
}

function closeModal() {
  showModal.value = false;
}

async function GetItems() {
  try {
    const res = await api.get("/v1/items");
    items.value = res.data;
  } catch (err) {
    console.error(err);
  }
}

function submitForm() {
  if (!formData.value.quantity) {
    alert("Все поля должны быть заполнены!");
    return;
  }

  data.value.push({
    material: formData.value.nomenclature,
    product: formData.value.product,
    quantity: formData.value.quantity,
    measurement: "м",
    date: new Date().toLocaleString("ru-RU"),
  });

  formData.value = { nomenclature: "", product: "", quantity: "" };
  showModal.value = false;
}

function exit() {
  userStore.clearUser();
  router.push("/");
}
</script>


<style scoped>
.modal-content {
  overflow: visible;
}
/* Grid: 8 row */
.table-grid-header,
.table-row {
  display: grid;
  grid-template-columns: repeat(5, minmax(120px, 1fr));
  align-items: center;
  gap: 5px;
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
