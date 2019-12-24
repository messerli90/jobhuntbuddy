<template>
  <section class="container py-12 md:pt-20">
    <div class="flex justify-center">
      <div class="w-11/12 sm:w-8/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
        <h2 class="text-3xl tracking-wide text-center mb-8 text-gray-800 font-semibold">
          Register
        </h2>
        <div class="rounded shadow bg-white p-8 border-t-2 border-indigo-700">
          <form @submit.prevent="handleSubmit">
            <div class="relative mb-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="name"
              >
                Name
              </label>
              <input
                id="name"
                v-model.trim="$v.form.name.$model"
                :class="{ 'border-red-300': $v.form.name.$error }"
                class="h-12 p-4 mb-1 w-full bg-white border-2 border-gray-300 rounded"
                type="name"
                placeholder=""
              >
              <p v-if="$v.form.name.$error && !$v.form.name.required" class="text-red-300 text-xs italic">
                Name is required.
              </p>
            </div>
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
                :class="{ 'border-red-300': $v.form.email.$error }"
                class="h-12 p-4 mb-1 w-full bg-white border-2 border-gray-300 rounded"
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
                :class="{ 'border-red-300': $v.form.password.$error }"
                class="h-12 p-4 mb-1 w-full bg-white border-2 border-gray-300 rounded"
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
                :class="{ 'border-red-300': $v.form.passwordConfirmation.$error }"
                class="h-12 p-4 mb-1 w-full bg-white border-2 border-gray-300 rounded"
                type="password"
                placeholder=""
              >
              <p v-if="!$v.form.passwordConfirmation.sameAsPassword" class="text-red-300 text-xs italic">
                Passwords must be identical.
              </p>
            </div>
            <div class="mb-6">
              <label class="block text-gray-600 font-bold">
                <input class="mr-2 leading-tight" type="checkbox">
                <span class="text-sm">
                  I have read and accept the
                  <nuxt-link to="/policy/terms" class="text-indigo-600">
                    Term of Service
                  </nuxt-link>
                </span>
              </label>
              <p v-if="$v.form.password.$error && !$v.form.password.required" class="text-red-300 text-xs italic">
                You must accept the ToS to continue
              </p>
            </div>
            <button
              :class="{ 'bg-gray-200': sending }"
              :disabled="!!sending"
              type="submit"
              class="bg-indigo-500 hover:bg-indigo-600 font-semibold px-5 py-4 text-white h:text-white relative text-base inline-block rounded text-center w-full"
            >
              Register
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
        <div class="flex flex-col items-center p-4">
          <p class="text-gray-600">
            Already have an account?
          </p>
          <a href="/auth/signup" class="text-gray-800 hover:text-indigo-700">Sign in</a>
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
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        terms: false
      }
    }
  },
  validations: {
    form: {
      name: {
        required
      },
      email: {
        required,
        email
      },
      terms: {
        required
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
    },
    async loginWithTwitter () {
      this.sending = true

      try {
        await this.$store.dispatch('users/loginWithTwitter')
        this.$router.push('/leads')
      } catch (error) {
        this.errorMessage = error.message
        this.sending = false
      }
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
