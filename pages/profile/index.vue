<template>
  <div>
    <div class="w-full flex items-center justify-around text-indigo-500">
      <button
        @click.prevent="page = 'password'"
        :class="{ 'bg-indigo-500 text-white': page === 'password' }"
        class="border-2 border-indigo-500 py-2 px-4 rounded hover:bg-indigo-500 hover:text-white rounded-full"
      >
        Change Password
      </button>
      <button
        @click.prevent="page = 'import'"
        :class="{ 'bg-indigo-500 text-white': page === 'import' }"
        class="border-2 border-indigo-500 py-2 px-4 rounded hover:bg-indigo-500 hover:text-white rounded-full"
      >
        Import / Export
      </button>
    </div>
    <transition name="bounce" mode="out-in">
      <div
        id="password-change"
        key="password"
        v-if="page === 'password'"
        class="py-2 px-4 my-2 lg:my-4 bg-white rounded"
      >
        <PasswordChange />
      </div>
      <div
        id="import"
        key="import"
        v-if="page === 'import'"
        class="p-8 my-2 lg:my-4 bg-white rounded"
      >
        <h2 class="text-lg text-indigo-500">
          Coming Soon
        </h2>
        <p class="text-gray-700">
          Import or Export your leads to/from an excel sheet.
        </p>
      </div>
    </transition>
    <div class="text-center">
      <a
        v-if="authenticated"
        @click.prevent="logout"
        href="#"
        class="block text-gray-700 font-semibold hover:text-indigo-500"
        title="Sign out"
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
  data () {
    return {
      page: 'password'
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

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  25% {
    opacity: 0.75;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
