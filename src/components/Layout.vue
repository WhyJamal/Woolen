<template>
  <div class="min-h-screen bg-gradient-to-b from-[#eef1f4] to-[#f8fafc] text-gray-900">
    <Header />
    <SubNav>
      <template #exit-button>
        <slot name="exit-button" />
      </template>
    </SubNav>

    <main class="page-wrap px-4 py-6">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Header from '@/components/headers/Header.vue'
import SubNav from '@/components/headers/SubNavbar.vue'
</script>
