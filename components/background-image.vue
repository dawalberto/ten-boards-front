<template>
  <transition
    enter-active-class="transition ease-out duration-700 transform delay-200"
    enter-class="opacity-0 scale-75"
    enter-to-class="opacity-70 scale-100"
  >
    <img
      v-show="showImageBackground"
      :src="require(`@/assets/images/${srcImage}`)"
      :class="opacityBackground"
      :alt="altImage"
      class="w-full md:w-2/4 h-auto fixed bottom-0 right-0 z-0"
    />
  </transition>
</template>

<script>
export default {
  props: {
    srcImage: {
      type: String,
      default: '',
    },
    altImage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showImageBackground: false,
      opacityBackground: '',
    }
  },
  watch: {
    showImageBackground() {
      setTimeout(() => {
        this.opacityBackground = 'opacity-75'
      }, 700)
    },
  },
  mounted() {
    this.showImageBackground = true
  },
}
</script>

<style></style>
