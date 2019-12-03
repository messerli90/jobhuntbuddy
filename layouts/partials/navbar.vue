<template>
  <header class="z-50">
    <div class="w-screen bg-indigo-700 h-2" />
    <div class="container p-4 flex flex-row  items-center justify-between">
      <nuxt-link :to="authenticated ? '/leads' : '/'" class="text-gray-900 text-2xl font-bold">
        Job<span class="font-thin">Hunt</span>Buddy<span class="font-thin">.co</span>
      </nuxt-link>
      <div class="flex flex-row items-center justify-between">
        <nuxt-link v-if="authenticated" to="/leads/create" class="flex flex-row items-center justify-center bg-indigo-700 hover:bg-indigo-800 text-white rounded-full shadow py-2 pl-6 pr-2">
          <span class="mr-4 font-semibold">Track New Lead</span>
          <span class="bg-indigo-500 rounded-full w-6 h-6 flex items-center justify-center text-xs">
            <fa :icon="['fas', 'chevron-right']" class="h-4" />
          </span>
        </nuxt-link>
        <a
          v-if="authenticated"
          href="#"
          class="block mt-1 px-2 py-2 text-gray-700 font-semibold hover:text-indigo-700 rounded sm:mt-0 sm:ml-2"
          title="Sign out"
          @click.prevent="logout"
        >
          <fa :icon="['fas', 'sign-out-alt']" class="h-4" />
        </a>
        <nuxt-link
          v-if="!authenticated"
          to="/auth/signin"
          class="block mt-1 px-2 py-1 text-gray-700 font-semibold hover:text-indigo-700 rounded sm:mt-0 sm:ml-2"
        >
          Sign In
        </nuxt-link>
        <nuxt-link
          v-if="!authenticated"
          to="/auth/signup"
          class="block mt-1 px-2 py-1 text-gray-700 font-semibold hover:text-indigo-700 rounded sm:mt-0 sm:ml-2"
        >
          Register
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('users/logout')
      this.$router.push('/')
    }
  }
}
</script>
