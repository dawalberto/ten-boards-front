<template>
  <div>
    <BackgroundImage
      src-image="scrum_board_isometric.svg"
      alt-image="scrum board"
    />

    <PopUpWindow
      v-if="showPopUpCreateBoard"
      title-header="boards.new-board"
      size-popup="big"
      @cancel="showPopUpCreateBoard = false"
    >
      <CreateUpdateBoard />
    </PopUpWindow>

    <div class="flex w-full flex-row-reverse">
      <button class="btn-primary fl-upper" @click="showPopUpCreateBoard = true">
        {{ $t('new-board') }}
      </button>
    </div>
    <div
      class="flex flex-col w-full mt-2 rounded-md shadow-xl boards-preview-container"
    >
      <div
        class="rounded-t-md py-4 px-6 flex justify-start items-center bg-primary z-10"
      >
        <SvgIcon
          name="clipboard-list"
          :size="8"
          extra-classes="mr-4 text-white"
        />
        <p
          class="mr-2 cursor-pointer capitalize"
          :class="seeingUnfinishedBoards ? 'text-white' : 'text-gray-300'"
          @click="showUnfinishedBoards"
        >
          <span class="text-xl">{{ totalUnfinishedBoards }}</span>
          {{ $t('open') }}
        </p>
        <p
          class="mr-2 cursor-pointer capitalize"
          :class="!seeingUnfinishedBoards ? 'text-white' : 'text-gray-300'"
          @click="showFinishedBoards"
        >
          <span class="text-xl">{{ totalFinishedBoards }}</span>
          {{ $t('finished') }}
        </p>
      </div>
      <board-preview
        v-for="board of boards"
        :key="board._id"
        :id-board="board._id"
        :title="board.title"
        :updated-at="board.updatedAt"
        :description="board.description"
      ></board-preview>
    </div>
  </div>
</template>

<script>
import BackgroundImage from '~/components/background-image'
import PopUpWindow from '~/components/pop-up-window'
import CreateUpdateBoard from '~/components/create-update-board'

export default {
  components: { BackgroundImage, PopUpWindow, CreateUpdateBoard },
  data() {
    return {
      boards: [],
      finishedBoards: [],
      unfinishedBoards: [],
      totalFinishedBoards: 0,
      totalUnfinishedBoards: 0,
      seeingUnfinishedBoards: true,
      showPopUpCreateBoard: false,
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

<style>
.boards-preview-container {
  backdrop-filter: blur(0.3rem);
}
</style>
