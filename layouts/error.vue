<template>
  <div class="flex justify-center text-center">
    <div v-if="error.statusCode" class="p-80">
      <h1
        class="text-9xl text-gradient bg-gradient-to-r from-blue-500 to-purple-600 font-light"
      >
        {{ error.statusCode }}
      </h1>
      <p v-if="error.message" class="mt-4">{{ error.message }}</p>
    </div>
    <h1 v-else class="p-80">An error occurred</h1>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style></style>
