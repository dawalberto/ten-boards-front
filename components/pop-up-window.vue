<template>
  <div
    id="background"
    class="z-50 fixed top-0 left-0 w-screen h-screen p-4 md:p-0"
    tabindex="0"
    @keyup.esc="cancel"
  >
    <div
      class="h-full w-full md:fixed md:top-2/4 md:left-2/4 md:transform md:-translate-x-2/4 md:-translate-y-2/4 rounded-md shadow-xl bg-white"
      :class="classSizePopUp"
    >
      <div
        class="flex items-center bg-primary rounded-t-md"
        :class="classSizePopUpHeader"
      >
        <h1 class="text-white text-lg fl-upper py-1 px-2">
          {{ $t(titleHeader) }}
        </h1>
      </div>
      <div class="p-4" :class="classSizePopContent">
        <slot></slot>
      </div>
      <div
        class="flex content-end p-4 flex-row-reverse w-full bg-white rounded-b-md"
        :class="classSizePopFooter"
      >
        <button class="btn btn-accept ml-2 capitalize" @click="accept">
          {{ $t('accept') }}
        </button>
        <button class="btn btn-cancel capitalize" @click="cancel">
          {{ $t('cancel') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleHeader: {
      type: String,
      default: '👋🏻',
    },
    sizePopup: {
      type: String,
      default: 'small',
    },
  },
  data() {
    return {
      dataToReturn: null,
    }
  },
  computed: {
    classSizePopUp() {
      return {
        'md:w-11/12 md:h-5/6': this.sizePopup === 'big',
        'md:h-2/5 md:w-3/4 lg:w-2/4 xl:w-2/5': this.sizePopup === 'medium',
        'sm:h-auto sm:w-auto': this.sizePopup === 'small',
      }
    },
    classSizePopUpHeader() {
      return {
        'h-12': this.sizePopup !== 'small',
        'h-auto': this.sizePopup === 'small',
      }
    },
    classSizePopContent() {
      return {
        'h-5/6 overflow-y-scroll overflow-x-hidden': this.sizePopup !== 'small',
        'h-auto': this.sizePopup === 'small',
      }
    },
    classSizePopFooter() {
      return {
        'absolute bottom-0 left-0': this.sizePopup !== 'small',
      }
    },
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
