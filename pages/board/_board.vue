<template>
  <div class="board_board">
    <div>
      <h1 class="board_title">{{ board.title }}</h1>
      <p class="board_description">{{ board.description }}</p>
    </div>
    <div class="mt-4">
      <div class="board_member">
        <user-avatar
          v-for="member of board.members"
          :key="member._id"
          :svg="member.avatar"
          :size="8"
          class="mr-2 cursor-pointer"
          :title="member | getMemberTitle"
        />
      </div>
    </div>
    <h1 class="text-xl text-gray-500">
      <svg
        class="w-6 h-6 inline mb-0.5"
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
      <span>
        {{ board.totalTime }}
        {{ $tc('dates.measures.hours', board.totalTime) }}
      </span>
    </h1>
    <div class="board_lists">
      <div v-for="list of board.lists" :key="list._id" class="board_list">
        <h1 class="font-bold">{{ list.title }}</h1>
        <div v-for="card of list.cards" :key="card._id" class="board_card">
          <p>
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
            <span class="text-sm text-gray-500">{{ card.time }} h</span>
          </p>
          <p>{{ card.description }}</p>
          <div class="board_card-members">
            <div class="flex rounded-full">
              <user-avatar
                v-for="memberCard of getArrayObjectsMembersOfCard(card.members)"
                :key="memberCard._id"
                :svg="memberCard.avatar"
                :size="5"
                class="board_card-member-avatar"
                :title="memberCard | getMemberTitle"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userAvatar from '~/components/user-avatar.vue'
export default {
  components: { userAvatar },
  filters: {
    getMemberTitle(member) {
      let departments = member.departments
        ? `\n 🗂 ${member.departments.toString().replaceAll(',', ', ')}`
        : ''
      return ` 👨🏻‍💻 ${member.userName} \n 🙋🏻‍♂️ ${member.name} \n 📧 ${member.email} ${departments}`
    },
  },
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
    getArrayObjectsMembersOfCard(cardMembers) {
      const members = []

      cardMembers.forEach((idMember) => {
        let memberFound = this.board.members.find(
          (member) => member._id === idMember
        )
        if (memberFound) {
          members.push(memberFound)
        }
      })

      return members
    },
  },
}
</script>

<style>
.board_lists {
  @apply grid gap-4 grid-cols-1  md:grid-cols-2 w-full min-h-full place-content-center md:my-4;
}

.board_list {
  @apply p-4 my-2 lg:m-0 rounded-md border-2 border-indigo-700 border-opacity-50 shadow-md;
  backdrop-filter: blur(20rem);
}

.board_card {
  @apply p-2 mt-3 rounded-sm bg-gray-50 shadow-md relative;
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

.board_card-members {
  @apply absolute right-0 bottom-2 z-10;
}

.board_card-member-avatar {
  @apply mr-2 cursor-pointer ring-2 ring-offset-2 ring-indigo-700 ring-opacity-50 ring-white rounded-full;
}
</style>
