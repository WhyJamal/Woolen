<template>
  <Layout>
    <template #exit-button>
      <button
        @click="exit"
        class="px-3 py-2 rounded-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      >
        Выход
      </button>
    </template>

    <!-- PAGE -->
    <main class="page-wrap px-4 py-6">
      <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between">
          <div class="font-bold text-lg">Выберите задачу</div>
          <!-- Search -->
          <div class="flex items-center gap-2 w-1/2">
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
              class="flex h-[600px] flex-col gap-3 overflow-y-auto max-h-[80vh] bg-gray-200 rounded-lg p-3"
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
                class="group flex items-center gap-3 bg-white rounded-md p-2.5 shadow-sm border border-gray-100 hover:bg-blue-50 hover:shadow-md hover:-translate-y-0.5 transform transition-all duration-150 w-full overflow-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
              >
                <div
                  class="flex-shrink-0 w-1.5 rounded bg-gradient-to-b from-blue-500 to-purple-700 h-8"
                ></div>

                <div class="flex-1 min-w-0 overflow-hidden">
                  <div class="flex items-center justify-between gap-2">
                    <div class="min-w-0">
                      <span
                        v-if="task.tape_number > 0"
                        class="inline-block text-xs px-2 py-0.5 rounded bg-gray-200 font-semibold whitespace-nowrap"
                      >
                        Уровень задачи: Лента -#{{ task.tape_number }}
                      </span>
                      <span
                        v-else
                        class="inline-block text-xs px-2 py-0.5 rounded bg-gray-200 font-semibold whitespace-nowrap"
                      >
                        Уровень задачи: Ящик
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
                      class="flex-shrink-0 text-xs text-gray-500 whitespace-nowrap"
                    >
                      № {{ task.order }}
                    </span>

                    <span
                      class="flex-1 truncate whitespace-nowrap text-sm font-semibold text-gray-900"
                      :title="`${task.productionplan} — ${task.nomenclature?.article} — ${task.nomenclature?.name}`"
                    >
                      {{ task.nomenclature?.article }} —
                      {{ task.nomenclature?.name }}
                    </span>
                  </div>
                </div>
              </article>

              <div v-if="!tasks.length" class="text-gray-500 text-center py-4">
                Задач нет
              </div>
            </div>
          </aside>

          <div v-if="isLoading" class="flex-1 flex items-center justify-center">
            <div class="loader"></div>
          </div>
          <!-- Main -->
          <section v-if="showModel && !isLoading" class="flex-1 space-y-4">
            <div class="bg-gray-200 p-4 rounded-lg">
              <div class="max-w-5xl mx-auto space-y-2">
                <div class="grid grid-cols-3 bg-white rounded-md shadow">
                  <div class="p-3 font-semibold">Модель</div>
                  <div class="p-3 font-semibold text-center">Действия</div>
                  <div class="p-3 font-semibold text-right">Производить</div>
                </div>
                <div class="grid grid-cols-3 bg-white rounded-md shadow">
                  <div class="p-3">
                    {{ model[0].order }} - {{ model[0].nomenclature.article }}
                    {{ model[0].nomenclature.name }}
                  </div>
                  <div class="p-3 text-center"></div>
                  <div class="p-3 text-right">{{ model[0].quantity }}</div>
                </div>
              </div>
            </div>

            <article
              class="relative bg-white rounded-2xl p-6 border shadow-lg min-h-[240px] transition hover:shadow-xl overflow-hidden"
            >
              <div class="flex items-center justify-between gap-6 flex-nowrap">
                <div
                  class="rounded-xl border-2 border-dashed flex items-center justify-center bg-gradient-to-b from-white to-[#fbfdff] overflow-hidden"
                  style="
                    width: clamp(120px, 18vw, 288px);
                    height: clamp(120px, 18vw, 288px);
                  "
                >
                  <img
                    v-if="photo"
                    :src="photo"
                    alt="Модель"
                    class="object-cover w-full h-full rounded-xl effect"
                  />
                  <!-- <img
                    v-if="model[0].nomenclature.photo"
                    :src="`http://localhost/api/hs/v1/photo?article=${model[0].nomenclature.article}`"
                    alt="Модель"
                    class="object-cover w-full h-full rounded-xl effect"
                  /> -->
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

                <div class="flex-1 min-w-0 space-y-5">
                  <div
                    class="flex items-center justify-between border-b pb-4 mb-4"
                  >
                    <div class="flex items-center gap-3">
                      <button
                        class="px-4 py-1.5 border rounded-lg text-sm font-medium bg-gray-50 hover:bg-gray-100 transition"
                      >
                        Заказ
                      </button>
                      <h3
                        v-if="!quantityChange"
                        class="text-lg font-extrabold tracking-tight"
                      >
                        Сновать {{ model[0].quantity }} M
                      </h3>

                      <div v-else class="flex items-center gap-2">
                        <span class="text-lg font-extrabold tracking-tight"
                          >Сновать</span
                        >
                        <input
                          type="number"
                          v-model="model[0].quantity"
                          class="border rounded px-2 py-1 w-20"
                        />
                        <span class="text-lg font-extrabold tracking-tight"
                          >M</span
                        >
                      </div>

                      <button
                        @click="toggleChangeQuantity(model[0].quantity)"
                        class="px-2 py-1 rounded-lg text-sm font-medium effect"
                      >
                        <svg
                          class="svg-icon"
                          style="
                            width: 1.5em;
                            height: 1.5em;
                            vertical-align: middle;
                            fill: currentColor;
                            overflow: hidden;
                          "
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M834.3 705.7c0 82.2-66.8 149-149 149H325.9c-82.2 0-149-66.8-149-149V346.4c0-82.2 66.8-149 149-149h129.8v-42.7H325.9c-105.7 0-191.7 86-191.7 191.7v359.3c0 105.7 86 191.7 191.7 191.7h359.3c105.7 0 191.7-86 191.7-191.7V575.9h-42.7v129.8z"
                          />
                          <path
                            d="M889.7 163.4c-22.9-22.9-53-34.4-83.1-34.4s-60.1 11.5-83.1 34.4L312 574.9c-16.9 16.9-27.9 38.8-31.2 62.5l-19 132.8c-1.6 11.4 7.3 21.3 18.4 21.3 0.9 0 1.8-0.1 2.7-0.2l132.8-19c23.7-3.4 45.6-14.3 62.5-31.2l411.5-411.5c45.9-45.9 45.9-120.3 0-166.2zM362 585.3L710.3 237 816 342.8 467.8 691.1 362 585.3zM409.7 730l-101.1 14.4L323 643.3c1.4-9.5 4.8-18.7 9.9-26.7L436.3 720c-8 5.2-17.1 8.7-26.6 10z m449.8-430.7l-13.3 13.3-105.7-105.8 13.3-13.3c14.1-14.1 32.9-21.9 52.9-21.9s38.8 7.8 52.9 21.9c29.1 29.2 29.1 76.7-0.1 105.8z"
                          />
                        </svg>
                      </button>
                    </div>
                    <!-- @click="toggleHistory" -->
                    <button
                      @click="toggleHistory"
                      :disabled="userStore.user.stage !== 'Контроль 1'"
                      class="px-4 py-1.5 rounded-full bg-white border font-semibold text-sm transition"
                      :class="userStore.user.stage === 'Контроль 1' 
                        ? 'hover:bg-blue-300 cursor-pointer' 
                        : 'opacity-50 cursor-not-allowed'"
                    >
                      История
                    </button>
                  </div>

                  <div>
                    <p class="text-sm text-gray-500 font-semibold">
                      Палитра — {{ model[0].nomenclature.color_name }}
                    </p>
                    <div class="flex items-center gap-3 mt-2">
                      <div
                        class="w-11 h-11 rounded-md border shadow-sm"
                        :style="{
                          background: model[0].nomenclature.color || '#ffffff',
                        }"
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
                </div>

                <div
                  class="flex items-center justify-center"
                  style="
                    width: clamp(120px, 18vw, 288px);
                    height: clamp(120px, 18vw, 288px);
                  "
                >
                  <div
                    class="rounded-full bg-white w-full h-full flex items-center justify-center shadow-2xl"
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
                      class="rounded-full shadow-lg transition-transform w-[clamp(96px,14vw,192px)] h-[clamp(96px,14vw,192px)] bg-center bg-cover"
                      :style="{
                        backgroundImage: `url(${
                          pressed
                            ? '/buttons/green-button.png'
                            : '/buttons/orange-button.png'
                        })`,
                      }"
                    ></button>
                  </div>
                  <!--<span
                    class="mt-5 text-lg font-bold select-none text-green-700"
                  >
                    {{ pressed ? 'Сдать' : 'Начать' }}
                  </span> :class="pressed ? 'text-green-700' : 'text-orange-600'" -->
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
        date_productionplan: model[0].date_productionplan,
        tape_number: model[0].tape_number,
        arrayStory: storyDetails,
      }"
      @save="handleSave"
      @close="openHistory = false"
    />    
  </Layout>
