<template>
  <section class="container py-32">
    <div class="flex justify-center">
      <div class="w-10/12 md:w-6/12 lg:w-4/12">
        <h2 class="text-3xl tracking-wide text-center mb-8 text-gray-800 font-semibold">
          Register
        </h2>
        <div class="rounded shadow bg-white p-8">
          <form @submit.prevent="handleSubmit">
            <div class="relative mb-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="email"
              >
                Email
              </label>
              <input
                id="email"
                v-model.trim="$v.form.email.$model"
                class="h-12 p-4 mb-1 w-full bg-white border-2 border-gray-300 rounded"
                :class="{ 'border-red-300': $v.form.email.$error }"
                type="email"
                placeholder=""
              >
              <p v-if="$v.form.email.$error && !$v.form.email.required" class="text-red-300 text-xs italic">
                Email is required.
              </p>
              <p v-else-if="!$v.form.email.email" class="text-red-300 text-xs italic">
                Needs to be a valid email address.
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
                class="h-12 p-4 mb-1 w-full bg-white border-2 border-gray-300 rounded"
                :class="{ 'border-red-300': $v.form.password.$error }"
                type="password"
                placeholder=""
              >
              <p v-if="$v.form.password.$error && !$v.form.password.required" class="text-red-300 text-xs italic">
                Password is required.
              </p>
              <p v-if="!$v.form.password.minLength" class="text-red-300 text-xs italic">
                Password must be at least {{ $v.form.password.$params.minLength.min }} characters long.
              </p>
            </div>
            <div class="relative mb-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="password_confirmation"
              >
                Confirm Password
              </label>
              <input
                id="password_confirmation"
                v-model.trim="$v.form.passwordConfirmation.$model"
                class="h-12 p-4 mb-1 w-full bg-white border-2 border-gray-300 rounded"
                :class="{ 'border-red-300': $v.form.passwordConfirmation.$error }"
                type="password"
                placeholder=""
              >
              <p v-if="!$v.form.passwordConfirmation.sameAsPassword" class="text-red-300 text-xs italic">
                Passwords must be identical.
              </p>
            </div>
            <p v-show="errorMessage" class="py-4 text-red-300 italic">
              {{ errorMessage }}
            </p>
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 font-semibold px-5 py-4 text-white h:text-white relative text-base inline-block rounded text-center w-full"
              :class="{ 'bg-gray-200': sending }"
              :disabled="!!sending"
            >
              Register
            </button>
          </form>
        </div>
        <div class="text-center mt-8">
          <p>
            Already have an account?
            <a href="/auth/signup" class="text-blue-500 hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      sending: false,
      errorMessage: '',
      form: {
        email: '',
        password: '',
        passwordConfirmation: ''
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
        required,
        minLength: minLength(8)
      },
      passwordConfirmation: {
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    async handleSubmit () {
      this.saving = true
      this.$v.$touch()
      const user = this.form
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        try {
          await this.$store.dispatch('users/register', user)
          this.$router.push('/leads')
        } catch (error) {
          this.errorMessage = error.message
        }
      }
      this.saving = false
    }
  }
}
</script>
