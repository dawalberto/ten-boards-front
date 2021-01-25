<template>
  <div>
    <img
      src="~/assets/images/scrum_board_flatline.svg"
      class="w-full md:w-2/4 h-auto fixed bottom-0 right-0 z-0 opacity-80"
      alt="scrum board"
    />
    <div class="summary_summary">
      <NuxtLink
        v-for="data of summary"
        :key="data.board._id"
        :to="`/board/${data.board._id}`"
        class="summary_board interactive-container"
      >
        <h1 class="summary_board-title">
          <span class="summary_total">
            {{ data.board | totalCardsOnBoard }}
          </span>
          {{ data.board.title }}
        </h1>
        <div class="summary_lists">
          <div
            v-for="list of data.board.lists"
            :key="list._id"
            class="summary_list bg-primary"
          >
            <h1 class="font-semibold text-gray-200">{{ list.title }}</h1>
            <div
              v-for="card of list.cards"
              :key="card._id"
              class="summary_card"
            >
              <p>{{ card.description }}</p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    totalCardsOnBoard(board) {
      let totalCards = 0
      board.lists.forEach((list) => {
        totalCards += list.cards.length
      })
      return totalCards
    },
  },
  data() {
    return {
      summary: [],
    }
  },
  mounted() {
    this.fetchSummary()
  },
  methods: {
    fetchSummary() {
      this.$axios
        .get('/api/boards/summary/view')
        .then((response) => {
          this.summary = response.data.summary
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style>
.summary_summary {
  @apply grid gap-4 grid-cols-1 md:grid-cols-2 w-full min-h-full place-content-center;
}

.summary_board {
  @apply p-4 rounded shadow-xl border-2 border-indigo-600 border-opacity-80;
  backdrop-filter: blur(0.3rem);
}

.summary_lists {
  @apply lg:grid lg:gap-4 lg:grid-cols-2 md:my-4;
}

.summary_list {
  @apply p-4 my-2 lg:m-0 rounded shadow-md;
}

.summary_card {
  @apply p-2 mt-2 rounded-sm bg-gray-50 shadow-md;
}

.summary_board-title {
  @apply lg:mb-2 text-lg;
}

.summary_total {
  @apply inline-block rounded-full h-7 w-7 text-center text-gray-700 bg-gray-50 shadow-lg;
}
</style>
