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
        История
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
              class="grid grid-cols-9 bg-gray-50 rounded-lg shadow text-sm font-semibold text-gray-700"
            >
              <div class="p-3 text-center">Дата</div>
              <div class="p-3 text-center">Ширина</div>
              <div class="p-3 text-center">Масса</div>
              <div class="p-3 text-center">Брутто метр</div>
              <div class="p-3 text-center">Нетто метр</div>
              <div class="p-3 text-center">Номер ткацкого станка</div>
              <div class="p-3 text-center">Режим обработки</div>
              <div class="p-3 text-center">Комментарий</div>
              <div class="p-3 text-center">Автор</div>
            </div>

            <div
              v-for="row in rows"
              :key="row.id"
              class="grid grid-cols-9 bg-white rounded-lg shadow text-sm hover:bg-blue-50 transition"
            >
              <div class="p-3 text-center">{{ row.date }}</div>
              <div class="p-3 text-center">{{ row.width }}</div>
              <div class="p-3 text-center">{{ row.mass }}</div>
              <div class="p-3 text-center">{{ row.brutto }}</div>
              <div class="p-3 text-center">{{ row.netto }}</div>
              <div 
                class="p-3 text-center truncate max-w-[150px] mx-auto"
                :title="row.machine.name"
                >
                {{ row.machine.name }}
              </div>
              <div class="p-3 text-center">{{ row.mode }}</div>
              <div 
                class="p-3 text-left truncate max-w-[150px]"
                :title="row.comment"
                >
                {{ row.comment }}
              </div>
              <div 
                class="p-3 text-left font-medium text-blue-600 truncate max-w-[150px] mx-auto"
                :title="row.author.name"
                >
                {{ row.author.name }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end mt-5">
        <button
          v-if="!isLoading"
          @click="openForm"
          :disabled="!isControlStage"
          :class="[
            'text-white font-semibold py-2 px-5 rounded-xl shadow-lg transition',
            isControlStage
              ? 'bg-indigo-600 hover:opacity-90 cursor-pointer'
              : 'bg-gray-400 cursor-not-allowed opacity-60'
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
          <div class="relative max-w-sm flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Дата</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
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
                ref="datepickerInput"
                v-model="newRow.date"
                type="text"
                placeholder="Выберите дату"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              />
            </div>
          </div>

          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Ширина</label
            >
            <input
              v-model="newRow.width"
              type="number"
              inputmode="decimal"
              step="any"
              placeholder=""
              class="input"
            />
          </div>

          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Масса</label
            >
            <input
              v-model="newRow.mass"
              type="number"
              inputmode="decimal"
              step="any"
              placeholder=""
              class="input"
            />
          </div>

          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Брутто</label
            >
            <input
              v-model="newRow.brutto"
              type="number"
              inputmode="decimal"
              step="any"
              placeholder=""
              class="input"
            />
          </div>

          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Нетто</label
            >
            <input
              v-model="newRow.netto"
              type="number"
              inputmode="decimal"
              step="any"
              placeholder=""
              class="input"
            />
          </div>

          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Режим</label
            >
            <input
              v-model="newRow.mode"
              type="text"
              placeholder=""
              class="input"
            />
          </div>

          <div class="col-span-2 relative z-20 flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Машина</label
            >
            <Listbox v-model="newRow.machine">
              <div class="relative">
                <ListboxButton
                  @click="fetchMachines"
                  class="w-full p-2 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/40 backdrop-blur-sm text-left flex justify-between items-center"
                >
                  <span>
                    {{
                      newRow.machine
                        ? newRow.machine.name
                        : "Выберите машину..."
                    }}
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
                    v-if="isLoadingMachines"
                    class="flex-1 flex items-center justify-center"
                  >
                    <div class="loader w-10 h-10"></div>
                  </ListboxOption>

                  <ListboxOption
                    v-else
                    v-for="m in machines"
                    :key="m.code"
                    :value="m"
                    class="cursor-pointer p-2 hover:bg-blue-50"
                  >
                    <div class="flex justify-between items-center">
                      <span>{{ m.name }}</span>
                      <span class="text-gray-400 text-sm">{{ m.code }}</span>
                    </div>
                  </ListboxOption>
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          <div class="col-span-2 flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Комментарий</label
            >
            <input
              v-model="newRow.comment"
              type="text"
              placeholder=""
              class="input"
            />
          </div>

          <div
            v-if="userStore.user.stage_code === '017'"
            class="col-span-1 relative flex flex-col"
          >
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Сорт</label
            >
            <Listbox v-model="newRow.sort">
              <div class="relative">
                <ListboxButton
                  @click="fetchFabricGrade"
                  class="w-full p-2 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/40 backdrop-blur-sm text-left flex justify-between items-center"
                >
                  <span>
                    {{
                      newRow.sort?.name ? newRow.sort.name : "Выберите сорт..."
                    }}
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
                    v-if="isLoadingGrades"
                    class="flex-1 flex items-center justify-center"
                  >
                    <div class="loader w-10 h-10"></div>
                  </ListboxOption>

                  <ListboxOption
                    v-else
                    v-for="sort in grades"
                    :key="sort.code"
                    :value="sort"
                    class="cursor-pointer p-2 hover:bg-blue-50"
                  >
                    <div class="flex justify-between items-center">
                      <span>{{ sort.name }}</span>
                      <span class="text-gray-400 text-sm">{{ sort.code }}</span>
                    </div>
                  </ListboxOption>
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Автор</label
            >
            <input
              :value="newRow.author.name"
              type="text"
              class="input"
              :class="[userStore.user.stage_code === '017' ? 'col-span-1' : 'col-span-2']"
              disabled
            />
          </div>

          <div v-if="userStore.user.stage_code === '017'" class="col-span-1 flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Лот</label
            >
            <input
              v-model="newRow.lot"
              type="text"
              placeholder=""
              class="input"
            />
          </div>

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
  ["005", "013", "017"].includes(userStore.user.stage_code)
); // 005: Контроль 1, 013: Контроль 2, 017: Контроль 3

