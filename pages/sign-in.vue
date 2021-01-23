<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 fl-upper">{{ $t('sign-in') }}</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ $t('or') }}
          <a href="#" class="link">{{ $t('sign-up') }}</a>
        </p>
      </div>
      <form class="mt-8 space-y-6" method="post" @submit.prevent="signIn">
        <input type="hidden" name="remember" value="true" />
        <div class="group">
          <label
            for="emailOrUsername"
            class="ease-out duration-200"
            :class="loginStatusCodeError === 401 ? 'label-error' : ''"
          >
            {{ $t('email') + ' ' + $t('or') + ' ' + $t('username') }}
          </label>
          <input
            id="emailOrUsername"
            v-model="emailOrUsername"
            class="ease-out duration-200 input-form"
            :class="loginStatusCodeError === 401 ? 'input-error' : ''"
            name="emailOrUsername"
            type="text"
            autocomplete="email"
            required
          />
        </div>
        <div class="group">
          <label
            for="password"
            class="ease-out duration-200"
            :class="loginStatusCodeError === 401 ? 'label-error' : ''"
          >
            {{ $t('password') }}
          </label>
          <input
            id="password"
            v-model="password"
            class="ease-out duration-200 input-form"
            :class="loginStatusCodeError === 401 ? 'input-error' : ''"
            name="password"
            type="password"
            autocomplete="current-password"
            required
          />
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              class="h-4 w-4 text-blue-500 focus:ring-purple-600 border-gray-300 rounded"
            />
            <label for="remember_me" class="ml-2 text-sm text-gray-900">
              {{ $t('remember') }}
            </label>
          </div>

          <div>
            <a href="#" class="text-sm block link fl-upper">
              {{ $t('forgot-password') }}
            </a>
          </div>
        </div>

        <div>
          <button
            :disabled="signInDisabled"
            type="submit"
            class="group relative w-full btn-primary fl-upper"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <SvgIcon :name="'login'" :size="5" />
            </span>
            {{ $t('sign-in') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import global from '~/mixins.js/global'

export default {
  mixins: [global],
  data() {
    return {
      emailOrUsername: '',
      password: '',
      loginStatusCodeError: null,
      signInDisabled: false,
    }
  },
  methods: {
    async signIn() {
      this.signInDisabled = true
      const data = this.getDataToLogin()

      try {
        const res = await this.$auth.loginWith('local', { data })
        this.loginStatusCodeError = res.status
        await this.$auth.setUserToken(res.data.token, '')
        await this.$axios.setHeader('token', res.data.token)
      } catch (error) {
        this.loginStatusCodeError = error.response.status

        if (error.response.status !== 401) {
          this.$nuxt.error({
            statusCode: this.loginStatusCodeError,
            message: error.response.request.statusText,
          })
        } else {
          console.log('incorrect username or password')
        }
      }
      this.signInDisabled = false
    },
    getDataToLogin() {
      const data = {
        email: undefined,
        userName: undefined,
        password: undefined,
      }

      this.isTryingLoginWithEmail()
        ? (data.email = this.emailOrUsername)
        : (data.userName = this.emailOrUsername)
      data.password = this.password
      this.deleteUndefinedPropsOfObject(data)

      return data
    },
    isTryingLoginWithEmail() {
      return this.emailOrUsername.includes('@')
    },
  },
}
</script>

<style>
.input-error {
  @apply border-red-500 !important;
}

.label-error {
  @apply text-red-500 !important;
}
</style>
