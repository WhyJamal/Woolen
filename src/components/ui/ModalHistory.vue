<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    @click.self="close"
  >
    <div
      class="bg-white w-[90%] max-w-5xl max-h-[85vh] p-6 rounded-lg relative flex flex-col shadow-2xl"
    >
      <!-- Title -->
      <h1 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
        История
      </h1>

      <!-- Table Container (scrollable) -->
      <div class="flex-1 overflow-auto rounded">
        <div class="bg-gray-200 p-4 rounded-lg h-[300px]">
          <div class="max-w-5xl mx-auto space-y-2">
            <div class="grid grid-cols-9 bg-white rounded-md shadow">
              <div class="p-3 font-semibold">Дата</div>
              <div class="p-3 font-semibold text-center">Ширина</div>
              <div class="p-3 font-semibold text-center">Масса</div>
              <div class="p-3 font-semibold text-center">Брутто метр</div>
              <div class="p-3 font-semibold text-center">Нетто метр</div>
              <div class="p-3 font-semibold text-right">
                Номер ткательной машины
              </div>
              <div class="p-3 font-semibold text-right">Режим обработки</div>
              <div class="p-3 font-semibold text-right">Комментарий</div>
              <div class="p-3 font-semibold text-right">Автор</div>
            </div>
            <div class="grid grid-cols-9 bg-white rounded-md shadow">
              <div class="p-3">22.09.2025/16:27</div>
              <div class="p-3 text-center">150</div>
              <div class="p-3 text-center">20</div>
              <div class="p-3 text-center">28</div>
              <div class="p-3 text-center">27</div>
              <div class="p-3 text-right">Стандарт</div>
              <div class="p-3 text-right">-</div>
              <div class="p-3 text-right">Нет комментарий</div>
              <div class="p-3 text-right">Хаётхон к2</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end mt-4">
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow transition"
        >
          Добавить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const show = ref(true);
const close = () => {
  show.value = false;
};
</script>
