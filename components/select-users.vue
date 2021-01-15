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
        class="flex items-end mt-2"
      >
        <UserAvatar :svg="user.avatar" :size="7" class="mr-2" />
        <span class="mr-4">{{ user.userName }}</span>
        <span>{{ user.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import UserAvatar from '~/components/user-avatar.vue'

export default {
  components: { Autocomplete, UserAvatar },
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      usersSelected: [],
    }
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
      alert(user.userName)
    },
    getResultValue() {
      return ''
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