const today = new Date();
const formatDate = (d) =>
  `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}.${d.getFullYear()}`;

// const arrayDefects = props.data.arrayDefects;
// const defectsrows = Array.isArray(arrayDefects?.rows) ? arrayDefects.rows : [];

// const foundDefects = defectsrows.filter(
//   (row) =>
//     row.article === props.data.article &&
//     row.tape_number === props.data.tape_number &&
//     row.productionplan === props.data.productionplan &&
//     row.color === props.data.color
// );

// let nettoCalculated = props.data.netto;

// if (["Контроль 1"].includes(userStore.user?.stage)) {
//   const falseCount = foundDefects.filter(d => d.fixed === false).length;
//   nettoCalculated = props.data.quantity - falseCount * 0.10;
// }

// else if (["Контроль 2", "Контроль 3"].includes(userStore.user?.stage)) {
//   const trueCount = foundDefects.filter(d => d.fixed === false).length;
//   nettoCalculated = props.data.brutto - trueCount * 0.10;
// }

// else if (["Браковка", "Браковка 2"].includes(userStore.user?.stage)) {
//   const trueCount = foundDefects.filter(d => d.fixed === true).length;
//   const falseCount = foundDefects.filter(d => d.fixed === false).length;
//   nettoCalculated = props.data.brutto - (falseCount + trueCount) * 0.10;
//   nettoCalculated = nettoCalculated + trueCount * 0.10;
// }

const newRow = ref({
  date: formatDate(today),
  width: "150",
  mass: "",
  brutto: props.data.quantity,
  netto: props.data.netto,
  machine: { name: props.data.machine.name, code: props.data.machine.code },
  mode: "",
  comment: "",
  lot: "",
  sort: { name: "", code: "" },
  author: { name: userStore.user.name, GUID: userStore.user.GUID },
});

const machines = ref([]);
const grades = ref([]);

const close = () => {
  emit("close");
};

const openForm = async () => {
  showForm.value = true;

  await nextTick();

  if (datepickerInput.value) {
    const picker = new Datepicker(datepickerInput.value, {
      autohide: true,
      format: "dd.mm.yyyy",
    });

    datepickerInput.value.addEventListener("changeDate", (e) => {
      const target = e.target;
      newRow.value.date = target.value;
    });
  }
};

const closeForm = () => {
  showForm.value = false;
};

const showWarning = ref(false);
const warningMessage = ref("");

