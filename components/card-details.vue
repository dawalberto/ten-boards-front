<template>
  <div>
    <portal to="popup-add-members-to-card">
      <PopUpWindow
        v-if="showPopUpAddMembersToCard"
        :title-header="'add-members'"
        :size-popup="'medium'"
        @accept="acceptPopUpAddMembersToCard"
        @childAccept="childAcceptPopUpAddMembersToCard"
        @cancel="cancelPopUpPopUpAddMembersToCard"
      >
        <SelectUsers
          :users="board.members"
          :get-users-selected="getMembersToAddToCard"
        />
      </PopUpWindow>
    </portal>
    <portal to="popup-delete-member-from-card">
      <PopUpWindow
        v-if="showPopUpDeleteMemberFromCard"
        :title-header="'delete-member'"
        :size-popup="'small'"
        @accept="acceptPopUpDeleteMemberFromCard"
        @cancel="cancelPopUpPopUpDeleteMemberFromCard"
      >
        <p class="fl-upper">{{ messageDeleteMemberFromCard }}</p>
      </PopUpWindow>
    </portal>
    <portal to="popup-delete-card">
      <PopUpWindow
        v-if="showPopUpDeleteCard"
        :title-header="'cards.delete'"
        :size-popup="'small'"
        @accept="acceptPopUpDeleteCard"
        @cancel="cancelPopUpPopUpDeleteCard"
      >
        <p class="fl-upper">{{ $t('cards.delete-confirm') }}</p>
      </PopUpWindow>
    </portal>

    <div class="board_card">
      <div v-if="!template" class="flex items-center justify-between">
        <div class="text-gray-500 text-sm" @click="focusCardTimeInput">
          <SvgIcon
            :name="'clock'"
            :size="5"
            :extra-classes="'mb-0.5 cursor-pointer'"
          />
          <input
            ref="cardTimeInput"
            :value="card.time"
            :disabled="cardTimeInputDisabled"
            type="text"
            class="bg-transparent w-10 focus:ring-2 focus:ring-indigo-600 rounded focus:outline-none disabled:cursor-pointer"
            @blur="updateCardTime(card, $event.target.value)"
          />
        </div>
        <button
          class="btn-icon"
          :title="$t('cards.delete')"
          @click="askDeleteCard"
        >
          <SvgIcon
            :name="'trash'"
            :size="4"
            :position="'block'"
            :extra-classes="'text-gray-500'"
          />
        </button>
      </div>
      <div v-else class="flex items-center justify-end">
        <button
          class="btn-icon-accept"
          :title="$t('cards.add')"
          @click="createNewCard"
        >
          <SvgIcon
            :name="'add'"
            :size="4"
            :position="'block'"
            :extra-classes="'text-white'"
          />
        </button>
      </div>
      <textarea
        :value="card.description"
        type="text"
        class="board_card_description"
        @blur="updateCardDescription(card, $event.target.value)"
      >
      </textarea>
      <div v-if="!template" class="flex items-center justify-end">
        <div class="board_card-members">
          <div class="flex rounded-full">
            <UserAvatar
              v-for="memberCard of getArrayObjectsMembersOfCard(card.members)"
              :key="memberCard._id"
              :svg="memberCard.avatar"
              :size="5"
              class="board_card-member-avatar interactive-avatar"
              :title="memberCard | getMemberTitle"
              @click.native="askDeleteMemberFromCard(memberCard, card)"
            />
          </div>
        </div>
        <button
          class="btn-icon"
          :title="$t('add-members')"
          @click="getCardIdListIdToAddMembers(card._id, list._id)"
        >
          <SvgIcon
            :name="'user-add'"
            :title="$t('add-members')"
            :size="4"
            :position="'block'"
            :extra-classes="'text-gray-500'"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '~/components/svg-icon.vue'
import UserAvatar from '~/components/user-avatar.vue'
import SelectUsers from '~/components/select-users'
import PopUpWindow from '~/components/pop-up-window'
import global from '~/mixins.js/global'

