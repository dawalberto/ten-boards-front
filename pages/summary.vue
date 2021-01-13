<template>
  <div>
    <div class="summary">
      <div
        v-for="data of summary"
        :key="data.board._id"
        class="board bg-primary"
      >
        <h1 class="board-title">{{ data.board.title }}</h1>
        <div class="lists">
          <div v-for="list of data.board.lists" :key="list._id" class="list">
            <h1 class="font-semibold">{{ list.title }}</h1>
            <div v-for="card of list.cards" :key="card._id" class="card">
              <p>{{ card.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
.summary {
  @apply grid gap-4 grid-cols-1 md:grid-cols-2 w-full min-h-full place-content-center;
}

.board {
  @apply p-4 rounded-md shadow-md;
}

.lists {
  @apply lg:grid lg:gap-4 lg:grid-cols-2;
}

.list {
  @apply p-4 my-2 lg:m-0 rounded-md border-2 border-indigo-700 border-opacity-50 shadow-md;
  backdrop-filter: blur(20rem);
}

.card {
  @apply p-2 mt-2 rounded-md bg-gray-50 shadow-md;
}

.board-title {
  @apply lg:mb-2 text-lg text-gray-50;
}
</style>
