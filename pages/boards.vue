<template>
  <div>
    <h1>totalBoards: {{ totalBoards }}</h1>
    <h1>finishedBoards: {{ finishedBoards }}</h1>
    <h1>unfinishedBoards: {{ unfinishedBoards }}</h1>
    <pre>{{ boards }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boards: null,
      totalBoards: 0,
      finishedBoards: 0,
      unfinishedBoards: 0,
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
          this.getBoards(responseData)
          this.getTotalBoards(responseData)
          this.getFinishedBoards(responseData)
          this.getUnfinishedBoards(responseData)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getBoards(data) {
      this.boards = data.boards
    },
    getTotalBoards(data) {
      this.totalBoards = data.total
    },
    getFinishedBoards(data) {
      this.finishedBoards = data.boards.filter((board) => board.finished).length
    },
    getUnfinishedBoards(data) {
      this.unfinishedBoards = data.boards.filter(
        (board) => !board.finished
      ).length
    },
  },
}
</script>

<style></style>