export default {
  components: { UserAvatar, SvgIcon, PopUpWindow, SelectUsers },
  filters: {
    getMemberTitle(member) {
      let departments = member.departments
        ? `\n 🗂 ${member.departments.toString().replaceAll(',', ', ')}`
        : ''
      return ` 👨🏻‍💻 ${member.userName} \n 🙋🏻‍♂️ ${member.name} \n 📧 ${member.email} ${departments}`
    },
  },
  mixins: [global],
  props: {
    board: {
      type: Object,
      default: () => {},
    },
    list: {
      type: Object,
      default: () => {},
    },
    card: {
      type: Object,
      default: () => {},
    },
    template: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showPopUpAddMembersToCard: false,
      showPopUpDeleteMemberFromCard: false,
      showPopUpDeleteCard: false,
      cardToAddMembers: {},
      getMembersToAddToCard: false,
      messageDeleteMemberFromCard: '',
      memberToDeleteFromCard: {},
      cardTimeInputDisabled: true,
    }
  },
  methods: {
    acceptPopUpAddMembersToCard() {
      this.getMembersToAddToCard = true
    },
    childAcceptPopUpAddMembersToCard(members) {
      if (members) {
        this.addMembersToCard(members)
      }
      this.getMembersToAddToCard = false
      this.showPopUpAddMembersToCard = false
    },
    addMembersToCard(members) {
      members = members.map((member) => member._id)

      this.board.lists.forEach((list) => {
        if (list._id === this.cardToAddMembers.listId) {
          list.cards.forEach((card) => {
            if (card._id === this.cardToAddMembers.cardId) {
              let oldMembers = this.cloneObject(card.members)
              card.members = this.getMergedArraysWithoutDuplicates(
                card.members,
                members
              )

              this.updateCard(card._id, card).catch(() => {
                card.members = oldMembers
                alert('something went wrong during the card update')
              })
            }
          })
        }
      })
    },
    async updateCard(cardId, cardData) {
      return await this.$axios.put(`/api/cards/${cardId}`, cardData)
    },
    async deleteCard(cardId) {
      return await this.$axios.delete(`/api/cards/${cardId}`)
    },
    async createCard(cardData) {
      return await this.$axios.post('/api/cards', cardData)
    },
    cancelPopUpPopUpAddMembersToCard() {
      this.showPopUpAddMembersToCard = false
    },
    getCardIdListIdToAddMembers(cardId, listId) {
      this.showPopUpAddMembersToCard = true
      this.cardToAddMembers = { cardId, listId }
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
    askDeleteMemberFromCard(member, card) {
      this.messageDeleteMemberFromCard = this.$t('cards.delete-member', {
        name: member.name,
        userName: member.userName,
      })
      this.memberToDeleteFromCard = { member, card }
      this.showPopUpDeleteMemberFromCard = true
    },
    acceptPopUpDeleteMemberFromCard() {
      let card = this.memberToDeleteFromCard.card
      card.members = card.members.filter((memberId) => {
        return memberId !== this.memberToDeleteFromCard.member._id
      })

      this.updateCard(card._id, card)
        .then(() => {
          this.showPopUpDeleteMemberFromCard = false
        })
        .catch(() => {
          alert('something went wrong during the card update')
        })
    },
    cancelPopUpPopUpDeleteMemberFromCard() {
      this.showPopUpDeleteMemberFromCard = false
    },
    updateCardTime(card, cardTime) {
      card.time = cardTime
      this.updateCard(card._id, card)
        .then(() => {
          this.cardTimeInputDisabled = true
          this.$emit('refreshBoard')
        })
        .catch(() => {
          alert('something went wrong during the card update')
        })
    },
    updateCardDescription(card, cardDescription) {
      card.description = cardDescription

      if (this.template) {
        return
      }

      this.updateCard(card._id, card)
        .then(() => {
          this.$emit('refreshBoard')
        })
        .catch(() => {
          alert('something went wrong during the card update')
        })
    },
    createNewCard() {
      const newCard = this.cloneObject(this.card)
      newCard.list = this.list._id

      this.createCard(newCard)
        .then(() => {
          this.$emit('refreshBoard')
        })
        .catch(() => {
          alert('something went wrong during the card creation')
        })
    },
    focusCardTimeInput() {
      this.cardTimeInputDisabled = false
      setTimeout(() => {
        this.$refs.cardTimeInput.focus()
      }, 1)
    },
    askDeleteCard() {
      this.showPopUpDeleteCard = true
    },
    acceptPopUpDeleteCard() {
      this.deleteCard(this.card._id)
        .then(() => {
          this.$emit('refreshBoard')
        })
        .catch(() => {
          alert('something went wrong during the card delete')
        })
    },
    cancelPopUpPopUpDeleteCard() {
      this.showPopUpDeleteCard = false
    },
  },
}
</script>

<style>
.board_card {
  @apply p-2 mt-3 rounded-sm bg-gray-100 shadow-md relative;
}

.board_card-members {
  @apply z-10 mr-4;
  /* @apply absolute right-2 bottom-2 z-10; */
}

.board_card-member-avatar {
  @apply -ml-0.5 cursor-pointer ring-2 ring-offset-2 ring-indigo-600 ring-opacity-95 ring-white rounded-full;
}

.board_card_description {
  @apply bg-white rounded p-2 mt-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-70;
}
</style>
