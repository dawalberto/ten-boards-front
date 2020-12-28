<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 fl-upper">
          {{ $t('sign-in') }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ $t('or') }}
          <a href="#" class="link">{{ $t('sign-up') }}</a>
        </p>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="group">
          <label for="email-address">{{
            $t('email') + ' ' + $t('or') + ' ' + $t('username')
          }}</label>
          <input
            id="email-address"
            name="email"
            type="text"
            autocomplete="email"
            required
          />
        </div>
        <div class="group">
          <label for="password">
            {{ $t('password') }}
          </label>
          <input
            id="password"
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
            <a href="#" class="text-sm link">{{ $t('forgot-password') }}</a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full btn-primary fl-upper"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Heroicon name: lock-closed -->
              <svg
                class="h-5 w-5 text-purple-600 group-hover:text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            {{ $t('sign-in') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
