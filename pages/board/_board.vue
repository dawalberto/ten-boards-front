<template>
  <div>
    <portal-target name="popup-add-members-to-card"></portal-target>
    <portal-target name="popup-delete-member-from-card"></portal-target>
    <portal-target name="popup-delete-card"></portal-target>
    <PopUpWindow
      v-if="showPopUpCreateList"
      title-header="lists.new-title"
      size-popup="small"
      @accept="createNewList"
      @cancel="showPopUpCreateList = false"
    >
      <input v-model="newListTitle" type="text" class="input-form" />
    </PopUpWindow>
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
        <button
          class="btn-primary capitalize"
          @click="showPopUpCreateList = true"
        >
          {{ $t('lists.new') }}
        </button>
      </div>
      <div class="board_lists">
        <div v-for="list of board.lists" :key="list._id">
          <ListDetails
            :board="board"
            :list="list"
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
import ListDetails from '~/components/list-details'
import global from '~/mixins.js/global'

export default {
  components: { UserAvatar, SvgIcon, ListDetails },
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
      showPopUpCreateList: false,
      newListTitle: '',
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
    createNewList() {
      if (!this.newListTitle) {
        alert('the title of the list cannot be empty')
        return
      }

      const newList = {
        board: this.boardId,
        title: this.newListTitle,
      }

      this.$axios
        .post('/api/lists', newList)
        .then(() => {
          this.refreshBoard()
          this.showPopUpCreateList = false
        })
        .catch(() => {
          alert('something went wrong during the list creation')
        })
    },
  },
}
</script>

<style>
.board_lists {
  @apply grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full min-h-full place-content-center md:my-4;
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
