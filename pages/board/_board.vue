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
      <div class="flex items-center justify-end">
        <button class="btn-primary capitalize">{{ $t('new-list') }}</button>
      </div>
      <div class="board_lists">
        <div v-for="list of board.lists" :key="list._id" class="board_list">
          <h1 class="board_list-title bg-primary">
            <div class="inline-block h-7 w-7 relative mr-2">
              <span class="board_list-total-cards">
                {{ list.cards.length }}
              </span>
              <span class="board_list-total-cards-user">
                {{ getTotalCardsOfUserFromList(list) }}
              </span>
            </div>
            {{ list.title }}
          </h1>
          <div class="overflow-x-hidden overflow-y-scroll h-full">
            <CardDetails
              class="mx-2 opacity-60 mt-16"
              :template="true"
              :board="board"
              :list="list"
              :card="cardTemplate"
              @refreshBoard="refreshBoard"
            />
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
      cardTemplate: {
        time: 0,
        description: '',
        members: [],
      },
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
      this.cardTemplate.description = ''
    },
    getTotalCardsOfUserFromList(list) {
      const cardsOfList = list.cards
      return cardsOfList.filter((card) =>
        card.members.includes(this.$auth.user._id)
      ).length
    },
  },
}
</script>

<style>
.board_lists {
  @apply grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full min-h-full place-content-center md:my-4;
}

.board_list {
  @apply relative my-2 pb-2 lg:m-0 rounded;
  box-shadow: 12px 10px 0px 0px rgba(52, 73, 94, 1);
  max-height: 50rem;
}

.board_list-title {
  @apply font-bold absolute top-0 left-0 w-full px-3 py-4 z-20 rounded-t text-white;
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

.board_list-total-cards {
  @apply inline-block rounded-full font-light h-full w-full text-center text-lg text-gray-600 bg-gray-50 shadow-lg;
}

.board_list-total-cards-user {
  @apply inline-block absolute -top-2.5 -right-2.5 rounded-full h-5 w-5 text-center text-sm text-gray-600 bg-gray-50;
}
</style>
