<template>
  <div class="flex flex-col w-full md:w-4/5 lg:w-3/5 m-auto">
    <div class="field-board-form">
      <label for="board-title">title <sup class="link">*</sup></label>
      <input id="board-title" class="input-form md:w-2/4" type="text" />
    </div>
    <div class="field-board-form">
      <label for="board-description">
        description
        <sup class="link">*</sup></label
      >
      <input id="board-description" class="input-form" type="text" />
    </div>
    <div class="field-board-form">
      <label for="board-members">members</label>
      <SelectUsers
        :users="users"
        class="md:w-2/4"
        :get-users-selected="false"
      />
    </div>
    <div class="field-board-form">
      <label for="board-background">background</label>
      <input id="board-background" class="input-form" type="text" />
    </div>
    <div class="field-board-form">
      <SvgIcon
        name="lock-closed"
        :size="5"
        extra-classes="text-gray-600"
        class="mr-3"
      />
      <label for="board-public">public</label>
      <input
        id="board-public"
        name="board-visibility"
        class="mr-2 h-3 w-3"
        type="radio"
      />
      <label for="board-private">private</label>
      <input
        id="board-private"
        name="board-visibility"
        class="h-3 w-3"
        type="radio"
        checked
      />
    </div>
  </div>
</template>

<script>
import SelectUsers from '~/components/select-users'
import SvgIcon from '~/components/svg-icon'

export default {
  components: { SelectUsers, SvgIcon },
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      users: [],
    }
  },
}
</script>

<style>
.field-board-form {
  @apply mt-6;
}
</style>