</template>

<script setup>
import Layout from "@/components/Layout.vue";
import ModalHistory from "@/components/ui/ModalHistory.vue";
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import api from "@/utils/axios";

const tasks = ref([]);
const model = ref([]);
const quantityChange = ref(false);
const changedQuantity = ref(null);
const router = useRouter();
const userStore = useUserStore();
const bigBtn = ref(null);
const pressed = ref(false);
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
  author: null
});

function handleSave(data) {
  Object.assign(DataStore, data);
  saveOrUpdateRow(DataStore);
  //openHistory.value = false;
}
function saveOrUpdateRow(newData) {
  const index = storyDetails.findIndex(
    row => row.article === newData.article && row.tape_number === newData.tape_number
  );
  if (index !== -1) {
    storyDetails[index] = { ...storyDetails[index], ...newData };
  } else {
    storyDetails.push({ ...newData });
  }
}
//-----------------------------------------------------------------------------------//

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
  } catch (error) {}
});

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
    showModel.value = true;

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
    photo.value = `data:image/jpeg;base64,${base64}`;
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
      (t) => t.productionplan === model.value[0].productionplan
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
    const index = storyDetails.findIndex(
      row =>
        row.article === model.value[0].nomenclature.article &&
        row.tape_number === model.value[0].tape_number
    );

    const detail = storyDetails[index] || {};

    const payload = {
      stage: model.value[0].stage.code,
      productionplan: model.value[0].productionplan,
      date_productionplan: model.value[0].date_productionplan,
      nomenclature: model.value[0].nomenclature.article,
      size: model.value[0].size,
      quantity: model.value[0].quantity,
      party: model.value[0].party,
      equipment: model.value[0].equipment,
      tape_number: model.value[0].tape_number,
      comment: "1",
      owner: userStore.user.name,

      // Story details 
      date: detail.date || "",
      width: detail.width || 0,
      mass: detail.mass || 0,
      brutto: detail.brutto || 0,
      netto: detail.netto || 0,
      machine: detail.machine || "",
      mode: detail.mode || "",
      comment_story: detail.comment || "",
      author: detail.author || "",
    };

    const response = await api.post("/v1/create_document", payload);

    const idx = tasks.value.findIndex(
      (t) => t.productionplan === model.value[0].productionplan
    );
    if (idx !== -1) {
      tasks.value.splice(idx, 1);
      showModel.value = false;
      //tasks.value[idx].status = "Завершен";
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
