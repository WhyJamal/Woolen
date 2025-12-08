<template>
  <button
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary", 
  },
});

const base =
  "px-4 py-2 text-sm font-medium rounded-sm focus:outline-none focus:ring-2";

const classes = computed(() => {
  switch (props.variant) {
    case "secondary":
      return `${base} text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500`;
    case "danger":
      return `${base} text-white bg-red-600 hover:bg-red-700 focus:ring-red-500`;
    default:
      return `${base} text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500`;
  }
});
</script>
