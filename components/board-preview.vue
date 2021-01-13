<template>
  <NuxtLink
    :to="`/board/${idBoard}`"
    class="py-2 px-4 flex flex-col sm:flex-row justify-between items-center cursor-pointer bg-gradient-to-r hover:from-blue-50 hover:to-purple-100 hover:shadow-md rounded-md interactive-container"
  >
    <div class="flex-1 self-start md:self-center">
      <p class="font-bold">{{ title }}</p>
      <dateAt :updated-at="updatedAt" />
    </div>
    <p class="flex-1 mt-2 md:mt-0">
      {{ description }}
    </p>
  </NuxtLink>
</template>

<script>
import dateAt from '~/components/date-at.vue'

export default {
  components: { dateAt },
  props: {
    idBoard: {
      type: String,
      default: '',
    },
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
