<template>
  <nav class="bg-primary sticky top-0 z-50 shadow-md">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            aria-expanded="false"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            @click="showMenuOptions = !showMenuOptions"
          >
            <span class="sr-only">Open main menu</span>
            <SvgIcon
              v-show="!showMenuOptions"
              :name="'menu'"
              :class="!showMenuOptions ? 'block' : 'hidden'"
            />
            <SvgIcon
              v-show="showMenuOptions"
              :name="'x'"
              :class="showMenuOptions ? 'block' : 'hidden'"
            />
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
                  currentPath === 'summary'
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
              <SvgIcon :name="'bell'" :size="7" />
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
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10"
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
          to="/summary"
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
import SvgIcon from '~/components/svg-icon'

export default {
  components: { userAvatar, SvgIcon },
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
