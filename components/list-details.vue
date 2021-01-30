<template>
  <div class="board_list">
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
</template>

<script>
import CardDetails from '~/components/card-details'

export default {
  components: { CardDetails },
  props: {
    board: {
      type: Object,
      default: () => {},
    },
    list: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      cardTemplate: {
        time: 0,
        description: '',
        members: [],
      },
    }
  },
  methods: {
    refreshBoard() {
      this.cardTemplate.description = ''
      this.$emit('refreshBoard')
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
.board_list {
  @apply relative my-2 pb-2 lg:m-0 rounded h-full;
  box-shadow: 12px 10px 0px 0px rgba(52, 73, 94, 1);
  max-height: 50rem;
}

.board_list-title {
  @apply font-bold absolute top-0 left-0 w-full px-3 py-4 z-20 rounded-t text-white;
}

.board_list-total-cards {
  @apply inline-block rounded-full font-light h-full w-full text-center text-lg text-gray-600 bg-gray-50 shadow-lg;
}

.board_list-total-cards-user {
  @apply inline-block absolute -top-2.5 -right-2.5 rounded-full h-5 w-5 text-center text-sm text-gray-600 bg-gray-50;
}
</style>
