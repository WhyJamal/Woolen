<template>
  <Layout>
    <div
      v-if="showWarning"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1000] transition-all duration-300"
    >
      <div
        class="bg-white p-8 rounded-2xl shadow-2xl w-[420px] text-center transform transition-all scale-100 animate-fadeIn"
      >
        <div
          class="mx-auto mb-5 flex items-center justify-center w-16 h-16 rounded-full bg-red-100"
        >
          <svg
            class="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v4m0 4h.01M4.93 4.93a10 10 0 1 1 14.14 14.14A10 10 0 0 1 4.93 4.93z"
            />
          </svg>
        </div>

        <h3 class="text-lg font-semibold text-gray-800 mb-3">
          Вы не записали историю изменений
        </h3>

        <p class="text-gray-500 mb-6 text-sm">
          Проверьте, не перезаписали ли вы её или добавьте недостающие данные.
        </p>

        <div class="flex justify-center space-x-3">
          <button
            @click="showWarning = false"
            class="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition-all"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>

    <template #exit-button>
      <button
        @click="exit"
        class="rounded-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      >
        Выход
      </button>
    </template>

    <!-- PAGE -->
    <main class="page-wrap px-4 py-6">
      <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
          <div class="font-bold text-lg">{{ $t("select_task") }}</div>
          <!-- Search -->
          <div class="flex items-center gap-2 w-1/2">
            <Listbox v-model="searchType" as="div" class="relative">
              <ListboxButton
                class="w-36 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm flex items-center justify-between"
              >
                <span class="truncate">
                  {{ searchType ? searchType.name : "Поиск по..." }}
                </span>
                <svg
                  class="w-4 h-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </ListboxButton>

              <ListboxOptions
                class="absolute mt-1 w-36 bg-white border rounded-md shadow-md max-h-60 overflow-y-auto z-50"
              >
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
            <label for="simple-search" class="sr-only">Поиск</label>
            <div class="relative flex-1">
              <div
                class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
              >
                <svg
                  class="absolute left-3 top-3 w-4 h-4 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-400 block w-full ps-10 p-2.5"
                placeholder="Поиск..."
              />
            </div>
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
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-6">
          <!-- Aside -->
          <aside
            class="w-full sm:w-80 lg:w-96 max-w-full lg:max-w-[26rem] space-y-4"
          >
            <div
              class="flex h-[600px] flex-col gap-3 max-h-[80vh] bg-gray-200 rounded-lg p-3 overflow-y-auto scroll-soft"
            >
              <article
                v-for="(task, index) in tasks"
                :key="index"
                role="button"
                tabindex="0"
                @click="
                  toggleModel(
                    task.nomenclature?.article,
                    task.productionplan,
                    task.date_productionplan,
                    task.tape_number,
                    index
                  )
                "
                @keydown.enter.prevent="
                  toggleModel(
                    task.nomenclature?.article,
                    task.productionplan,
                    task.date_productionplan,
                    task.tape_number,
                    index
                  )
                "
                @keydown.space.prevent="
                  toggleModel(
                    task.nomenclature?.article,
                    task.productionplan,
                    task.date_productionplan,
                    task.tape_number,
                    index
                  )
                "
                class="group flex items-center gap-3 bg-white rounded-md p-2.5 shadow-sm border border-gray-100 hover:bg-blue-50 hover:shadow-md hover:-translate-y-0.5 transform transition-all duration-150 w-full overflow-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 flex-shrink-0"
              >
                <div
                  class="flex-shrink-0 w-1.5 rounded bg-gradient-to-b from-blue-500 to-purple-700 h-8"
                ></div>

                <div class="flex-1 min-w-0 overflow-hidden">
                  <div class="flex items-center justify-between gap-2">
                    <div class="min-w-0">
                      <span
                        class="inline-block text-xs px-2 py-0.5 rounded bg-gray-200 font-semibold whitespace-normal text-center"
                      >
                        Уровень задачи: {{ task.nomenclature.level }}<br />
                        Лента - #{{ task.tape_number }}
                      </span>
                    </div>

                    <div class="flex-shrink-0">
                      <span
                        class="inline-flex items-center text-xs px-2 py-0.5 rounded-full whitespace-nowrap font-semibold"
                        :class="{
                          'bg-amber-100 text-amber-800':
                            task.status === 'Ожидает',
                          'bg-green-100 text-green-800':
                            task.status === 'Активный',
                          'bg-gray-200 text-gray-600':
                            task.status === 'Завершен',
                        }"
                      >
                        {{ task.status }}
                      </span>
                    </div>
                  </div>

                  <div class="mt-1 flex items-center gap-2 min-w-0">
                    <span
                      v-if="task.order !== ''"
                      class="flex-shrink-0 text-xs text-gray-500 whitespace-nowrap"
                    >
                      № {{ task.order }}
                    </span>
                    
                    <span
                      v-else
                      class="flex-shrink-0 text-xs text-gray-500 whitespace-nowrap"
                    >
                      Для склада
                    </span>

                    <span
                      class="flex-1 truncate whitespace-nowrap text-sm font-semibold text-gray-900"
                      :title="`${task.productionplan} — ${task.nomenclature?.article} — ${task.nomenclature?.name}`"
                    >
                      {{ task.nomenclature?.article }} —
                      {{ task.nomenclature?.name }}
                    </span>
                  </div>
                  <div class="mt-1 flex items-center gap-2 min-w-0">
                    <span
                      class="flex-shrink-0 text-xs text-gray-500 whitespace-nowrap"
                    >
                      № {{ task.productionplan }}
                    </span>

                    <span
                      class="flex-1 truncate whitespace-nowrap text-sm font-semibold text-gray-900"
                    >
                      {{ task.color }} —
                      {{ task.quantity }}
                    </span>
                  </div>
                </div>
              </article>

              <div
                v-if="!tasks.length"
                class="flex flex-col bg-white items-center justify-center text-gray-500 rounded-lg text-center py-4"
              >
                <img
                  src="@/assets/images/empty-product.svg"
                  title="No data found"
                  class="w-32 h-32 object-contain"
                />
                <p class="text-center text-sm font-bold">No data</p>
              </div>
            </div>
          </aside>

          <div v-if="isLoading" class="flex-1 flex items-center justify-center">
            <div class="loader"></div>
          </div>
          <!-- Main -->
          <section v-if="showModel && !isLoading" class="flex-1 space-y-4">
            <!-- <div class="bg-gray-200 p-4 rounded-lg">
              <div class="max-w-5xl mx-auto space-y-2">
                <div class="grid grid-cols-3 bg-white rounded-md shadow">
                  <div class="p-3 font-semibold">Модель</div>
                  <div class="p-3 font-semibold text-center">Действия</div>
                  <div class="p-3 font-semibold text-right">Производить</div>
                </div>
                <div class="grid grid-cols-3 bg-white rounded-md shadow">
                  <div class="p-3">{{ model[0].productionplan }}</div>
                  <div class="p-3 text-center"></div>
                  <div class="p-3 text-right">{{ model[0].quantity }}</div>
                </div>
              </div>
            </div> -->

            <article
              class="relative bg-white rounded-2xl p-6 border shadow-lg min-h-[260px] transition-all duration-300 hover:shadow-xl overflow-hidden"
            >
              <div
                class="flex flex-wrap lg:flex-nowrap items-start justify-between gap-8 lg:gap-10 h-auto lg:h-[450px]"
              >
                <div class="flex flex-col items-center gap-4 flex-shrink-0">
                  <Listbox
                    v-model="model[0].next_stage"
                    as="div"
                    class="relative w-48"
                  >
                    <ListboxButton
                      @click="
                        onOpen(
                          model[0].productionplan,
                          model[0].date_productionplan,
                          model[0].stage.code
                        )
                      "
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm flex items-center justify-between bg-white hover:bg-gray-50 transition"
                    >
                      <span class="truncate">
                        {{
                          model[0].next_stage
                            ? model[0].next_stage.name
                            : "Этапы"
                        }}
                      </span>
                      <svg
                        class="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </ListboxButton>

                    <ListboxOptions
                      class="absolute mt-1 w-full bg-white border rounded-md shadow-md max-h-60 overflow-y-auto z-50"
                    >
                      <ListboxOption
                        v-if="loadingStages"
                        class="flex items-center justify-center py-4"
                      >
                        <div class="loader h-9 w-9"></div>
                      </ListboxOption>
                      <ListboxOption
                        v-else
                        v-for="stage in stages"
                        :key="stage.id"
                        :value="stage"
                        class="cursor-pointer px-3 py-2 hover:bg-blue-50 text-sm transition"
                      >
                        {{ stage.name }}
                      </ListboxOption>
                    </ListboxOptions>
                  </Listbox>

                  <div
                    class="rounded-xl border-2 border-dashed flex items-center justify-center bg-gradient-to-b from-white to-[#fbfdff] overflow-hidden shadow-sm"
                    style="
                      width: clamp(120px, 18vw, 288px);
                      height: clamp(120px, 18vw, 288px);
                    "
                  >
                    <img
                      v-if="model[0].nomenclature.photo"
                      :src="photo"
                      alt="Модель"
                      class="object-cover w-full h-full rounded-xl effect"
                    />
                    <svg
                      v-else
                      width="100%"
                      height="100%"
                      viewBox="0 0 260 260"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <pattern
                          id="p"
                          width="20"
                          height="20"
                          patternUnits="userSpaceOnUse"
                          patternTransform="rotate(45)"
                        >
                          <rect width="12" height="1.6" fill="#dfe3e8" />
                        </pattern>
                      </defs>
                      <rect width="260" height="260" fill="url(#p)" />
                    </svg>
                  </div>
                </div>

                <div class="flex-1 min-w-0 space-y-5">
                  <div class="border-b pb-4 mb-4">
                    <div
                      class="flex items-center gap-3 flex-wrap justify-between"
                    >
                      <div class="flex items-center gap-2 flex-wrap">
                        <template v-if="!quantityChange">
                          <h3
                            class="text-lg font-extrabold tracking-tight whitespace-nowrap"
                          >
                            {{ model[0].nomenclature.article }}
                            {{ userStore.user.stage }} |
                            {{ model[0].quantity }} M
                          </h3>
                        </template>

                        <template v-else>
                          <div class="flex items-center gap-2 flex-wrap">
                            <span class="text-lg font-extrabold tracking-tight">
                              {{ model[0].nomenclature.article }}
                              {{ userStore.user.stage }}
                            </span>
                            <input
                              type="number"
                              v-model="model[0].quantity"
                              class="border rounded px-2 py-1 w-20"
                            />
                            <span class="text-lg font-extrabold tracking-tight"
                              >M</span
                            >
                          </div>
                        </template>

                        <button
                          @click="toggleChangeQuantity(model[0].quantity)"
                          class="p-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
                        >
                          <svg
                            class="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M834.3 705.7c0 82.2-66.8 149-149 149H325.9c-82.2 0-149-66.8-149-149V346.4c0-82.2 66.8-149 149-149h129.8v-42.7H325.9c-105.7 0-191.7 86-191.7 191.7v359.3c0 105.7 86 191.7 191.7 191.7h359.3c105.7 0 191.7-86 191.7-191.7V575.9h-42.7v129.8z"
                            />
                            <path
                              d="M889.7 163.4c-22.9-22.9-53-34.4-83.1-34.4s-60.1 11.5-83.1 34.4L312 574.9c-16.9 16.9-27.9 38.8-31.2 62.5l-19 132.8c-1.6 11.4 7.3 21.3 18.4 21.3 0.9 0 1.8-0.1 2.7-0.2l132.8-19c23.7-3.4 45.6-14.3 62.5-31.2l411.5-411.5c45.9-45.9 45.9-120.3 0-166.2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div class="flex justify-end gap-3 mt-3">
                      <button
                        @click="toggleHistory"
                        class="px-4 py-1.5 rounded-full bg-white border font-semibold text-sm hover:bg-blue-300 transition"
                      >
                        История
                      </button>
                      <button
                        @click="toggleDefects"
                        class="px-4 py-1.5 rounded-full bg-gray-200 border font-semibold text-sm hover:bg-gray-400 transition"
                      >
                        Дефекты
                      </button>
                    </div>
                  </div>

                  <div>
                    <p class="text-sm text-gray-500 font-semibold">
                      Палитра — {{ model[0].color.name }}
                    </p>
                    <div class="flex items-center gap-3 mt-2">
                      <div
                        class="w-11 h-11 rounded-md border shadow-sm"
                        :style="{ background: model[0].color.Hex || '#ffffff' }"
                      ></div>
                    </div>
                  </div>

                  <div>
                    <p class="text-sm text-gray-500 font-semibold">
                      Размер бердо
                    </p>
                    <input
                      class="mt-2 p-2 rounded-md bg-gray-50 border focus:outline-none focus:ring-2 focus:ring-blue-300 transition w-[clamp(80px,12vw,120px)]"
                      :value="model[0]?.size"
                      readonly
                    />
                  </div>

                  <div>
                    <p class="text-sm text-gray-500 font-semibold">
                      Комплектация
                    </p>
                    <div
                      class="inline-block mt-2 px-5 py-2 rounded-md border bg-gray-50 shadow-sm truncate"
                    >
                      {{ model[0].equipment }}
                    </div>
                  </div>

                  <div>
                    <p class="text-sm text-gray-500 font-semibold">
                      Комплектующие
                    </p>
                    <div
                      class="inline-block mt-2 px-5 py-2 rounded-md border bg-gray-50 shadow-sm truncate"
                    >
                      {{ model[0].accessories }}
                    </div>
                  </div>
                </div>

                <div
                  class="flex flex-col items-center justify-center gap-5 mt-[60px]"
                  style="width: clamp(120px, 18vw, 288px); height: auto"
                >
                  <div
                    class="rounded-full bg-white w-full aspect-square flex items-center justify-center shadow-xl"
                  >
                    <button
                      ref="bigBtn"
                      :aria-pressed="pressed"
                      @pointerdown="down"
                      @pointerup="reset"
                      @pointercancel="reset"
                      @pointerleave="reset"
                      @click="toggle"
                      @keydown.space.prevent="toggle"
                      @keydown.enter.prevent="toggle"
                      class="rounded-full shadow-lg transition-transform duration-200 w-[clamp(96px,14vw,192px)] h-[clamp(96px,14vw,192px)] bg-center bg-cover"
                      :style="{
                        backgroundImage: `url(${
                          pressed
                            ? '/buttons/green-button.png'
                            : '/buttons/orange-button.png'
                        })`,
                      }"
                    ></button>
                  </div>

                  <button
                    v-if="
                      !(
                        userStore.user.stage === 'Браковка' ||
                        userStore.user.stage === 'Браковка 2'
                      )
                    "
                    @click="toogleRefund"
                    class="custom-btn mt-2 items-center justify-center flex mx-auto"
                  >
                    <div class="button-outer transition-transform">
                      <div class="button-inner flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        <span>Возврат</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </article>
          </section>
          <section
            v-if="!showModel && !isLoading"
            class="flex-1 flex flex-col items-center justify-center relative"
          >
            <div class="relative w-32 h-32 flex items-center justify-center">
              <span
                v-for="i in 3"
                :key="i"
                class="absolute rounded-full border-2 border-black opacity-50 animate-signal z-0"
                :style="{
                  width: `${30 + i * 30}px`,
                  height: `${30 + i * 30}px`,
                  animationDelay: `${i * 0.2}s`,
                }"
              ></span>
              <img
                src="/others/return-box.png"
                alt="Return Box"
                class="w-16 h-16 object-cover bg-[#f8fafc] rounded-full z-10"
              />
            </div>
            <div class="mt-4 text-2xl font-bold text-gray-600">
              Выберите задачу
            </div>
          </section>
        </div>
      </div>
    </main>
    <ModalHistory
      v-if="openHistory"
      :data="{
        article: model[0].nomenclature.article,
        productionplan: model[0].productionplan,
        color: model[0].color.code,
        date_productionplan: model[0].date_productionplan,
        tape_number: model[0].tape_number,
        arrayStory: storyDetails,
      }"
      @save="handleSave"
      @close="openHistory = false"
    />
    <ModalDefects
      v-if="openDefects"
      :data="{
        article: model[0].nomenclature.article,
        productionplan: model[0].productionplan,
        color: model[0].color.code,
        date_productionplan: model[0].date_productionplan,
        tape_number: model[0].tape_number,
      }"
      @close="openDefects = false"
    />
  </Layout>
