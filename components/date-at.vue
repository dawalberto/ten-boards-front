<template>
  <div>
    <svg
      class="w-5 h-5 inline text-gray-500 mb-0.5"
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
    <p :title="messageTitle" class="inline-block text-gray-500 fl-upper">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    today: {
      type: Date,
      default: () => new Date(),
    },
    updatedAt: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      diff: 0,
      minutes: 0,
      hours: 0,
      days: 0,
      message: '',
      messageTitle: '',
    }
  },
  mounted() {
    this.getDateDiffs()
    this.setMessage()
    this.setMessageTitle()
  },
  methods: {
    getDateDiffs() {
      try {
        this.diff = this.today - new Date(this.updatedAt)
        this.minutes = Math.floor(this.diff / 60000)
        this.hours = Math.floor(this.minutes / 60)
        this.days = Math.floor(this.hours / 24)
      } catch {
        this.diff = 0
      }
    },
    setMessage() {
      if (this.minutes === 0 && this.hours === 0 && this.days === 0) {
        this.message = this.$t('dates.updated.now')
      } else {
        if (this.days === 0) {
          if (this.hours === 0) {
            this.message = this.$tc('dates.updated.minutes', this.minutes)
          } else {
            this.message = this.$tc('dates.updated.hours', this.hours)
          }
        } else {
          this.message = this.$tc('dates.updated.days', this.days)
        }
      }
    },
    setMessageTitle() {
      try {
        const optionsDate = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }
        this.messageTitle = new Intl.DateTimeFormat(
          this.$i18n.locale,
          optionsDate
        ).format(new Date(this.updatedAt))
      } catch {
        this.message = ''
        this.messageTitle = ''
      }
    },
  },
}
</script>

<style></style>
