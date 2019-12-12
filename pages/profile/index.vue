<template>
  <div>
    <div id="password-change" class="py-2 px-4 my-2 lg:my-4 bg-white rounded">
      <PasswordChange />
    </div>
    <div class="text-center">
      <a
        v-if="authenticated"
        href="#"
        class="text-gray-700 font-semibold hover:text-indigo-500"
        title="Sign out"
        @click.prevent="logout"
      >
        <fa :icon="['fas', 'sign-out-alt']" class="h-4" />
        <span>Sign Out</span>
      </a>
    </div>
  </div>
</template>

<script>
import PasswordChange from '~/components/profile/passwordChange'
export default {
  layout: 'profile',
  components: { PasswordChange },
  methods: {
    async logout () {
      await this.$store.dispatch('users/logout')
      this.$router.push('/')
    }
  }
}
</script>
