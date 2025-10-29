<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
  >
    <!-- @click.self="close" -->
    <div
      class="bg-white w-[90%] max-w-6xl max-h-[85vh] p-6 rounded-2xl relative flex flex-col shadow-2xl"
    >
      <h1 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-3">
        Дефекты
      </h1>
      <button
        @click="close"
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full p-2 transition"
      >
        <svg
          class="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <div v-if="isLoading" class="flex-1 flex items-center justify-center">
        <div class="loader"></div>
      </div>

      <div
        v-if="!isLoading"
        class="flex-1 overflow-auto rounded scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
      >
        <div class="overflow-x-auto bg-gray-100 p-4 rounded-xl">
          <div class="max-w-6xl mx-auto space-y-2">
            <div
              class="grid grid-cols-7 bg-gray-50 rounded-lg shadow text-sm font-semibold text-gray-700"
            >
              <div class="p-3 text-center">Дефект</div>
              <div class="p-3 text-center">Категория дефекта</div>
              <div class="p-3 text-center">Примечание</div>
              <div class="p-3 text-center">Местоположения</div>
              <div class="p-3 text-center">Протояженность</div>
              <div class="p-3 text-center">Оператор</div>
              <div class="p-3 text-center">Исправлено</div>
            </div>

            <div
              v-for="row in rows"
              :key="row.id"
              class="grid grid-cols-7 bg-white rounded-lg shadow text-sm hover:bg-blue-50 transition"
            >
              <div class="p-3 text-center">{{ row.defect?.name || "" }}</div>
              <div class="p-3 text-center">{{ row.category?.name || "" }}</div>
              <div class="p-3 text-center">{{ row.note || "" }}</div>
              <div class="p-3 text-center">{{ row.locations || "" }}</div>
              <div class="p-3 text-center">{{ row.length || "" }}</div>
              <div class="p-3 text-center">{{ row.operator || "" }}</div>
              <div class="p-3 flex justify-center items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  v-model="row.fixed"
                  @change="onFixedChange(row)"
                  :disabled="!isRejectionStage"
                  :class="[
                    'w-4 h-4 rounded-sm border-gray-300 focus:ring-blue-500 transition',
                    isRejectionStage
                      ? 'bg-gray-100 text-blue-600 cursor-pointer hover:opacity-90'
                      : 'bg-gray-200 opacity-40 cursor-not-allowed',
                  ]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end mt-5">
        <button
          v-if="!isLoading"
          :disabled="!isControlStage"
          @click="openForm"
          :class="[
            'text-white font-semibold py-2 px-5 rounded-xl shadow-lg transition-colors',
            isControlStage
              ? 'bg-indigo-600 hover:opacity-90 cursor-pointer'
              : 'bg-gray-200 opacity-50 cursor-not-allowed',
          ]"
        >
          Добавить
        </button>
      </div>
    </div>

    <div
      v-if="showForm"
      class="fixed inset-0 bg-black/40 flex justify-center items-center z-60"
      @click.self="closeForm"
    >
      <div class="bg-white p-6 rounded-xl w-[600px] shadow-xl">
        <h2 class="text-lg font-bold mb-4">Новая запись</h2>

        <form @submit.prevent="addRow" class="grid grid-cols-2 gap-4">
          <Listbox v-model="newRow.defect">
            <div class="relative">
              <ListboxButton
                @click="fetchDefects"
                class="w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/40 backdrop-blur-sm text-left flex justify-between items-center"
              >
                <span>
                  {{ newRow.defect?.name || "Выберите Дефект..." }}
                </span>
                <svg
                  class="w-5 h-5 ml-2 text-gray-500"
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
                class="absolute mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50"
              >
                <ListboxOption
                  v-if="isLoadingDefects"
                  class="flex-1 flex items-center justify-center"
                >
                  <div class="loader w-10 h-10"></div>
                </ListboxOption>

                <ListboxOption
                  v-else
                  v-for="def in defects"
                  :key="def.code"
                  :value="def"
                  class="cursor-pointer p-2 hover:bg-blue-50"
                >
                  <div class="flex justify-between items-center">
                    <span>{{ def.name }}</span>
                    <span class="text-gray-400 text-sm">{{ def.code }}</span>
                  </div>
                </ListboxOption>
              </ListboxOptions>
            </div>
          </Listbox>
          <!-- bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full -->

          <Listbox v-model="newRow.category">
            <div class="relative">
              <ListboxButton
                @click="fetchDefectCategoryes"
                class="w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/40 backdrop-blur-sm text-left flex justify-between items-center"
              >
                <span>
                  {{ newRow.category?.name || "Выберите категорию..." }}
                </span>
                <svg
                  class="w-5 h-5 ml-2 text-gray-500"
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
                class="absolute mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50"
              >
                <ListboxOption
                  v-if="isLoadingCategoryes"
                  class="flex items-center justify-center py-4"
                >
                  <div class="loader w-10 h-10"></div>
                </ListboxOption>

                <ListboxOption
                  v-else
                  v-for="cat in defectCategoryes"
                  :key="cat.code"
                  :value="cat"
                  class="cursor-pointer p-2 hover:bg-blue-50"
                >
                  <div class="flex justify-between items-center">
                    <span>{{ cat.name }}</span>
                    <span class="text-gray-400 text-sm">{{ cat.code }}</span>
                  </div>
                </ListboxOption>
              </ListboxOptions>
            </div>
          </Listbox>

          <input
            v-model="newRow.locations"
            type="number"
            inputmode="decimal"
            step="any"
            placeholder="Местоположения"
            class="input"
          />
          <input
            v-model="newRow.length"
            type="number"
            inputmode="decimal"
            step="any"
            placeholder="Протояженность"
            class="input"
          />

          <input
            v-model="newRow.note"
            type="text"
            placeholder="Примечание"
            class="input col-span-2"
          />
          <input
            :value="newRow.operator"
            type="text"
            placeholder="Оператор"
            class="input col-span-2"
            disabled
          />

          <div class="col-span-2 flex justify-end space-x-3 mt-3">
            <button
              type="button"
              @click="closeForm"
              class="bg-gray-200 text-gray-800 hover:bg-gray-300 font-semibold py-2 px-5 rounded-xl shadow"
            >
              Отмена
            </button>
            <button
              type="submit"
              class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-xl shadow"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
    <WarningModal
      v-if="showWarning"
      :message="warningMessage"
      @close="showWarning = false"
    />
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, computed } from "vue";
import { Datepicker } from "flowbite-datepicker";
import { useUserStore } from "@/stores/user";
import api from "@/utils/axios";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import WarningModal from "@/components/ui/WarningModal.vue";
import { useDefectStore } from "@/stores/defects";

