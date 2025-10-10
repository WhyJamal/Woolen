<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => router.push('/')
</script>

<template>
  <v-row no-gutters class="overflow-hidden bg-containerBg min-h-screen">
    <v-col class="d-flex items-center justify-center">
      <div class="text-center mt-[160px]">
        <!-- Main Image Wrapper -->
        <div class="relative max-w-[720px] mx-auto">
          <img
            src="@/assets/images/maintenance/Error404.png"
            alt="404 Not Found"
            class="w-[250px] sm:w-[590px] h-[130px] sm:h-[300px] mx-auto"
          />
          <div
            class="absolute top-[60px] right-[-14%] sm:right-[-60%] w-[130px] sm:w-[390px] h-[115px] sm:h-[330px]"
          >
            <img
              src="@/assets/images/maintenance/TwoCone.png"
              alt="grid"
              class="w-full h-full object-contain"
            />
          </div>
        </div>

        <!-- Title -->
        <h1 class="text-3xl sm:text-5xl font-bold mt-16 mb-2">
          Page Not Found
        </h1>

        <!-- Description -->
        <p class="text-sm sm:text-base text-gray-400 mb-4">
          The page you are looking for was moved, removed, <br />
          renamed, or might never exist!
        </p>

        <!-- Back Button -->
        <v-btn
          class="mt-4 bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-700 transition-all duration-300"
          @click="goHome"
        >
          Back To Home
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>
