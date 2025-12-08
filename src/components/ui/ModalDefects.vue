<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
  >
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
            <!-- Table Headers -->
            <div
              class="grid grid-cols-10 bg-gray-50 rounded-lg shadow text-sm font-semibold text-gray-700"
            >
              <div class="p-3 text-center">Дефект</div>
              <div class="p-3 text-center">Категория дефекта</div>
              <div class="p-3 text-center">Примечание</div>
              <div class="p-3 text-center">Местопол.</div>
              <div class="p-3 text-center">Протояженн.</div>
              <div class="p-3 text-center">Метр исправлено</div>
              <div class="p-3 text-center">Остаток брака</div>
              <div class="p-3 text-center">Оператор</div>
              <div class="p-3 text-center">Исправлено</div>
              <div class="p-3 text-center">Действия</div>
            </div>

            <!-- Table Rows -->
            <div
              v-for="(row, index) in rows"
              :key="row.uuid || row.id"
              @click="handleRowClick(row)"
              :class="[
                'grid grid-cols-10 bg-white rounded-lg shadow text-sm transition',
                canEdit
                  ? 'hover:bg-blue-100 cursor-pointer'
                  : 'hover:bg-blue-50',
              ]"
            >
              <div 
                class="p-3 text-center truncate max-w-[135px] mx-auto"
                :title="row.defect?.name || ''"
              >
                {{ row.defect?.name || "" }}
              </div>
              <div 
                class="p-3 text-center truncate max-w-[150px] mx-auto"
                :title="row.category?.name || ''"
              >
                {{ row.category?.name || "" }}
              </div>
              <div class="p-3 text-center">{{ row.note || "" }}</div>
              <div class="p-3 text-center">{{ row.locations || "" }}</div>
              <div class="p-3 text-center">{{ row.length || "" }}</div>
              <div class="p-3 text-center">{{ row.correctedMeter || "" }}</div>
              <div class="p-3 text-center">{{ row.defectBalance || "" }}</div>
              <div 
                class="p-3 text-center truncate max-w-[150px] mx-auto"
                :title="row.operator?.name || ''"
              >
                {{ row.operator?.name || "" }}
              </div>
              <div class="p-3 flex justify-center items-center">
                <input
                  type="checkbox"
                  v-model="row.fixed"
                  @change="onFixedChange(row)"
                  @click.stop
                  :disabled="userStore.user.stage_code !== '017'"
                  :class="[
                    'w-4 h-4 rounded-sm border-gray-300 focus:ring-blue-500 transition',
                    userStore.user.stage_code === '017'
                      ? 'bg-gray-100 text-blue-600 cursor-pointer hover:opacity-90'
                      : 'bg-gray-200 opacity-40 cursor-not-allowed',
                  ]"
                />
              </div>
              <div class="p-3 flex justify-center items-center">
                <button
                  v-if="canDelete(row)"
                  @click.stop="confirmDelete(row.uuid)"
                  class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition"
                  title="Удалить"
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="flex justify-end mt-5 gap-4">
        <button
          @click="close"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Закрыть
        </button>
        <button
          v-if="!isLoading"
          :disabled="!canEdit"
          @click="openForm"
          :class="[
            'px-4 py-2 text-sm font-medium text-white rounded-sm',
            canEdit
              ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              : 'bg-gray-400 cursor-not-allowed opacity-60'
          ]"
        >
          Добавить
        </button>
      </div>
    </div>

    <!-- Form Modal -->
    <div
      v-if="showForm"
      class="fixed inset-0 bg-black/40 flex justify-center items-center z-60"
      @click.self="closeForm"
    >
      <div class="bg-white p-6 rounded-xl w-[600px] shadow-xl">
        <h2 class="text-lg font-bold mb-4">
          {{ editingIndex !== null ? "Редактировать запись" : "Новая запись" }}
        </h2>

        <form
          @submit.prevent="editingIndex !== null ? updateRow() : addRow()"
          class="grid grid-cols-2 gap-4"
        >
          <!-- Form Fields -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Дефект</label
            >
            <Listbox v-model="newRow.defect">
              <div class="relative">
                <ListboxButton
                  @click="fetchDefects"
                  class="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/40 backdrop-blur-sm text-left flex justify-between items-center"
                >
                  <span class="text-gray-600">
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
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Категория</label
            >
            <Listbox v-model="newRow.category">
              <div class="relative">
                <ListboxButton
                  @click="fetchDefectCategoryes"
                  class="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/40 backdrop-blur-sm text-left flex justify-between items-center"
                >
                  <span class="text-gray-600">
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
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Местоположения</label
            >
            <input
              v-model="newRow.locations"
              type="number"
              inputmode="decimal"
              step="any"
              placeholder=""
              class="input"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Протяженность</label
            >
            <input
              v-model="newRow.length"
              type="number"
              inputmode="decimal"
              step="any"
              placeholder=""
              class="input"
              @change="onLengthChange(newRow)"
            />
          </div>

          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Примечание</label
            >
            <input
              v-model="newRow.note"
              type="text"
              placeholder=""
              class="input w-full"
            />
          </div>

          <div v-if="userStore.user.stage_code !== '005'">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Исправлено (м)</label
            >
            <input
              v-model="newRow.correctedMeter"
              type="number"
              inputmode="decimal"
              step="any"
              placeholder=""
              class="input"
              @change="onCorrectedMeterChange(newRow)"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Остаток брака (м)</label
            >
            <input
              v-model="newRow.defectBalance"
              type="number"
              inputmode="decimal"
              step="any"
              placeholder=""
              class="input"
              readonly
            />
          </div>

          <div v-if="userStore.user.stage_code !== '005'" class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Оператор</label
            >
            <Listbox v-model="newRow.operator">
              <div class="relative">
                <ListboxButton
                  @click="fetchOperators"
                  class="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/40 backdrop-blur-sm text-left flex justify-between items-center"
                >
                  <span class="text-gray-600">
                    {{ newRow.operator?.name || "Выберите оператора..." }}
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
                  class="absolute bottom-full mb-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50"
                >
                  <ListboxOption
                    v-if="isLoadingOperators"
                    class="flex items-center justify-center py-4"
                  >
                    <div class="loader w-10 h-10"></div>
                  </ListboxOption>

                  <ListboxOption
                    v-else
                    v-for="operator in operators"
                    :key="operator.GUID"
                    :value="operator"
                    class="cursor-pointer p-2 hover:bg-blue-50"
                  >
                    <div class="flex justify-between items-center">
                      <span>{{ operator.name }}</span>
                    </div>
                  </ListboxOption>
                </ListboxOptions>
              </div>
            </Listbox>
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

    <DeleteConfirmationModal
      v-if="showDeleteConfirm"
      :show="showDeleteConfirm"
      @close="showDeleteConfirm = false"
      @confirm="deleteRow"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineAsyncComponent } from "vue";
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

