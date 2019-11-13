<template>
  <section class="p-2 mb-2">
    <div class="rounded shadow bg-white w-full lg:w-2/3 mx-auto">
      <h1 class="text-2xl uppercase text-center p-4 md:p-8 text-gray-900 font-thin">
        Sign In
      </h1>
      <form class="w-full px-4" @submit.prevent="handleSubmit">
        <div class="flex flex-wrap -mx-3 mb-3">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              id="email"
              v-model.trim="$v.form.email.$model"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
              :class="{ 'border-red-500': $v.form.email.$error }"
              type="email"
              placeholder=""
            >
            <p v-if="$v.form.email.$error && !$v.form.email.required" class="text-red-500 text-xs italic">
              Email is required.
            </p>
          </div>
          <div class="w-full px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              id="password"
              v-model.trim="$v.form.password.$model"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
              :class="{ 'border-red-500': $v.form.password.$error }"
              type="password"
              placeholder=""
            >
            <p v-if="$v.form.password.$error && !$v.form.password.required" class="text-red-500 text-xs italic">
              Password is required.
            </p>
          </div>
        </div>
        <button type="submit" class="btn mb-4" :class="{ 'bg-gray-200': sending }" :disabled="!!sending">
          Sign In
        </button>
        <p v-show="errorMessage" class="py-4 text-red-500 italic">
          {{ errorMessage }}
        </p>
      </form>
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
      this.saving = true
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
        }
      }
      this.saving = false
    }
  }
}
</script>
