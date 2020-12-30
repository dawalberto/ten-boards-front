<template>
  <span class="w-9 h-9" v-html="svg"></span>
</template>

<script>
export default {
  props: {
    svg: {
      type: String,
      default: null,
    },
  },
}
</script>

<style></style>
