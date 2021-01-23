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

    <div class="board_card">
      <p>
        <SvgIcon
          :name="'clock'"
          :size="5"
          :extra-classes="'mb-0.5 text-gray-500'"
        />
        <span class="text-sm text-gray-500">{{ card.time }} h</span>
      </p>
      <p>{{ card.description }}</p>
      <button
        class="absolute top-0 right-0 interactive-container"
        @click="getCardIdListIdToAddMembers(card._id, list._id)"
      >
        <SvgIcon
          :name="'user-add'"
          :title="$t('add-members')"
          :size="5"
          :extra-classes="'text-gray-500'"
        />
      </button>
      <div class="board_card-members">
        <div class="flex rounded-full">
          <UserAvatar
            v-for="memberCard of getArrayObjectsMembersOfCard(card.members)"
            :key="memberCard._id"
            :svg="memberCard.avatar"
            :size="5"
            class="board_card-member-avatar"
            :title="memberCard | getMemberTitle"
            @click.native="askDeleteMemberFromCard(memberCard, card)"
          />
        </div>
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
  },
  data() {
    return {
      showPopUpAddMembersToCard: false,
      showPopUpDeleteMemberFromCard: false,
      cardToAddMembers: {},
      getMembersToAddToCard: false,
      messageDeleteMemberFromCard: '',
      memberToDeleteFromCard: {},
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
  },
}
</script>

<style>
.board_card {
  @apply p-2 mt-3 rounded-sm bg-gray-50 shadow-md relative;
}

.board_card-members {
  @apply absolute right-0 bottom-2 z-10;
}

.board_card-member-avatar {
  @apply mr-2 cursor-pointer ring-2 ring-offset-2 ring-indigo-700 ring-opacity-50 ring-white rounded-full;
}
</style>
