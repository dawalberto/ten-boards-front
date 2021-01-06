<template>
  <div
    class="px-6 py-4 flex flex-col sm:flex-row justify-between items-center cursor-pointer bg-gradient-to-r hover:from-blue-50 hover:to-purple-100 hover:shadow-md rounded-b-md"
  >
    <div class="flex-1 self-start md:self-center">
      <p class="font-bold">{{ title }}</p>
      <dateAt :updated-at="updatedAt" class="mt-2" />
    </div>
    <p class="flex-1 mt-2 md:mt-0">
      {{ description }}
    </p>
  </div>
</template>

<script>
import dateAt from './date-at.vue'

export default {
  components: { dateAt },
  props: {
    title: {
      type: String,
      default: '',
    },
    updatedAt: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
}
</script>

<style></style>
