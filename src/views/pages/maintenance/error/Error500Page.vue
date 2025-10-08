<script setup lang="ts"></script>

<template>
  <v-row no-gutters class="overflow-hidden bg-containerBg min-h-screen">
    <v-col class="d-flex items-center justify-center">
      <div class="text-center">
        <!-- Error Image -->
        <div class="mb-6">
          <img 
            src="@/assets/images/maintenance/Error500.png" 
            alt="500 Internal Server Error" 
            class="w-[350px] sm:w-[396px] mx-auto"
          />
        </div>

        <!-- Title -->
        <h1 class="text-3xl sm:text-5xl font-bold mb-2">Internal Server Error</h1>

        <!-- Description -->
        <p class="text-sm sm:text-base text-gray-400 mb-4">
          Server error 500. We are fixing the problem. Please try <br />
          again at a later stage.
        </p>

        <!-- Back to Home Button -->
        <v-btn 
          variant="flat" 
          color="primary" 
          class="mt-4" 
          to="/"
        >
          Back To Home
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>