const validateFields = () => {
  switch (true) {
    case !newRow.value.date:
      warningMessage.value = "Введите дату!";
      showWarning.value = true;
      return false;

    case !newRow.value.width:
      warningMessage.value = "Введите ширину!";
      showWarning.value = true;
      return false;

    case !newRow.value.mass:
      warningMessage.value = "Введите массу!";
      showWarning.value = true;
      return false;

    case !newRow.value.brutto:
      warningMessage.value = "Введите брутто!";
      showWarning.value = true;
      return false;

    case !newRow.value.netto:
      warningMessage.value = "Введите нетто!";
      showWarning.value = true;
      return false;
    
    case userStore.user.stage_code === "017" && !newRow.value.lot:
      warningMessage.value = "Введите Лот!";
      showWarning.value = true;
      return false;

    case !newRow.value.machine?.name:
      warningMessage.value = "Заполните ткательную машину!";
      showWarning.value = true;
      return false;

    case userStore.user.stage_code === "017" && !newRow.value.sort?.name:
      warningMessage.value = "Заполните сорт!";
      showWarning.value = true;
      return false;

    default:
      return true;
  }
};

const addRow = () => {
  if (!validateFields()) return;

  saveData(newRow.value);
  rows.value.push({ ...newRow.value });
  Object.keys(newRow.value).forEach((key) => (newRow.value[key] = ""));
  newRow.value.date = formatDate(new Date());
  closeForm();
};

function fillLastRowFields() {
  if (!rows.value.length) return;

  const lastRow = rows.value[rows.value.length - 1];

  Object.assign(newRow.value, {
    mass: lastRow.mass,
    mode: lastRow.mode,
    machine: lastRow.machine,
  });
}

onMounted(async () => {
  isLoading.value = true;

  try {
    const response = await api.get("/v1/story_details", {
      params: {
        article: props.data.article,
        productionplan: props.data.productionplan,
        date_productionplan: props.data.date_productionplan,
        tape_number: props.data.tape_number,
        color: props.data.color,
      },
    });

    rows.value = response.data;

    const index = props.data.arrayStory.findIndex(
      (row) =>
        row.article === props.data.article &&
        row.tape_number === props.data.tape_number &&
        row.productionplan === props.data.productionplan &&
        row.color === props.data.color
    );

    if (index !== -1) {
      const detail = props.data.arrayStory[index];
      rows.value.push({ ...detail });
    }
    fillLastRowFields();
  } catch (error) {
  } finally {
    isLoading.value = false;
  }

  if (datepickerInput.value) {
    const picker = new Datepicker(datepickerInput.value, {
      autohide: true,
      format: "dd.mm.yyyy",
    });

    datepickerInput.value.addEventListener("changeDate", (e) => {
      const target = e.target;
      newRow.value.date = target.value;
    });
  }
});

const isLoadingMachines = ref(false);

async function fetchMachines() {
  if (isLoadingMachines.value) return;
  isLoadingMachines.value = true;
  try {
    const response = await api.get("/v1/number_machines", {
      params: { stage: userStore.user.stage_code },
    });
    machines.value = response.data;
  } catch (error) {
  } finally {
    isLoadingMachines.value = false;
  }
}

const isLoadingGrades = ref(false);

async function fetchFabricGrade() {
  if (isLoadingGrades.value) return;
  isLoadingGrades.value = true;
  try {
    const response = await api.get("/v1/fabric/grade");
    grades.value = response.data;
  } catch (error) {
  } finally {
    isLoadingGrades.value = false;
  }
}

const emit = defineEmits(["save"]);

const date = ref(null);
const width = ref("");
const mass = ref(0);
const brutto = ref(0);
const netto = ref(0);
const machine = ref(null);
const mode = ref(null);
const comment = ref(null);
const lot = ref(null);
const sort = ref(null);
const author = ref(null);

function saveData(newData) {
  emit("save", {
    article: props.data.article,
    tape_number: props.data.tape_number,
    productionplan: props.data.productionplan,
    color: props.data.color,
    date: newData.date,
    width: newData.width,
    mass: newData.mass,
    brutto: newData.brutto,
    netto: newData.netto,
    machine: newData.machine,
    mode: newData.mode,
    comment: newData.comment,
    lot: newData.lot,
    sort: newData.sort,
    author: newData.author,
  });
}
</script>

<style scoped>
.input {
  @apply border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400;
}
</style>
