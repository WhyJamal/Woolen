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

    <div class="max-w-full mx-auto p-4">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-semibold">Упаковка</h2>
        <div class="flex gap-2">
          <button
            class="px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Создать баркод
          </button>
          <button
            class="px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Распечатать баркод
          </button>
        </div>
      </div>

      <div v-if="isLoading" class="flex-1 flex items-center justify-center">
        <div class="loader"></div>
      </div>

      <div v-if="!isLoading">
        <div
          v-for="(orderTasks, order) in groupedTasks"
          :key="order"
          class="bg-gray-200 p-3 rounded-lg mt-4"
        >
          <div class="table-wrapper w-full overflow-x-auto pb-1 custom-scroll">
            <div class="table-grid table-header bg-white">
              <div class="cell">Заказ №</div>
              <div class="cell">Артикул</div>
              <div class="cell">Действия</div>
              <div class="cell">Лента</div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell">Размер</div>
              <div class="cell">Палитра</div>
              <div class="cell">Приоритет</div>
              <div class="cell"></div>
              <div class="cell">Баркод</div>
              <div class="cell">История</div>
            </div>
            <div
              v-for="(task, index) in orderTasks"
              :key="index"
              class="table-wrapper w-full"
            >
              <div class="table-grid table-header mt-3">
                <div class="cell border-r border-gray-300">
                  {{ task.order }}
                </div>

                <div class="cell border-r border-gray-300" title= "nomenclature">
                  {{ task.nomenclature.article }} - {{ task.nomenclature.name }}
                </div>

                <div class="cell border-r border-gray-300">
                  Упаковать
                  <span class="font-medium">{{ task.quantity }} M</span>
                  <div class="mt-1 text-xs text-gray-600"></div>
                </div>

                <div class="cell">Стандарт</div>

                <div class="cell border-r border-gray-300">
                  {{ task.tape_number }}
                </div>
                <div class="cell border-r border-gray-300">
                  <span
                    :class="[
                      'text-xs font-medium me-2 px-1.5 py-0.5 rounded-sm',
                      task.status === 'Активний'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800',
                    ]"
                    >{{ task.status }}</span
                  >
                </div>
                <div class="cell center border-r border-gray-300">
                  <button
                    @click="toogleRefund(task)"
                    class="px-3 py-1 rounded-md bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    Возврат
                  </button>
                </div>

                <div class="cell border-r border-gray-300">{{ task.size }}</div>

                <div class="cell border-r border-gray-300">
                  {{ task.nomenclature.color_name }}
                </div>

                <div class="cell border-r border-gray-300">
                  <span
                    class="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded-sm border border-blue-400 inline-flex items-center justify-center"
                    >Обычный</span
                  >
                </div>

                <div class="cell center border-r border-gray-300">
                  <button
                    @click="toggleStart(task)"
                    :class="[
                      'px-3 py-1 rounded-md text-white text-sm font-bold shadow-md transition-all duration-200',
                      task.status === 'Активний'
                        ? 'bg-indigo-600 hover:shadow-lg hover:scale-105'
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg hover:scale-105',
                    ]"
                  >
                    {{ task.status === "Активний" ? "Сдать" : "Начать" }}
                  </button>
                </div>

                <div class="cell center border-r border-gray-300">
                  <button
                    @click="openPrintWindow(task)"
                    class="icon-btn"
                    title="Печать"
                    aria-label="Печать"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2V9a2 2 0 012-2h16a2 2 0 012 2v7a2 2 0 01-2 2h-2M6 18v4h12v-4"
                      />
                    </svg>
                  </button>
                </div>

                <div class="cell center">
                  <button class="icon-btn" title="История" aria-label="История">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalHistory v-if="openHistory" />
  </Layout>
</template>

<script setup>
import Layout from "@/components/Layout.vue";
import ModalHistory from "@/components/ui/ModalHistory.vue";
import PrintLabel from "@/pages/PrintLabel.vue";
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import api from "@/utils/axios";

const pressed = ref(false);
const tasks = ref([]);
const router = useRouter();
const userStore = useUserStore();
const openHistory = ref(false);
const showModel = ref(false);
const isLoading = ref(false);
const isSubmitting = ref(false);
const selectedTask = ref(null);
const photo = ref(null);
const clickSound = new Audio("/sounds/click.wav");
const endclickSound = new Audio("/sounds/end-click.wav");
const form = ref({
  stage: "",
  productionOrder: "",
  nomenclature: "",
  size: "",
  quantity: null,
  party: "",
  equipment: "",
  tape_number: "",
  comment: "",
  owner: "",
});

//-Print-label---------------------------//
const openPrintWindow = async (task) => {
  try {
    const params = {
      article: task.nomenclature.article,
      productionplan: task.productionplan,
      date_productionplan: task.date_productionplan,
      tape_number: task.tape_number,
    };

    const { data: labelData } = await api.get("/v1/print/data", { params });

    const encoded = encodeURIComponent(JSON.stringify(labelData));
    window.open(`/print-label?data=${encoded}`, "_blank");
  } catch (error) {
    console.error("Ошибка при получении данных для печати:", error);
    alert("Не удалось получить данные для печати");
  }
};
//---------------------------------------//

