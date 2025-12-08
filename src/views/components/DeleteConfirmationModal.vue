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
        <Button
          variant="secondary"
          @click="close"
        >
          Отмена
        </Button>
        <Button
          variant="danger"
          @click="confirm"
        >
          Удалить
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { TriangleAlert } from "lucide-vue-next";
import Button from "@/components/ui/Button.vue";

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
