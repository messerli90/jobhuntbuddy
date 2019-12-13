<template>
  <section class="container py-12 md:pt-20">
    <div class="flex justify-center">
      <div class="w-11/12 sm:w-8/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
        <h2 class="text-3xl tracking-wide text-center mb-8 text-gray-800 font-semibold">
          Sign In
        </h2>
        <div class="rounded shadow bg-white p-8 border-t-2 border-indigo-700">
          <form @submit.prevent="handleSubmit">
            <div class="relative mb-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="email"
              >
                Email Address
              </label>
              <input
                id="email"
                v-model.trim="$v.form.email.$model"
                :class="{ 'border-red-300': $v.form.email.$error }"
                class="h-12 p-4 mb-1 w-full bg-white border-2 border-gray-300 rounded"
                type="email"
                placeholder=""
              >
              <p v-if="$v.form.email.$error && !$v.form.email.required" class="text-red-500 text-xs italic">
                Email is required.
              </p>
            </div>
            <div class="relative mb-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                id="password"
                v-model.trim="$v.form.password.$model"
                :class="{ 'border-red-300': $v.form.password.$error }"
                class="h-12 p-4 mb-1 w-full bg-white border-2 border-gray-300 rounded"
                type="password"
                placeholder=""
              >
              <p v-if="$v.form.password.$error && !$v.form.password.required" class="text-red-500 text-xs italic">
                Password is required.
              </p>
            </div>
            <button
              :class="{ 'bg-gray-200': sending }"
              :disabled="!!sending"
              type="submit"
              class="bg-indigo-500 hover:bg-indigo-600 font-semibold px-5 py-4 text-white h:text-white relative text-base inline-block rounded text-center w-full"
            >
              {{ sending ? 'Signing in...' : 'Sign in' }}
            </button>
            <p class="text-gray-600 text-center pt-8 pb-2">
              Or use your social accounts
            </p>
            <button
              @click.prevent="loginWithTwitter"
              type="button"
              class="btn--twitter font-semibold px-5 py-2 text-white h:text-white relative text-base inline-block rounded text-center w-full my-1"
            >
              Sign in with Twitter
            </button>
            <button
              @click.prevent="loginWithGoogle"
              type="button"
              class="btn--google font-semibold px-5 py-2 text-white h:text-white relative text-base inline-block rounded text-center w-full my-1"
            >
              Sign in with Google
            </button>
            <p v-show="errorMessage" class="py-4 text-red-400 italic">
              {{ errorMessage }}
            </p>
          </form>
        </div>
        <div class="flex flex-col items-center p-4 text-gray-600">
          <nuxt-link to="/auth/forgot-password" class="text-gray-800 hover:text-indigo-700">
            Forgot Password?
          </nuxt-link>
        </div>
        <div class="flex flex-col items-center text-gray-600">
          <p>Don't have an account yet?</p>
          <p><a href="/auth/signup" class="text-gray-800 hover:text-indigo-700">Sign up now</a></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      sending: false,
      errorMessage: '',
      form: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  methods: {
    async handleSubmit () {
      this.sending = true
      this.$v.$touch()
      const user = this.form
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        try {
          await this.$store.dispatch('users/login', user)
          this.$router.push('/leads')
        } catch (error) {
          this.errorMessage = error.message
          this.sending = false
        }
      }
    },
    async loginWithTwitter () {
      this.sending = true

      try {
        await this.$store.dispatch('users/loginWithTwitter')
        this.$router.push('/leads')
      } catch (error) {
        this.errorMessage = error.message
      }
      this.sending = false
    },
    async loginWithGoogle () {
      this.sending = true

      try {
        await this.$store.dispatch('users/loginWithGoogle')
        this.$router.push('/leads')
      } catch (error) {
        this.errorMessage = error.message
        this.sending = false
      }
    }
  }
}
</script>
