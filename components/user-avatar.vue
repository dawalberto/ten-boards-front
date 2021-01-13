<template>
  <span :class="`w-${size} h-${size}`" v-html="svg"></span>
</template>

<script>
export default {
  props: {
    svg: {
      type: String,
      default: null,
    },
    size: {
      type: Number,
      default: 9,
    },
  },
}
</script>

<style></style>
