<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/40 flex justify-center items-center z-60"
    @click.self="close"
  >
    <div class="bg-white p-6 rounded-xl w-[400px] shadow-xl">
      <div class="flex items-center gap-2 mb-4">
        <TriangleAlert class="w-6 h-6 stroke-yellow-500 fill-yellow-200" />
        <h2 class="text-lg font-bold text-red-600">Подтверждение удаления</h2>
      </div>

      <p class="text-gray-600 mb-6">
        Вы уверены, что хотите удалить эту запись?
      </p>
      <div class="flex justify-end space-x-3">
        <button
          @click="close"
          class="bg-gray-200 text-gray-800 hover:bg-gray-300 font-semibold py-2 px-5 rounded-xl shadow transition"
        >
          Отмена
        </button>
        <button
          @click="confirm"
          class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-xl shadow transition"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { TriangleAlert } from "lucide-vue-next";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "confirm"]);

const close = () => {
  emit("close");
};

const confirm = () => {
  emit("confirm");
};
</script>
