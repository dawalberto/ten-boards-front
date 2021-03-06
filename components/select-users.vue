<template>
  <div>
    <Autocomplete
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
        <button
          class="btn-icon-cancel"
          @click="removeUserFromUsersSelected(user)"
        >
          <SvgIcon
            name="trash"
            :size="4"
            position="block"
            extra-classes="text-white"
          />
        </button>
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
      usersToSelect: [],
      usersSelected: [],
    }
  },
  watch: {
    getUsersSelected(newValue) {
      if (newValue) {
        this.$parent.$emit('childAccept', this.usersSelected)
      }
    },
  },
  mounted() {
    this.usersToSelect = this.users
  },
  methods: {
    search(input) {
      if (input.length < 1) {
        return []
      }

      input = input.toLowerCase()
      return this.usersToSelect.filter((user) => {
        return (
          user.name.toLowerCase().includes(input) ||
          user.userName.toLowerCase().startsWith(input) ||
          user.email.toLowerCase().startsWith(input)
        )
      })
    },
    onSelectUser(userSelected) {
      if (userSelected) {
        this.usersSelected.push(userSelected)

        this.usersToSelect = this.usersToSelect.filter(
          (user) => user._id != userSelected._id
        )
      }
    },
    getResultValue() {
      return ''
    },
    removeUserFromUsersSelected(userToRemoveFromSelected) {
      this.usersSelected = this.usersSelected.filter(
        (user) => user._id != userToRemoveFromSelected._id
      )

      this.usersToSelect.push(userToRemoveFromSelected)
    },
  },
}
</script>

<style>
.autocomplete {
  /* @apply border border-indigo-600 rounded-md px-2 inline-block w-full sticky; */
}

.autocomplete-input {
  @apply appearance-none
        rounded-md 
        relative 
        block 
        w-full 
        px-3 
        py-2 
        border 
        border-gray-300 
        placeholder-gray-500 
        text-gray-900 
        outline-none
        focus:outline-none 
        focus:border-purple-600 
        focus:z-10 
        sm:text-sm
        ease-out 
        duration-200;
}

.autocomplete-result-list {
  @apply m-0 p-0 -ml-2 rounded-md shadow-lg bg-white;
}

.autocomplete-result {
  @apply p-2 rounded-md cursor-pointer hover:shadow-md;
}
</style>
