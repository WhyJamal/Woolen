<template>
  <div class="fixed inset-0 bg-gray-50 p-6 overflow-auto">
    <div class="w-full h-full">
      <!-- Rounded olib tashladim va flex-grow qo‘shdim -->
      <div class="bg-white w-full h-full flex flex-col overflow-hidden">
        <!-- Header -->
        <div class="px-4 py-3 bg-yellow-300 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-yellow-900">
            Слиттинг формаси
          </h2>
          <div
            class="text-sm w-10 h-10 text-yellow-900 opacity-80 rounded-full bg-gray-100"
          >
            ...
          </div>
        </div>

        <form @submit.prevent="save" class="p-4 grid flex-1 overflow-auto">
          <!-- Row 1: деталь / код -->
          <div class="grid grid-cols-12 gap-3 items-center">
            <label class="text-sm ml-10">Деталь</label>
            <input
              v-model="form.detail"
              class="col-span-4 p-2 rounded-md border focus:outline-none"
            />
            <label class="col-span-1 text-sm ml-10">Код</label>
            <input
              v-model="form.code"
              class="col-span-3 p-2 rounded-md border focus:outline-none"
            />
          </div>

          <!-- Row 2: рулон / Артикул -->
          <div class="grid grid-cols-12 gap-3 items-center">
            <label class="text-sm ml-10">Рулон</label>
            <input
              v-model="form.roll"
              class="col-span-4 p-2 rounded-md border focus:outline-none"
            />
            <label class="col-span-1 text-sm ml-10">Артикул</label>
            <input
              v-model="form.article"
              class="col-span-3 p-2 rounded-md border focus:outline-none"
            />
          </div>

          <!-- Row 3: микдори (qty) compact two inputs -->
          <div class="grid grid-cols-12 gap-3 items-center">
            <label class="text-sm ml-10">Миқдори</label>
            <input
              v-model.number="form.qty"
              type="number"
              min="0"
              class="col-span-4 p-2 rounded-md border focus:outline-none"
            />
            <div class="col-span-4 flex gap-2">
              <input
                v-model="form.extra"
                placeholder="0"
                class="w-28 p-2 rounded-md border focus:outline-none"
              />
            </div>
          </div>

          <!-- Table area -->
          <div class="mt-2 flex-1 flex flex-col">
            <div class="text-sm font-medium mb-2">Таблица</div>
            <div class="overflow-x-auto bg-white rounded-md border">
              <table class="min-w-full text-sm">
                <thead>
                  <tr class="bg-yellow-50 text-left">
                    <th class="px-2 py-2">#</th>
                    <th class="px-2 py-2">Код</th>
                    <th class="px-2 py-2">Артикул</th>
                    <th class="px-2 py-2">Детал</th>
                    <th class="px-2 py-2">Модели</th>
                    <th class="px-2 py-2">Номи</th>
                    <th class="px-2 py-2">Ўл. бирлиги</th>
                    <th class="px-2 py-2">Миқдори</th>
                    <th class="px-2 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(r, i) in rows"
                    :key="r.id"
                    class="border-b hover:bg-yellow-50"
                  >
                    <td class="px-2 py-2">{{ i + 1 }}</td>
                    <td class="px-2 py-2">
                      <input
                        v-model="r.code"
                        class="w-full p-1 rounded-sm border"
                      />
                    </td>
                    <td class="px-2 py-2">
                      <input
                        v-model="r.article"
                        class="w-full p-1 rounded-sm border"
                      />
                    </td>
                    <td class="px-2 py-2">
                      <input
                        v-model="r.detail"
                        class="w-full p-1 rounded-sm border"
                      />
                    </td>
                    <td class="px-2 py-2">
                      <input
                        v-model="r.model"
                        class="w-full p-1 rounded-sm border"
                      />
                    </td>
                    <td class="px-2 py-2">
                      <input
                        v-model="r.name"
                        class="w-full p-1 rounded-sm border"
                      />
                    </td>
                    <td class="px-2 py-2">
                      <input
                        v-model="r.unit"
                        class="w-full p-1 rounded-sm border"
                      />
                    </td>
                    <td class="px-2 py-2">
                      <input
                        v-model.number="r.qty"
                        type="number"
                        min="0"
                        class="w-24 p-1 rounded-sm border"
                      />
                    </td>
                    <td class="px-2 py-2 whitespace-nowrap">
                      <button
                        type="button"
                        @click="removeRow(i)"
                        class="text-xs px-2 py-1 rounded bg-red-100"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex items-center gap-3 mt-3">
              <button
                type="button"
                @click="addRow"
                class="text-sm px-3 py-1 rounded bg-yellow-200 hover:bg-yellow-300"
              >
                + Добавить строку
              </button>

              <!-- Расход склада as input now -->
            </div>
          </div>

          <!-- Bottom row: user select + save button -->
          <div class="flex items-center justify-between mt-3">
            <div class="flex items-center gap-2">
              <div class="ml-4 flex items-center gap-2">
                <label class="text-sm">Расход склада</label>
                <input
                  type="text"
                  v-model.number="form.warehouseExpenseAmount"
                  class="w-32 p-2 rounded-md border"
                />
              </div>
              <label class="text-sm">Фойдаланувчи</label>
              <select v-model="form.user" class="p-2 rounded-md border">
                <option v-for="u in users" :key="u.id" :value="u.name">
                  {{ u.name }}
                </option>
              </select>
            </div>

            <div class="flex items-center gap-3">
              <div v-if="saved" class="text-sm text-green-700">Сақланди!</div>
              <button
                type="submit"
                class="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold px-4 py-2 rounded-2xl"
              >
                Саклаш
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  detail: "Деталь A",
  code: "C-001",
  roll: "R-10",
  article: "ART-2025",
  qty: 12,
  unit: "шт",
  extra: "",
  warehouseExpenseAmount: "Slitting",
  user: "Jamal",
});

const users = [
  { id: 1, name: "Jamal" },
  { id: 2, name: "Akmal" },
  { id: 3, name: "Dilshod" },
];

let nextId = 3;
const rows = ref([
  {
    id: 1,
    code: "K-100",
    article: "ART-1",
    detail: "Деталь A",
    model: "M1",
    name: "Номи A",
    unit: "шт",
    qty: 5,
  },
  {
    id: 2,
    code: "K-200",
    article: "ART-2",
    detail: "Деталь B",
    model: "M2",
    name: "Номи B",
    unit: "м",
    qty: 2,
  },
]);

const saved = ref(false);

function addRow() {
  nextId += 1;
  rows.value.push({
    id: nextId,
    code: "",
    article: "",
    detail: "",
    model: "",
    name: "",
    unit: "",
    qty: 0,
  });
}

function removeRow(index) {
  rows.value.splice(index, 1);
}

function save() {
  // Простая демонстрация — заменить на API вызов
  const payload = { ...form, rows: rows.value };
  console.log("Saving payload:", payload);
  saved.value = true;
  setTimeout(() => (saved.value = false), 2500);
}
</script>

<style scoped>
/* Маленькие визуальные полировки */
input,
select {
  font-size: 13px;
}
table th {
  font-weight: 600;
}
</style>
