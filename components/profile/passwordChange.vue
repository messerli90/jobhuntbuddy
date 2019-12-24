<template>
  <div>
    <h2 class="text-lg text-gray-800">
      Change Password
    </h2>
    <div class="my-3">
      <form @submit.prevent="handleSubmit">
        <div class="w-full mt-2">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="current-password"
          >
            Current Password
          </label>
          <div class="relative text-gray-700">
            <input
              id="current-password"
              v-model.trim="form.currentPassword"
              class="text-input"
              type="password"
            >
            <p v-if="$v.form.currentPassword.$error && !$v.form.currentPassword.required" class="text-red-300 text-xs italic">
              Password is required.
            </p>
          </div>
        </div>
        <div class="w-full mt-2">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="new-password"
          >
            New Password
          </label>
          <div class="relative text-gray-700">
            <input
              id="new-password"
              v-model.trim="form.newPassword"
              class="text-input"
              type="password"
            >
            <p v-if="$v.form.newPassword.$error && !$v.form.newPassword.required" class="text-red-300 text-xs italic">
              Password is required.
            </p>
            <p v-if="!$v.form.newPassword.minLength" class="text-red-300 text-xs italic">
              Password must be at least {{ $v.form.newPassword.$params.minLength.min }} characters long.
            </p>
          </div>
        </div>
        <div class="w-full mt-2">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="confirm-new-password"
          >
            Confirm New Password
          </label>
          <div class="relative text-gray-700">
            <input
              id="confirm-new-password"
              v-model.trim="form.newPasswordConfirm"
              class="text-input"
              type="password"
            >
            <p v-if="!$v.form.newPasswordConfirm.sameAsPassword" class="text-red-300 text-sm italic">
              Passwords must be identical.
            </p>
          </div>
        </div>
        <div class="w-full mt-2">
          <button
            :class="{ 'bg-gray-200': sending }"
            :disabled="!!sending"
            type="submit"
            class="bg-indigo-500 hover:bg-indigo-600 font-semibold px-5 py-4 text-white h:text-white relative text-base inline-block rounded text-center w-full"
          >
            Change Password
          </button>
          <p v-show="errorMessage" class="py-4 text-red-400 italic">
            {{ errorMessage }}
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      sending: false,
      errorMessage: '',
      form: {
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
      }
    }
  },
  validations: {
    form: {
      currentPassword: {
        required
      },
      newPassword: {
        required,
        minLength: minLength(8)
      },
      newPasswordConfirm: {
        sameAsPassword: sameAs('newPassword')
      }
    }
  },
  methods: {
    async handleSubmit () {
      this.saving = true
      this.$v.$touch()
      const form = this.form
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        try {
          await this.$store.dispatch('users/changePassword', form)
          this.errorMessage = ''
          // TODO show toastr
        } catch (error) {
          this.errorMessage = error.message
        }
      }
      this.saving = false
    }
  }
}
</script>
