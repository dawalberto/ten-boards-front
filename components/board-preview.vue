<template>
  <div
    class="group px-6 py-4 flex flex-col sm:flex-row justify-between items-center cursor-pointer bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:shadow-md rounded-b-md"
  >
    <div class="flex-1 self-start md:self-center">
      <p class="font-bold group-hover:text-white">{{ title }}</p>
      <p :title="$t('updated-at')" class="font-medium group-hover:text-white">
        <svg
          class="w-6 h-6 inline"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        {{ updatedAt }}
      </p>
    </div>
    <p class="flex-1 mt-2 md:mt-0 group-hover:text-white">
      {{ description }}
    </p>
  </div>
</template>

<script>
export default {
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
