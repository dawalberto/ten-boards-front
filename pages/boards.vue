<template>
  <div>
    <div class="flex w-full flex-row-reverse">
      <button class="btn-primary fl-upper">
        {{ $t('new-board') }}
      </button>
    </div>
    <div class="flex flex-col w-full mt-2 rounded-md shadow-md">
      <div
        class="rounded-t-md p-4 flex justify-start items-center bg-gradient-to-r from-blue-500 to-purple-600"
      >
        <!-- Heroicons: clipboard-list -->
        <svg
          class="w-8 h-8 mr-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          ></path>
        </svg>
        <p
          class="mr-2 cursor-pointer capitalize"
          :class="seeingUnfinishedBoards ? 'text-white' : 'text-gray-300'"
          @click="showUnfinishedBoards"
        >
          <span class="text-xl">{{ totalFinishedBoards }}</span>
          {{ $t('open') }}
        </p>
        <p
          class="mr-2 cursor-pointer capitalize"
          :class="!seeingUnfinishedBoards ? 'text-white' : 'text-gray-300'"
          @click="showFinishedBoards"
        >
          <span class="text-xl">{{ totalUnfinishedBoards }}</span>
          {{ $t('finished') }}
        </p>
      </div>
      <board-preview
        v-for="board of boards"
        :key="board._id"
        :title="board.title"
        :updated-at="board.updatedAt"
        :description="board.description"
      ></board-preview>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boards: [],
      finishedBoards: [],
      unfinishedBoards: [],
      totalFinishedBoards: 0,
      totalUnfinishedBoards: 0,
      seeingUnfinishedBoards: true,
    }
  },
  mounted() {
    this.fetchBoards()
  },
  methods: {
    fetchBoards() {
      this.$axios
        .get('/api/boards')
        .then((response) => {
          const responseData = response.data
          this.getFinishedBoards(responseData)
          this.getUnfinishedBoards(responseData)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getFinishedBoards(data) {
      this.finishedBoards = data.boards.filter((board) => board.finished)
      this.totalFinishedBoards = this.finishedBoards.length
    },
    getUnfinishedBoards(data) {
      this.unfinishedBoards = data.boards.filter((board) => !board.finished)
      this.totalUnfinishedBoards = this.unfinishedBoards.length
      this.showUnfinishedBoards()
    },
    showUnfinishedBoards() {
      this.boards = this.unfinishedBoards
      this.seeingUnfinishedBoards = true
    },
    showFinishedBoards() {
      this.boards = this.finishedBoards
      this.seeingUnfinishedBoards = false
    },
  },
}
</script>

<style></style>