const DeleteConfirmationModal = defineAsyncComponent(() =>
  import('@/views/components/DeleteConfirmationModal.vue')
);

async function getUuid() {
  const { uuid } = await import("@/utils/uuid");
  return uuid();
}

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
const showDeleteConfirm = ref(false);
const editingIndex = ref(null);
const userStore = useUserStore();
const isLoading = ref(false);
const rows = ref([]);

const isControlStage = computed(() =>
  ["005", "013", "017"].includes(userStore.user.stage_code)
);

const isRejectionStage = computed(() =>
  ["006", "014"].includes(userStore.user.stage_code)
);

const canEdit = computed(() => isControlStage.value || isRejectionStage.value);

const newRow = ref(createNewRow());

function createNewRow() {
  return {
    defect: { name: "", code: "" },
    category: { name: "", code: "" },
    note: "",
    locations: "",
    length: "",
    operator: { name: "", GUID: "" },
    correctedMeter: "",
    defectBalance: "",
    fixed: false,
    uuid: "",
    article: props.data.article,
    productionplan: props.data.productionplan,
    date_productionplan: props.data.date_productionplan,
    tape_number: props.data.tape_number,
    color: props.data.color,
  };
}

const defects = ref([]);
const defectCategoryes = ref([]);
const operators = ref([]);
const isLoadingDefects = ref(false);
const isLoadingCategoryes = ref(false);
const isLoadingOperators = ref(false);
const showWarning = ref(false);
const warningMessage = ref("");
const deleteUuid = ref(null);

const close = () => {
  emit("close");
};

const openForm = async () => {
  editingIndex.value = null;
  newRow.value = createNewRow();
  newRow.value.uuid = await getUuid();
  showForm.value = true;
};

const closeForm = () => {
  editingIndex.value = null;
  showForm.value = false;
};

const handleRowClick = (row) => {
  if (canEdit.value) {
    editRow(row);
  }
};

