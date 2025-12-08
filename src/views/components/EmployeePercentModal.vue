<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-lg shadow-xl w-full h-full max-w-5xl mx-4 max-h-[90vh] flex flex-col"
    >
      <div
        class="flex justify-between items-center px-6 rounded-md py-4 border-b bg-white"
      >
        <h3 class="text-xl font-semibold text-gray-800">Employees percent</h3>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <div class="p-4 overflow-y-auto flex-1">
        <table class="w-full border-collapse bg-white">
          <thead>
            <tr class="bg-gray-100 border-b border-gray-300">
              <th
                class="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                Сотрудник
              </th>
              <th
                class="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                Действия
              </th>
              <th
                class="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                Метраж
              </th>
              <th
                class="px-3 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                Этап
              </th>
              <th
                class="px-3 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                Сложность
              </th>
              <th
                class="px-3 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                Смена
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr
              v-for="(employee, index) in employees"
              :key="index"
              class="border-b border-gray-200 hover:bg-gray-50"
            >
              <td class="px-3 py-2.5">
                <div class="flex items-center gap-1">
                  <Listbox
                    :modelValue="employee"
                    @update:modelValue="(val) => updateEmployee(index, val)"
                    as="div"
                    class="flex-1"
                  >
                    <div class="relative overflow-visible">
                      <ListboxButton
                        class="relative w-full bg-gray-50 text-gray-700 text-sm rounded px-2 py-1.5 h-9 overflow-hidden text-left focus:outline-none focus:ring-1 focus:ring-blue-400 pr-8"
                      >
                        <span class="block truncate">{{
                          employee.name || "Выберите сотрудника"
                        }}</span>
                        <span
                          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                        >
                          <svg
                            class="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M6 8l4 4 4-4"
                            />
                          </svg>
                        </span>
                      </ListboxButton>
                      <transition
                        leave-active-class="transition duration-100 ease-in"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                      >
                        <ListboxOptions
                          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg focus:outline-none"
                        >
                          <ListboxOption
                            v-for="emp in availableEmployees"
                            :key="emp.GUID"
                            :value="emp"
                            v-slot="{ active, selected }"
                            class="cursor-pointer"
                          >
                            <div
                              :class="[ 
                                active ? 'bg-blue-100 text-blue-900' : 'text-gray-900',
                                'relative cursor-pointer select-none py-2 pl-3 pr-9'
                              ]"
                            >
                              <span
                                :class="[ selected ? 'font-semibold' : 'font-normal', 'block truncate' ]"
                              >
                                {{ emp.name }}
                              </span>
                              <span
                                v-if="selected"
                                :class="[ active ? 'text-blue-600' : 'text-blue-600', 'absolute inset-y-0 right-0 flex items-center pr-4' ]"
                              >
                                <svg
                                  class="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </span>
                            </div>
                          </ListboxOption>
                        </ListboxOptions>
                      </transition>
                    </div>
                  </Listbox>
                  <button
                    @click="clearEmployee(index)"
                    class="text-gray-400 hover:text-red-500 text-lg leading-none px-1"
                    title="Очистить"
                  >
                    ×
                  </button>
                </div>
              </td>
              <td class="px-3 py-2.5">
                <span class="text-sm text-gray-600">{{
                  employee.action?.name
                }}</span>
              </td>
              <td class="px-3 py-2.5">
                <input
                  type="number"
                  v-model.number="employee.percent"
                  class="w-full px-2 py-1.5 text-sm rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                  min="0"
                  max="100"
                  placeholder="0"
                />
              </td>
              <td class="px-3 py-2.5">
                <span class="w-full px-2 py-1.5 truncate block">{{ employee.stage?.name }}</span>
              </td>
              <td class="px-3 py-2.5">
                <span class="w-full px-2 py-1.5 truncate block">{{ employee.level?.name || props.level?.name }}</span>
              </td>
              <td class="px-3 py-2.5 text-center">
                <span class="w-36 text-blue-600 focus:ring-blue-500">
                  {{ employee.shift }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-end p-4 border-t space-x-2">
        <Button
          variant="secondary"
          @click="cancelRows"
        >
          Аннулировать
        </Button>

        <Button
          variant="secondary"
          @click="addRow"
        >
          Добавить
        </Button>

        <Button
          @click="saveChanges"
        >
          Сохранить
        </Button>
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
import { ref, watch, onMounted } from "vue";
import api from "@/utils/axios";
import { useUserStore } from "@/stores/user";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import WarningModal from "@/components/ui/WarningModal.vue";
import Button from "@/components/ui/Button.vue";

const userStore = useUserStore();

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  quantity: { type: Number, default: 0 },
  level: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["update:isOpen", "save", "cancel"]);

const rowData = ref({ name: "", GUID: "" });
const rowName = ref("");
const localQuantity = ref(props.quantity);

const availableEmployees = ref([]);

const employees = ref([]);

const showWarning = ref(false);
const warningMessage = ref("");

const addRow = () => {
  employees.value.push({
    name: "",
    GUID: "",
    action: { name: "", code: "" },
    percent: 0,
    stage: { name: userStore.user.stage, code: userStore.user.stage_code },
    shift: "",
    level: props.level || {},
  });
};

const updateEmployee = (index, selectedEmployee) => {
  if (!selectedEmployee) return;

  const existingPercent = employees.value[index]?.percent || 0;

  employees.value[index] = {
    name: selectedEmployee.name || "",
    GUID: selectedEmployee.GUID || "",
    action: selectedEmployee.action || { name: selectedEmployee.action?.name || "", code: selectedEmployee.action?.code || "" },
    percent: existingPercent,
    stage: selectedEmployee.stage || { name: userStore.user.stage, code: userStore.user.stage_code },
    shift: selectedEmployee.shift || "",
    level: props.level || selectedEmployee.level || {},
  };
};

const clearEmployee = (index) => {
  employees.value[index].name = "";
  employees.value[index].percent = 0;
};

const fetchRowData = async () => {
  try {
    const response = await api.get("/v1/operators/list", {
      params: { stage: userStore.user.stage_code },
    });

    const data = (response.data || []).map((item) => ({
      ...item,
      stage: {
        name: userStore.user.stage,
        code: userStore.user.stage_code,
      },
    }));

    if (Array.isArray(data)) {
      availableEmployees.value = data;
    }
  } catch (error) {
    console.error("Error fetching operators:", error);
  }
};

onMounted(async () => {
  try {
    await fetchRowData();
  } catch (error) {}
});

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      employees.value = [];
      fetchRowData();
      localQuantity.value = props.quantity;
    }
  }
);

const cancelRows = () => {
  employees.value.forEach((emp) => {
    emp.percent = 0;
  });
};

const closeModal = () => {
  emit("cancel");
  emit("update:isOpen", false);
};

const saveChanges = () => {
  let listToCalculate = employees.value;

  if (userStore.user.stage_code === "005") {
    listToCalculate = employees.value.filter(
      (emp) => emp.action?.code === "PWD"
    );
  }

  let filteredEmployees = listToCalculate.filter((emp) => emp.percent > 0);

  if (filteredEmployees.length === 0) {
    return;
  }

  const totalPercent = filteredEmployees.reduce(
    (sum, emp) => sum + (emp.percent || 0),
    0
  );

  if (userStore.user.stage_code === "005") {
    const nonPWDFiltered = employees.value.filter(
      (emp) => emp.action?.code !== "PWD" && emp.percent > 0
    );

    filteredEmployees = [...filteredEmployees, ...nonPWDFiltered];
  }

  emit("save", filteredEmployees);
  emit("update:isOpen", false);
};
</script>