</template>

<script setup>
import Layout from "@/components/Layout.vue";
import ModalHistory from "@/components/ui/ModalHistory.vue";
import ModalDefects from "@/components/ui/ModalDefects.vue";
import { onMounted, ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import api from "@/utils/axios";
import { useModelStore } from "@/stores/model";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { useDefectStore } from "@/stores/defects";

const defectStore = useDefectStore();
const modelStore = useModelStore();
const tasks = ref([]);
const model = ref([]);
const quantityChange = ref(false);
const changedQuantity = ref(null);
const router = useRouter();
const userStore = useUserStore();
const bigBtn = ref(null);
const pressed = ref(false);
const openHistory = ref(false);
const openDefects = ref(false);
const showModel = ref(false);
const isLoading = ref(false);
const isSubmitting = ref(false);
const selectedTask = ref(null);
const photo = ref(null);
const clickSound = new Audio("/sounds/click.wav");
const endclickSound = new Audio("/sounds/end-click.wav");
const showWarning = ref(false);
const form = ref({
  stage: "",
  productionOrder: "",
  nomenclature: "",
  size: "",
  quantity: null,
  party: "",
  equipment: "",
  comment: "",
  owner: "",
});
const searchTypes = ref([
  { id: "model", name: "Модел" },
  { id: "order", name: "ЗаказID" },
  { id: "tape_number", name: "Лента" },
]);
const searchType = ref(null);

//-Story-details-----------------------//
const storyDetails = reactive([]);
const DataStore = reactive({
  width: 0,
  mass: 0,
  brutto: 0,
  netto: 0,
  machine: null,
  mode: null,
  comment: null,
  author: null,
});

function handleSave(data) {
  Object.assign(DataStore, data);
  saveOrUpdateRow(DataStore);
  //openHistory.value = false;
}
function saveOrUpdateRow(newData) {
  const index = storyDetails.findIndex(
    (row) =>
      row.article === newData.article &&
      row.tape_number === newData.tape_number &&
      row.productionplan === newData.productionplan &&
      row.color === newData.color
  );
  if (index !== -1) {
    storyDetails[index] = { ...storyDetails[index], ...newData };
  } else {
    storyDetails.push({ ...newData });
  }
}
//-----------------------------------------------------------------------------------//

function toggleChangeQuantity(quantity) {
  quantityChange.value = !quantityChange.value;
  changedQuantity.value = quantity;
}

async function toggleModel(
  article,
  productionplan,
  date_productionplan,
  tape_number,
  index
) {
  const task = tasks.value[index];

  if (task.status === "Ожидает" || task.status === "Завершен") {
    pressed.value = false;
  } else {
    pressed.value = true;
  }

  model.value = null;
  showModel.value = false;
  isLoading.value = true;
  try {
    const response = await api.get("/v1/model", {
      params: {
        stage: userStore.user.stage,
        article,
        productionplan,
        date_productionplan,
        tape_number,
      },
    });
    model.value = response.data;
    modelStore.setModel(model.value);
    showModel.value = true;

    const defectsArray = model.value[0].arrayDefects;

    defectsArray.forEach((row) => {
      const exists = defectStore.rows.some(
        (r) =>
          r.defect?.code === row.defect?.code &&
          r.category?.code === row.category?.code &&
          r.note === row.note &&
          r.locations === row.locations &&
          r.length === row.length &&
          r.operator === row.operator &&
          r.article === (model.value[0].nomenclature?.article || "") &&
          r.productionplan === (model.value[0].productionplan || "") &&
          r.color === (model.value[0].color?.code || "") &&
          r.tape_number === (model.value[0].tape_number || "")
      );

      if (!exists) {
        defectStore.addRow({
          ...row,
          article: model.value[0].nomenclature?.article || "",
          productionplan: model.value[0].productionplan || "",
          color: model.value[0].color?.code || "",
          tape_number: model.value[0].tape_number || "",
        });
      }
    });

    //-Загрузить-Фото-----------------------------------//
    const photoResponse = await api.get(`/v1/photo`, {
      params: { article },
      responseType: "arraybuffer",
    });

    const base64 = btoa(
      new Uint8Array(photoResponse.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    if (base64 && base64 !== "") {
      photo.value = `data:image/jpeg;base64,${base64}`;
    }
    //--------------------------------------------------//
  } catch (error) {
    showModel.value = false;
  } finally {
    isLoading.value = false;
  }
}

function exit() {
  userStore.clearUser();
  router.push("/");
}

function toggleHistory() {
  openHistory.value = !openHistory.value;
}

function toggleDefects() {
  openDefects.value = !openDefects.value;
}

const down = () => {
  if (bigBtn.value) {
    bigBtn.value.style.transform = "translateY(6px) scale(.98)";
    bigBtn.value.style.boxShadow = "0 10px 30px rgba(0,0,0,.2)";
    if (!pressed.value) {
      clickSound.play();
    }
  }
};

const reset = () => {
  if (bigBtn.value) {
    bigBtn.value.style.transform = "";
    bigBtn.value.style.boxShadow = "";
  }
};

const toggle = async () => {
  if (!pressed.value) {
    pressed.value = true;

    const idx = tasks.value.findIndex(
      (t) =>
        t.productionplan === model.value[0].productionplan &&
        t.tape_number === model.value[0].tape_number &&
        t.nomenclature.article === model.value[0].nomenclature.article &&
        t.color === model.value[0].color.name
    );
    if (idx !== -1) {
      tasks.value[idx].status = "Активный";
    }

    if (bigBtn.value) {
      bigBtn.value.animate(
        [
          { transform: "translateY(0) scale(1)" },
          { transform: "translateY(-6px) scale(1.03)" },
          { transform: "translateY(0) scale(1)" },
        ],
        { duration: 260, easing: "cubic-bezier(.2,.8,.2,1)" }
      );
    }
    return;
  }

  if (isSubmitting.value) return;
  isSubmitting.value = true;

  try {
    const target = {
      article: model.value[0].nomenclature.article,
      tape_number: model.value[0].tape_number,
      productionplan: model.value[0].productionplan,
      color: model.value[0].color.code,
    };

    const index = storyDetails.findIndex(
      (row) =>
        row.article === target.article &&
        row.tape_number === target.tape_number &&
        row.productionplan === target.productionplan &&
        row.color === target.color
    );

    const detail = storyDetails[index] || {};

    const foundDefects = defectStore.rows.filter(
      (row) =>
        row.article === target.article &&
        row.tape_number === target.tape_number &&
        row.productionplan === target.productionplan &&
        row.color === target.color
    );

    if (
      userStore.user.stage === "Контроль 3" &&
      (!detail.width || detail.width === 0)
    ) {
      showWarning.value = true;
      return;
    }

    const payload = {
      stage: model.value[0].next_stage.code, //userStore.user.stage_code,
      productionplan: model.value[0].productionplan,
      date_productionplan: model.value[0].date_productionplan,
      nomenclature: model.value[0].nomenclature.article,
      size: model.value[0].size,
      quantity: model.value[0].quantity,
      party: model.value[0].party,
      color: model.value[0].color.code,
      equipment: model.value[0].equipment,
      tape_number: model.value[0].tape_number,
      accessories: model.value[0].accessories || "",
      sort: model.value[0].sort || "",
      comment: "1",
      owner: userStore.user.GUID,

      // Story details
      date: detail.date || "",
      width: detail.width || 0,
      mass: detail.mass || 0,
      brutto: detail.brutto || 0,
      netto: detail.netto || 0,
      machine: detail.machine?.code || "",
      mode: detail.mode || "",
      comment_story: detail.comment || "",
      author: detail.author || "",

      defects: foundDefects.length ? foundDefects : [],
    };

    const response = await api.post("/v1/create_document", payload);

    const idx = tasks.value.findIndex(
      (t) =>
        t.productionplan === model.value[0].productionplan &&
        t.tape_number === model.value[0].tape_number &&
        t.nomenclature.article === model.value[0].nomenclature.article &&
        t.color === model.value[0].color.name
    );
    if (idx !== -1) {
      tasks.value.splice(idx, 1);
      showModel.value = false;
      //tasks.value[idx].status = "Завершен";
    }

    foundDefects.forEach((def) => {
      const index = defectStore.rows.findIndex(
        (r) =>
          r.article === def.article &&
          r.tape_number === def.tape_number &&
          r.productionplan === def.productionplan &&
          r.color === def.color
      ); //r.date === def.date
      if (index !== -1) {
        defectStore.removeRow(index);
      }
    });

    pressed.value = false;
    modelStore.clearModel();
  } catch (error) {
  } finally {
    isSubmitting.value = false;
  }
  endclickSound.play();
};

const toogleRefund = async () => {
  try {
    const target = {
      article: model.value[0].nomenclature.article,
      tape_number: model.value[0].tape_number,
      productionplan: model.value[0].productionplan,
      color: model.value[0].color.code,
    };

    const foundDefects = defectStore.rows.filter(
      (row) =>
        row.article === (target.article || "") &&
        row.tape_number === (target.tape_number || "") &&
        row.productionplan === (target.productionplan || "") &&
        row.color === (target.color || "")
    );

    const payloadRefund = {
      stage: userStore.user.stage_code, //model.value[0].stage.code,
      productionplan: model.value[0].productionplan,
      date_productionplan: model.value[0].date_productionplan,
      nomenclature: model.value[0].nomenclature.article,
      size: model.value[0].size,
      color: model.value[0].color.code,
      quantity: model.value[0].quantity,
      party: model.value[0].party,
      equipment: model.value[0].equipment,
      tape_number: model.value[0].tape_number,
      accessories: model.value[0].accessories || "",
      sort: model.value[0].sort || "",
      comment: "Возврат",
      owner: userStore.user.GUID,

      defects: foundDefects.length ? foundDefects : [],
    };

    const response = await api.post("/v1/refund", payloadRefund);

    const idx = tasks.value.findIndex(
      (t) =>
        t.productionplan === model.value[0].productionplan &&
        t.tape_number === model.value[0].tape_number &&
        t.nomenclature.article === model.value[0].nomenclature.article &&
        t.color === model.value[0].color.name
    );
    if (idx !== -1) {
      tasks.value.splice(idx, 1);
      showModel.value = false;
    }

    foundDefects.forEach((def) => {
      const index = defectStore.rows.findIndex(
        (r) =>
          r.article === def.article &&
          r.tape_number === def.tape_number &&
          r.productionplan === def.productionplan &&
          r.color === def.color
      ); //r.date === def.date
      if (index !== -1) {
        defectStore.removeRow(index);
      }
    });

    pressed.value = false;
    modelStore.clearModel();
  } catch (error) {
  } finally {
    isSubmitting.value = false;
  }
  endclickSound.play();
};

onMounted(async () => {
  try {
    const response = await api.get("/v1/list_models", {
      params: { stage: userStore.user.stage },
    });
    tasks.value = response.data.map((task) => ({
      ...task,
      status: task.status || "Ожидает",
    }));
    //tasks.value = response.data;

    if (modelStore.model && modelStore.model.length > 0) {
      const first = modelStore.model[0];
      runToggle(first);
    }
  } catch (error) {}
});

watch(
  () => modelStore.model,
  async (newVal) => {
    if (Array.isArray(newVal) && newVal.length > 0) {
      const first = newVal[0];
      if (
        first &&
        first.article &&
        first.productionplan &&
        first.date_productionplan &&
        first.tape_number
      ) {
        await runToggle(first);
      } else {
        //console.warn("Warning:", first);
      }
    }
  },
  { immediate: true, deep: true }
);

async function runToggle(first) {
  try {
    showModel.value = true;
    await toggleModel(
      first.nomenclature.article,
      first.productionplan,
      first.date_productionplan,
      first.tape_number,
      0
    );
  } catch (err) {}
}

const stages = ref([]);
const loadingStages = ref(false);

const fetchSearchTypes = async (number, date, stage) => {
  try {
    loadingStages.value = true;
    const response = await api.get("/v1/stages", {
      params: {
        productionplan: number,
        date_productionplan: date,
        stage: stage,
      },
    });
    stages.value = response.data;
  } catch (err) {
  } finally {
    loadingStages.value = false;
  }
};

const onOpen = async (number, date, stage) => {
  stages.value = [];
  await fetchSearchTypes(number, date, stage);
};
</script>

<style>
.custom-btn {
  all: unset;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
  border-radius: 999vw;
  background-color: rgba(0, 0, 0, 0.75);
  box-shadow: -0.15em -0.15em 0.15em -0.075em rgba(5, 5, 5, 0.25),
    0.0375em 0.0375em 0.0675em 0 rgba(5, 5, 5, 0.1);
}
.custom-btn::after {
  content: "";
  position: absolute;
  z-index: 0;
  width: calc(100% + 0.3em);
  height: calc(100% + 0.3em);
  top: -0.15em;
  left: -0.15em;
  border-radius: inherit;
  background: linear-gradient(
    -135deg,
    rgba(5, 5, 5, 0.5),
    transparent 20%,
    transparent 100%
  );
  filter: blur(0.0125em);
  opacity: 0.25;
  mix-blend-mode: multiply;
}
.custom-btn .button-outer {
  position: relative;
  z-index: 1;
  border-radius: inherit;
  transition: box-shadow 300ms ease;
  will-change: box-shadow;
  box-shadow: 0 0.05em 0.05em -0.01em rgba(5, 5, 5, 1),
    0 0.01em 0.01em -0.01em rgba(5, 5, 5, 0.5),
    0.15em 0.3em 0.1em -0.01em rgba(5, 5, 5, 0.25);
}
.custom-btn:hover .button-outer {
  box-shadow: none;
}
.custom-btn .button-inner {
  position: relative;
  z-index: 1;
  border-radius: inherit;
  padding: 1em 1.5em;
  background-image: linear-gradient(
    135deg,
    rgba(230, 230, 230, 1),
    rgba(180, 180, 180, 1)
  );
  transition: box-shadow 300ms ease, clip-path 250ms ease,
    background-image 250ms ease, transform 250ms ease;
  will-change: box-shadow, clip-path, background-image, transform;
  overflow: clip;
  clip-path: inset(0 0 0 0 round 999vw);
  box-shadow: -0.05em -0.05em 0.05em 0 inset rgba(5, 5, 5, 0.25),
    0.025em 0.05em 0.1em 0 inset rgba(255, 255, 255, 1),
    -0.075em -0.25em 0.25em 0.1em inset rgba(5, 5, 5, 0.25);
}
.custom-btn:hover .button-inner {
  clip-path: inset(0.0625em 0.0625em 0.0625em 0.0625em round 999vw);
  box-shadow: 0.1em 0.15em 0.05em 0 inset rgba(5, 5, 5, 0.75),
    -0.025em -0.03em 0.05em 0.025em inset rgba(5, 5, 5, 0.5);
}
.custom-btn .button-inner span {
  position: relative;
  z-index: 4;
  font-family: "Inter", sans-serif;
  letter-spacing: -0.05em;
  font-weight: 500;
  color: transparent;
  background-image: linear-gradient(
    135deg,
    rgba(25, 25, 25, 1),
    rgba(75, 75, 75, 1)
  );
  -webkit-background-clip: text;
  background-clip: text;
  transition: transform 250ms ease;
  display: block;
  will-change: transform;
  text-shadow: rgba(0, 0, 0, 0.1) 0 0 0.1em;
  user-select: none;
}
.custom-btn:hover .button-inner span {
  transform: scale(0.975);
}
.custom-btn:active .button-inner {
  transform: scale(0.975);
}

@keyframes signal {
  0% {
    transform: scale(0.3);
    opacity: 0.4;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.animate-signal {
  animation: signal 1.2s infinite ease-in-out;
}
.effect {
  transition: transform 0.3s ease;
}
.effect:hover {
  transform: scale(1.2);
}
</style>
