<template>
  <header class="bg-gray-900 fixed top-0 inset-x-0 z-50">
    <div class="container sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3">
      <div class="flex items-center justify-between px-4 py-3 sm:p-0 bg-gray-900">
        <nuxt-link :to="authenticated ? '/leads' : '/'" class="text-gray-100 text-xl font-bold">
          Job<span class="font-thin">Hunt</span>Buddy<span class="font-thin">.co</span>
          <!-- <img src="@/assets/logo2.svg" alt="" class="h-8"> -->
        </nuxt-link>
        <div class="sm:hidden">
          <button @click="isOpen = !isOpen" type="button" class="block text-gray-500 hover:text-white focus:text-white">
            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path
                v-if="isOpen"
                fill-rule="evenodd"
                d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"
              />
              <path
                v-else
                fill-rule="evenodd"
                d="M3.314,4.8h13.372c0.41,0,0.743-0.333,0.743-0.743c0-0.41-0.333-0.743-0.743-0.743H3.314 c-0.41,0-0.743,0.333-0.743,0.743C2.571,4.467,2.904,4.8,3.314,4.8z M16.686,15.2H3.314c-0.41,0-0.743,0.333-0.743,0.743 s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,15.2,16.686,15.2z M16.686,9.257H3.314 c-0.41,0-0.743,0.333-0.743,0.743s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,9.257,16.686,9.257z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div :class="isOpen ? 'block' : 'hidden'" class="px-2 pt-2 pb-4 sm:flex sm:items-center  sm:p-0">
        <!-- <nuxt-link
          v-if="authenticated"
          to="/leads/create"
          class="block px-4 py-2 text-white font-semibold bg-blue-700 hover:bg-blue-800 rounded-full sm:mt-0 sm:ml-2"
        >
          Track New Lead
        </nuxt-link> -->
        <nuxt-link v-if="authenticated" to="/leads/create" class="flex flex-row items-center justify-center bg-blue-700 hover:bg-blue-800 text-white rounded-full shadow py-2 pl-6 pr-2">
          <span class="mr-4 font-semibold">Track New Lead</span>
          <span class="bg-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs">
            <fa :icon="['fas', 'chevron-right']" class="h-4" />
          </span>
        </nuxt-link>
        <a
          v-if="authenticated"
          @click.prevent="logout"
          href="#"
          class="block mt-1 px-2 py-2 text-white font-semibold hover:bg-gray-800 rounded sm:mt-0 sm:ml-2"
          title="Sign out"
        >
          <fa :icon="['fas', 'sign-out-alt']" class="h-4" />
          <span class="sm:hidden">Sign Out</span>
        </a>
        <nuxt-link
          v-if="!authenticated"
          to="/auth/signin"
          class="block mt-1 px-2 py-1 text-white font-semibold hover:bg-gray-800 rounded sm:mt-0 sm:ml-2"
        >
          Sign In
        </nuxt-link>
        <nuxt-link
          v-if="!authenticated"
          to="/auth/signup"
          class="block mt-1 px-2 py-1 text-white font-semibold hover:bg-gray-800 rounded sm:mt-0 sm:ml-2"
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