onMounted(async () => {
  isLoading.value = true;
  try {
    const response = await api.get("/v1/list_package", {
      params: { stage: userStore.user.stage },
    });
    tasks.value = response.data.map((task) => ({
      ...task,
      status: task.status || "Ожидает",
    }));
    //tasks.value = response.data;
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
});

const groupedTasks = computed(() => {
  const groups = {};
  for (const t of tasks.value) {
    if (!groups[t.order]) {
      groups[t.order] = [];
    }
    groups[t.order].push(t);
  }
  return groups;
});

function exit() {
  userStore.clearUser();
  router.push("/");
}

function toggleHistory() {
  openHistory.value = !openHistory.value;
}

const toggleStart = async (task) => {
  if (task.status === "Ожидает") {
    task.status = "Активний";
    clickSound.play();
    return;
  } else {
    pressed.value = true;
  }
  if (!pressed.value) {
    pressed.value = true;
    return;
  }

  if (isSubmitting.value) return;
  isSubmitting.value = true;

  try {
    const payload = {
      stage: task.stage.code,
      productionplan: task.productionplan,
      date_productionplan: task.date_productionplan,
      nomenclature: task.nomenclature.article,
      size: task.size,
      quantity: task.quantity,
      party: task.party,
      equipment: task.equipment,
      tape_number: task.tape_number,
      comment: "Упаковка",
      owner: userStore.user.name,
    };

    const response = await api.post("/v1/create_document", payload);

    const idx = tasks.value.findIndex(
      (t) => t.productionplan === task.productionplan
    );
    if (idx !== -1) {
      tasks.value.splice(idx, 1);
      showModel.value = false;
    }

    pressed.value = false;
  } catch (error) {
  } finally {
    isSubmitting.value = false;
  }
  endclickSound.play();
};

const toogleRefund = async (task) => {
  try {
    const payloadRefund = {
      stage: task.stage.code,
      productionplan: task.productionplan,
      date_productionplan: task.date_productionplan,
      nomenclature: task.nomenclature.article,
      size: task.size,
      quantity: task.quantity,
      party: task.party,
      tape_number: task.tape_number,
      equipment: task.equipment,
      comment: "Возврат",
      owner: userStore.user.name,
    };

    const response = await api.post("/v1/refund", payloadRefund);

    const idx = tasks.value.findIndex(
      (t) => t.productionplan === task.productionplan
    );
    if (idx !== -1) {
      tasks.value.splice(idx, 1);
    }
    pressed.value = false;
  } catch (error) {
  } finally {
    isSubmitting.value = false;
  }
  endclickSound.play();
};
</script>

<style>
.custom-scroll::-webkit-scrollbar {
  height: 6px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: #f3f4f6; 
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: #9CA3AF; 
  border-radius: 9999px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #2563eb; 
}
.table-wrapper {
  width: 100%;
  -webkit-overflow-scrolling: touch;
  /* overflow-x: auto; 
  padding-bottom: 1px; */
}
.table-grid:hover {
  background-color: #f0f7ff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}
.table-grid {
  display: grid;
  align-items: center;
  gap: 6px;
  grid-auto-rows: auto;
  grid-template-columns:
    clamp(48px, 20vw, 108px)
    clamp(100px, 20vw, 220px)
    clamp(90px, 18vw, 150px)
    clamp(48px, 6vw, 80px)
    clamp(34px, 4.5vw, 40px)
    clamp(34px, 9vw, 80px)
    clamp(50px, 9vw, 90px)
    clamp(48px, 6vw, 80px)
    clamp(60px, 8vw, 150px)
    clamp(60px, 8vw, 100px)
    clamp(60px, 9vw, 110px)
    clamp(48px, 6vw, 80px)
    clamp(48px, 6vw, 80px);
  min-width: max-content;
}

.table-header {
  display: inline-grid;
  width: max-content;
  background: white;
  border-radius: 8px;
  padding: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  font-weight: 600;
  font-size: 0.85rem;
}
.cell {
  padding: 4px 6px;
  font-size: 0.85rem;

  display: flex;
  align-items: center;
  gap: 8px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cell .small {
  display: inline-block;
  white-space: nowrap;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: white;
}

.badge {
  background: #fee2e2;
  color: #991b1b;
  font-size: 0.75rem;
  padding: 4px 6px;
  border-radius: 9999px;
  font-weight: 600;
  display: inline-block;
}

button.bg-sky-500 {
  background-color: #0ea5e9;
}
button.bg-green-500 {
  background-color: #10b981;
}

@media (max-width: 520px) {
  .table-grid {
    grid-template-columns:
      50px
      minmax(80px, 1fr)
      90px
      50px
      40px 40px 60px
      60px 60px 60px 60px
      48px 48px;
  }

  .cell {
    font-size: 0.8rem;
    gap: 6px;
  }
}
</style>
