<template>
  <transition name="fade" mode="out-in">
    <router-view v-slot="{ Component }">
      <component :is="Component" :key="$route.fullPath" />
    </router-view>
  </transition>
</template>

<script setup>
// empty
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 220ms ease;
}
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-to,   .fade-leave-from { opacity: 1; }
</style>
