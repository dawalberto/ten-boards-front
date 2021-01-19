<template>
  <div
    id="background"
    class="z-50 fixed top-0 left-0 w-screen h-screen p-4 md:p-0"
    tabindex="0"
    @keyup.esc="cancel"
  >
    <div
      class="h-full w-full md:h-2/5 md:w-3/4 lg:w-2/4 xl:w-2/5 md:fixed md:top-2/4 md:left-2/4 md:transform md:-translate-x-2/4 md:-translate-y-2/4 rounded-md shadow-xl bg-white"
    >
      <div class="flex h-12 items-center bg-primary rounded-t-md">
        <h1 class="ml-2 text-white text-lg capitalize">{{ $t(title) }}</h1>
      </div>
      <div class="p-4 h-5/6 overflow-y-scroll overflow-x-hidden">
        <slot></slot>
      </div>
      <div
        class="flex content-end p-4 absolute bottom-0 left-0 flex-row-reverse w-full bg-white rounded-b-md"
      >
        <button class="btn ml-2 capitalize bg-green-400" @click="accept">
          {{ $t('accept') }}
        </button>
        <button class="btn capitalize bg-red-400" @click="cancel">
          {{ $t('cancel') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dataToReturn: null,
    }
  },
  methods: {
    accept() {
      this.$emit('accept')
    },
    cancel() {
      this.$emit('cancel')
    },
  },
}
</script>

<style>
#background {
  backdrop-filter: blur(0.1rem);
}
</style>
