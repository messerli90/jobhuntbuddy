<template>
  <section class="container py-12 md:pt-48">
    <div class="flex justify-center">
      <div class="w-11/12 sm:w-8/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
        <h2 class="text-3xl tracking-wide text-center mb-8 text-gray-800 font-semibold">
          Request Password Reset
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
            <button
              :class="{ 'bg-gray-200': sending }"
              :disabled="!!sending"
              type="submit"
              class="bg-indigo-500 hover:bg-indigo-600 font-semibold px-5 py-4 text-white h:text-white relative text-base inline-block rounded text-center w-full"
            >
              {{ sending ? 'Signing in...' : 'Sign in' }}
            </button>
            <p v-show="errorMessage" class="py-4 text-xs text-red-500 italic">
              {{ errorMessage }}
            </p>
          </form>
        </div>
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
        email: ''
      }
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
      }
    }
  },
  methods: {
    async handleSubmit () {
      this.sending = true
      this.$v.$touch()
      const email = this.form.email
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        try {
          await this.$store.dispatch('users/sendPasswordResetEmail', email)
          this.$router.push('/auth/signin')
        } catch (error) {
          this.errorMessage = error.message
          this.sending = false
        }
      }
    }
  }
}
</script>
