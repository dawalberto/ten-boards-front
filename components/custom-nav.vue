<template>
  <nav class="bg-gradient-to-r from-blue-500 to-purple-600">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            aria-expanded="false"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            @click="showMenuOptions = !showMenuOptions"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              v-show="!showMenuOptions"
              :class="!showMenuOptions ? 'block' : 'hidden'"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-show="showMenuOptions"
              :class="showMenuOptions ? 'block' : 'hidden'"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink to="/">
              <img
                class="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
            </NuxtLink>
            <NuxtLink to="/">
              <img
                class="hidden lg:block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                alt="Workflow"
              />
            </NuxtLink>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <NuxtLink
                to="/summary"
                :class="
                  currentPath === 'sumary'
                    ? 'nav-link-current'
                    : 'nav-link-default'
                "
                class="nav-link"
              >
                {{ $t('summary') }}
              </NuxtLink>
              <NuxtLink
                to="/boards"
                :class="
                  currentPath === 'boards'
                    ? 'nav-link-current'
                    : 'nav-link-default'
                "
                class="nav-link"
              >
                {{ $t('boards') }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <template v-if="!this.$auth.loggedIn">
            <NuxtLink
              to="/sign-in"
              :class="
                currentPath === 'sign-in'
                  ? 'nav-link-current'
                  : 'nav-link-default'
              "
              class="nav-link"
            >
              {{ $t('sign-in') }}
            </NuxtLink>
            <NuxtLink
              to="/sign-up"
              :class="
                currentPath === 'sign-up'
                  ? 'nav-link-current'
                  : 'nav-link-default'
              "
              class="nav-link"
            >
              {{ $t('sign-up') }}
            </NuxtLink>
          </template>
          <template v-else-if="this.$auth.loggedIn">
            <button
              class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span class="sr-only">View notifications</span>
              <svg
                class="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            <!-- Profile dropdown -->
            <div class="ml-3 relative">
              <div>
                <button
                  id="user-menu"
                  class="flex rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-haspopup="true"
                  @click="showUserOptions = !showUserOptions"
                >
                  <span class="sr-only">Open user menu</span>
                  <userAvatar :svg="this.$auth.user.avatar" />
                </button>
              </div>
              <!--
            Profile dropdown panel, show/hide based on dropdown state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
            -->
              <transition
                enter-active-class="transition ease-out duration-100 transform"
                enter-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75 transform"
                leave-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
              >
                <div
                  v-show="showUserOptions"
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <NuxtLink
                    to="/"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize"
                    role="menuitem"
                    >{{ $t('your-profile') }}</NuxtLink
                  >
                  <NuxtLink
                    to="/"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize"
                    role="menuitem"
                    >{{ $t('settings') }}</NuxtLink
                  >
                  <button
                    class="block px-4 w-full text-left py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize"
                    role="menuitem"
                    @click="logOut"
                  >
                    {{ $t('sign-out') }}
                  </button>
                </div>
              </transition>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  -->
    <div :class="showMenuOptions ? 'block' : 'hidden'" class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <NuxtLink
          to="/"
          :class="
            currentPath === 'summary' ? 'nav-link-current' : 'nav-link-default'
          "
          class="nav-link block"
          >{{ $t('summary') }}</NuxtLink
        >
        <NuxtLink
          to="/boards"
          :class="
            currentPath === 'boards' ? 'nav-link-current' : 'nav-link-default'
          "
          class="nav-link block"
          >{{ $t('boards') }}</NuxtLink
        >
      </div>
    </div>
  </nav>
</template>

<script>
import userAvatar from '~/components/user-avatar.vue'

export default {
  components: { userAvatar },
  data() {
    return {
      showUserOptions: false,
      showMenuOptions: false,
    }
  },
  computed: {
    currentPath() {
      return this.$route.path.slice(1)
    },
  },
  methods: {
    async logOut() {
      this.showUserOptions = false
      await this.$auth.logout()
    },
  },
}
</script>

<style>
.nav-link {
  @apply text-white 
  px-3 py-2 
  text-sm 
  font-medium 
  capitalize
  border-b-2
  border-transparent
  border-opacity-50
  ease-linear 
  duration-200;
}
.nav-link-default {
  @apply hover:border-green-500
  focus:border-green-600;
}
.nav-link-current {
  @apply border-green-500;
}
</style>
