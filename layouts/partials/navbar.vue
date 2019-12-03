<template>
  <header class="z-50">
    <div class="w-screen bg-indigo-700 h-1" />
    <div class="container">
      <div class="w-full p-2 md:px-0 flex items-center justify-between flex-wrap">
        <div class="flex items-center flex-shrink-0">
          <nuxt-link :to="authenticated ? '/leads' : '/'" class="text-gray-900 text-2xl font-bold">
            Job<span class="font-thin">Hunt</span>Buddy<span class="font-thin">.co</span>
          </nuxt-link>
        </div>
        <div class="block lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-indigo-300 border-indigo-400 hover:text-white hover:border-white" @click="isOpen = !isOpen">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
        </div>
        <div :class="isOpen ? 'block' : 'hidden'" class="w-full  flex-grow bg-indigo-700 lg:bg-transparent lg:flex lg:items-center justify-end lg:w-auto rounded-b rounded-tl">
          <CTABtn v-if="authenticated" target="/leads/create" title="Track New Lead" class="hidden lg:block" />
          <nuxt-link
            v-if="authenticated"
            to="/leads/create"
            class="block px-4 py-2 lg:hidden text-white font-semibold"
          >
            Track new lead
          </nuxt-link>
          <a
            v-if="authenticated"
            href="#"
            class="block px-4 py-2 text-white lg:text-gray-700 font-semibold hover:text-indigo-200"
            title="Sign out"
            @click.prevent="logout"
          >
            <fa :icon="['fas', 'sign-out-alt']" class="h-4" />
            <span class="sm:hidden">Sign Out</span>
          </a>
          <nuxt-link
            v-if="!authenticated"
            to="/auth/signin"
            class="hidden sm:block text-gray-700 font-semibold hover:text-indigo-700 mr-6"
          >
            Sign In
          </nuxt-link>
          <CTABtn v-if="!authenticated" target="/auth/signup" title="Try it FREE" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import CTABtn from '~/components/ctaBtn'

export default {
  components: { CTABtn },
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
