<template>
  <div>
    <portal-target name="popup-add-members-to-card"></portal-target>
    <portal-target name="popup-delete-member-from-card"></portal-target>
    <portal-target name="popup-delete-card"></portal-target>
    <div>
      <div>
        <h1 class="board_title">{{ board.title }}</h1>
        <p class="board_description">{{ board.description }}</p>
      </div>
      <div class="mt-4">
        <div class="board_member">
          <UserAvatar
            v-for="member of board.members"
            :key="member._id"
            :svg="member.avatar"
            :size="8"
            class="-mr-1 cursor-pointer"
            :title="member | getMemberTitle"
          />
        </div>
      </div>
      <h1 class="text-xl text-gray-500 mt-2">
        <SvgIcon :name="'clock'" :extra-classes="'mb-0.5'" />
        <span>
          {{ board.totalTime }}
          {{ $tc('dates.measures.hours', board.totalTime) }}
        </span>
      </h1>
      <div class="board_lists">
        <div v-for="list of board.lists" :key="list._id" class="board_list">
          <h1 class="font-bold sticky top-0 p-2 z-10 bg-indigo-600 text-white">
            {{ list.title }}
          </h1>
          <CardDetails
            v-for="card of list.cards"
            :key="card._id"
            class="mx-2"
            :board="board"
            :list="list"
            :card="card"
            @refreshBoard="refreshBoard"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '~/components/svg-icon.vue'
import UserAvatar from '~/components/user-avatar.vue'
import CardDetails from '~/components/card-details'
import global from '~/mixins.js/global'

export default {
  components: { UserAvatar, SvgIcon, CardDetails },
  filters: {
    getMemberTitle(member) {
      let departments = member.departments
        ? `\n 🗂 ${member.departments.toString().replaceAll(',', ', ')}`
        : ''
      return ` 👨🏻‍💻 ${member.userName} \n 🙋🏻‍♂️ ${member.name} \n 📧 ${member.email} ${departments}`
    },
  },
  mixins: [global],
  data() {
    return {
      boardId: '',
      board: {},
    }
  },
  created() {
    this.boardId = this.$route.path
    this.boardId = this.boardId.slice(
      this.boardId.lastIndexOf('/') + 1,
      this.boardId.length
    )
  },
  mounted() {
    this.fetchBoardById()
  },
  methods: {
    fetchBoardById() {
      this.$axios
        .get(`/api/boards/${this.boardId}`)
        .then((response) => {
          this.board = response.data.board
        })
        .catch((error) => console.log(error))
    },
    refreshBoard() {
      this.fetchBoardById()
    },
  },
}
</script>

<style>
.board_lists {
  @apply grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full min-h-full place-content-center md:my-4;
}

.board_list {
  @apply my-2 lg:m-0 rounded border-2 border-indigo-600 overflow-x-hidden overflow-y-scroll;
  box-shadow: 10px 10px 0px 0px rgba(0, 0, 0, 0.75);
  max-height: 50rem;
}

.board_title {
  @apply md:flex-1 text-3xl;
}

.board_description {
  @apply md:flex-1 text-sm text-gray-600;
}

.board_member {
  @apply flex rounded-full;
}
</style>