const defectStore = useDefectStore();
const emit = defineEmits(["close"]);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const show = ref(true);
const showForm = ref(false);
const userStore = useUserStore();
const datepickerInput = ref(null);
const isLoading = ref(false);
const rows = ref([]);
const warningMassage = ref("");
const isControlStage = computed(() =>
  ["Контроль 1", "Контроль 2", "Контроль 3"].includes(userStore.user.stage)
);
const isRejectionStage = computed(() =>
  ["Браковка", "Браковка 2"].includes(userStore.user.stage)
);

const today = new Date();
const formatDate = (d) =>
  `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}.${d.getFullYear()}`;

const newRow = ref({
  defect: { name: "", code: "" },
  category: { name: "", code: "" },
  note: "",
  locations: "",
  length: "",
  operator: userStore.user.name,
  fixed: false,
  article: props.data.article,
  productionplan: props.data.productionplan,
  date_productionplan: props.data.date_productionplan,
  tape_number: props.data.tape_number,
  color: props.data.color,
});

const defects = ref([]);
const defectCategoryes = ref([]);

const close = () => {
  emit("close");
};

const openForm = async () => {
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
};

const showWarning = ref(false);
const warningMessage = ref("");

const validateFields = () => {
  switch (true) {
    case !newRow.value.defect || !newRow.value.defect.name:
      warningMessage.value = "Введите дефект!";
      showWarning.value = true;
      return false;

    case !newRow.value.category || !newRow.value.category.name:
      warningMessage.value = "Введите категорию дефекта!";
      showWarning.value = true;
      return false;

    case !newRow.value.locations:
      warningMessage.value = "Введите Местоположения!";
      showWarning.value = true;
      return false;

    case !newRow.value.length:
      warningMessage.value = "Введите Протояженность!";
      showWarning.value = true;
      return false;

    case !newRow.value.note:
      warningMessage.value = "Введите Примечание!";
      showWarning.value = true;
      return false;

    default:
      return true;
  }
};

const addRow = () => {
  if (!validateFields()) return;

  defectStore.addRow(newRow.value);
  rows.value.push({ ...newRow.value });

  newRow.value = {
    defect: { name: "", code: "" },
    category: { name: "", code: "" },
    note: "",
    locations: "",
    length: "",
    operator: userStore.user.name,
    fixed: false,
    article: props.data.article,
    productionplan: props.data.productionplan,
    date_productionplan: props.data.date_productionplan,
    tape_number: props.data.tape_number,
    color: props.data.color,
  };

  closeForm();
};

onMounted(async () => {
  isLoading.value = true;

  try {
    // const response = await api.get("/v1/model/defects", {
    //   params: {
    //     article: props.data.article,
    //     productionplan: props.data.productionplan,
    //     date_productionplan: props.data.date_productionplan,
    //     tape_number: props.data.tape_number,
    //     color: props.data.color,
    //   },
    // });

    // rows.value = response.data;

    const foundDefects = defectStore.rows.filter(
      (row) =>
        row.article === props.data.article &&
        row.productionplan === props.data.productionplan &&
        row.tape_number === props.data.tape_number &&
        row.color === props.data.color
    );

    rows.value.push(...foundDefects);
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
});

const isLoadingDefects = ref(false);

async function fetchDefects() {
  if (isLoadingDefects.value) return;
  isLoadingDefects.value = true;
  try {
    const response = await api.get("/v1/defects");
    defects.value = response.data;
  } catch (error) {
  } finally {
    isLoadingDefects.value = false;
  }
}

const isLoadingCategoryes = ref(false);

async function fetchDefectCategoryes() {
  if (isLoadingCategoryes.value) return;
  isLoadingCategoryes.value = true;
  try {
    const response = await api.get("/v1/defects/category");
    defectCategoryes.value = response.data;
  } catch (error) {
  } finally {
    isLoadingCategoryes.value = false;
  }
}

function onFixedChange(row) {
  defectsArray.forEach((row) => {
  const matchingRows = defectStore.rows.filter((r) =>
    r.defect?.code === row.defect?.code &&
    r.category?.code === row.category?.code &&
    r.note === row.note &&
    r.locations === row.locations &&
    r.length === row.length &&
    r.operator === row.operator &&
    r.article === (row.article || "") &&
    r.productionplan === (row.productionplan || "") &&
    r.tape_number === (row.tape_number || "") &&
    r.color === (row.color || "")
  );

  matchingRows.forEach((r) => {
    r.fixed = !!row.fixed; 
  });
});
}
</script>

<style scoped>
.input {
  @apply border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400;
}
</style>