const editRow = (row) => {
  editingIndex.value = rows.value.findIndex(r => r.uuid === row.uuid);
  newRow.value = JSON.parse(JSON.stringify(row));
  showForm.value = true;
};

const updateRow = () => {
  if (editingIndex.value === null) return;

  rows.value[editingIndex.value] = { ...newRow.value };
  
  const defectIndex = defectStore.rows.findIndex(
    r => r.uuid === newRow.value.uuid
  );
  
  if (defectIndex !== -1) {
    defectStore.rows[defectIndex] = { ...newRow.value };
  }
  
  closeForm();
};

const validateFields = () => {
  if (!newRow.value.defect || !newRow.value.defect.name) {
    warningMessage.value = "Введите дефект!";
    showWarning.value = true;
    return false;
  }

  if (!newRow.value.category || !newRow.value.category.name) {
    warningMessage.value = "Введите категорию дефекта!";
    showWarning.value = true;
    return false;
  }

  if (!newRow.value.locations) {
    warningMessage.value = "Введите Местоположения!";
    showWarning.value = true;
    return false;
  }

  if (!newRow.value.length) {
    warningMessage.value = "Введите Протояженность!";
    showWarning.value = true;
    return false;
  }

  if (!newRow.value.note) {
    warningMessage.value = "Введите Примечание!";
    showWarning.value = true;
    return false;
  }

  return true;
};

const addRow = () => {
  if (!validateFields()) return;

  defectStore.addRow(newRow.value);
  rows.value.push({ ...newRow.value });
  closeForm();
};

const canDelete = (row) => {
  return canEdit.value; 
};

const confirmDelete = (uuid) => {
  deleteUuid.value = uuid;
  showDeleteConfirm.value = true;
};

const deleteRow = () => {
  if (!deleteUuid.value) return;

  const rowIndex = rows.value.findIndex(r => r.uuid === deleteUuid.value);
  if (rowIndex !== -1) {
    rows.value.splice(rowIndex, 1);
  }

  const defectIndex = defectStore.rows.findIndex(
    r => r.uuid === deleteUuid.value
  );
  
  if (defectIndex !== -1) {
    defectStore.rows.splice(defectIndex, 1);
  }

  showDeleteConfirm.value = false;
  deleteUuid.value = null;
};

onMounted(async () => {
  isLoading.value = true;

  const foundDefects = defectStore.rows.filter(
    (row) =>
      row.article === props.data.article &&
      row.productionplan === props.data.productionplan &&
      row.tape_number === props.data.tape_number &&
      row.color === props.data.color
  );

  rows.value = foundDefects.map((r) => ({
    ...r,
    saved: !!(r.operator?.GUID),
  }));

  isLoading.value = false;
});

async function fetchDefects() {
  if (isLoadingDefects.value) return;
  isLoadingDefects.value = true;
  try {
    const response = await api.get("/v1/defects");
    defects.value = response.data;
  } catch (error) {
    console.error("Error fetching defects:", error);
  } finally {
    isLoadingDefects.value = false;
  }
}

async function fetchDefectCategoryes() {
  if (isLoadingCategoryes.value) return;
  isLoadingCategoryes.value = true;
  try {
    const response = await api.get("/v1/defects/category");
    defectCategoryes.value = response.data;
  } catch (error) {
    console.error("Error fetching defect categories:", error);
  } finally {
    isLoadingCategoryes.value = false;
  }
}

async function fetchOperators() {
  if (isLoadingOperators.value) return;
  isLoadingOperators.value = true;
  try {
    const response = await api.get("/v1/operators/list", {
      params: { stage: userStore.user.stage_code },
    });
    operators.value = response.data;
  } catch (error) {
    console.error("Error fetching operators:", error);
  } finally {
    isLoadingOperators.value = false;
  }
}

function onFixedChange(row) {
  const foundIndex = defectStore.rows.findIndex(
    (r) => r.uuid === row.uuid
  );
  
  if (foundIndex !== -1) {
    defectStore.rows[foundIndex].fixed = row.fixed;
  }
}

function onLengthChange(row) {
  row.defectBalance = row.length;
  if (row.correctedMeter) {
    onCorrectedMeterChange(row);
  }
}

function onCorrectedMeterChange(row) {
  if (row.correctedMeter > row.length) {
    row.correctedMeter = row.length;
  }
  row.defectBalance = Math.max(0, row.length - (row.correctedMeter || 0));
}
</script>

<style scoped>
.input {
  @apply border border-gray-300 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400;
}

.loader {
  @apply animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600;
}
</style>