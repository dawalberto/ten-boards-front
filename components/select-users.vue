<template>
  <div>
    <Autocomplete
      id="test"
      :search="search"
      :auto-select="true"
      placeholder="Search for a user"
      aria-label="Search for a user"
      :get-result-value="getResultValue"
      @submit="onSelectUser"
    >
      <template #result="{ result, props }">
        <li v-bind="props">
          <div class="flex items-end">
            <UserAvatar :svg="result.avatar" :size="7" class="mr-2" />
            <span>{{ result.userName }}</span>
          </div>
          <span class="mt-1">{{ result.name }}</span>
        </li>
      </template>
    </Autocomplete>
    <h1 v-show="usersSelected.length" class="my-4">
      {{ usersSelected.length }} {{ $tc('selected', usersSelected.length) }}
    </h1>
    <div>
      <div
        v-for="user of usersSelected"
        :key="user._id"
        class="flex items-end mt-2 p-1"
      >
        <UserAvatar :svg="user.avatar" :size="7" class="mr-2" />
        <span class="mr-4">{{ user.userName }}</span>
        <span class="flex-grow">{{ user.name }}</span>
        <div
          class="flex rounded-full cursor-pointer p-0.5 hover:bg-red-400 hover:text-white"
          @click="removeUserFromUsersSelectedById(user._id)"
        >
          <SvgIcon :name="'trash'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import UserAvatar from '~/components/user-avatar.vue'
import SvgIcon from '~/components/svg-icon'

export default {
  components: { Autocomplete, UserAvatar, SvgIcon },
  props: {
    users: {
      type: Array,
      default: () => [],
    },
    getUsersSelected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      usersSelected: [],
    }
  },
  watch: {
    getUsersSelected(newValue) {
      if (newValue) {
        this.$emit('usersSelected', this.usersSelected)
      }
    },
  },
  methods: {
    search(input) {
      if (input.length < 1) {
        return []
      }

      input = input.toLowerCase()
      return this.users.filter((user) => {
        return (
          user.name.toLowerCase().includes(input) ||
          user.userName.toLowerCase().startsWith(input) ||
          user.email.toLowerCase().startsWith(input)
        )
      })
    },
    onSelectUser(user) {
      this.usersSelected.push(user)
    },
    getResultValue() {
      return ''
    },
    removeUserFromUsersSelectedById(userId) {
      this.usersSelected = this.usersSelected.filter(
        (user) => user._id != userId
      )
    },
  },
}
</script>

<style>
.autocomplete {
  @apply border border-indigo-600 rounded-md px-2 inline-block w-full sticky;
}

.autocomplete-input {
  @apply outline-none my-2 w-full;
}

.autocomplete-result-list {
  @apply m-0 p-0 -ml-2 rounded-md shadow-lg bg-white;
}

.autocomplete-result {
  @apply p-2 rounded-md cursor-pointer hover:shadow-md;
}
</style>
