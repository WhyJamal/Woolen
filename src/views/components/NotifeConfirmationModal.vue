<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/40 flex justify-center items-center z-10"
    @click.self="close"
  >
    <div class="bg-white p-6 rounded-xl w-[400px] shadow-xl">
      <div class="flex items-center gap-2 mb-4">
        <TriangleAlert class="w-6 h-6 stroke-yellow-500 fill-yellow-200" />
        <h2 class="text-lg font-bold text-red-600">Подтверждение завершения</h2>
      </div>

      <p class="text-gray-600 mb-6">
        Вы уверены, что хотите закрыть без исправления?
      </p>
      <div class="flex justify-end space-x-3">
        <Button
          variant="secondary"
          @click="close"
        >
          Отмена
        </Button>
        <Button
          @click="confirm"
        >
          Да
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

const emit = defineEmits(["onCancel", "onConfirm"]);

const close = () => {
  emit("onCancel");
};

const confirm = () => {
  emit("onConfirm");
};
</script>
