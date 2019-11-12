<template>
  <div class="p-2 mb-2">
    <div class="rounded shadow bg-white w-full lg:w-2/3 mx-auto">
      <h1 class="text-2xl uppercase text-center p-4 text-gray-900 font-thin">
        {{ title }}
        <br>
        <span class="font-medium">{{ form.companyName }}</span>
      </h1>
      <form class="w-full px-4" @submit.prevent="saveLead">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="company-name"
            >
              Company Name
            </label>
            <input
              id="company-name"
              v-model.trim="$v.form.companyName.$model"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
              :class="{ 'border-red-500': $v.form.companyName.$error }"
              type="text"
              placeholder="Hooli"
            >
            <p v-if="$v.form.companyName.$error" class="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="job-title"
            >
              Job Title
            </label>
            <input
              id="job-title"
              v-model.trim="form.jobTitle"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Senior Life Coach"
            >
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="company-website"
            >
              Company Website
            </label>
            <input
              id="company-website"
              v-model.trim="$v.form.companyWebsite.$model"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="http://hooli.xyz"
            >
            <p v-if="$v.form.companyWebsite.$error" class="text-red-500 text-xs italic">
              This needs to be a valid URL
            </p>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="listing-website"
            >
              Listing URL
            </label>
            <input
              id="listing-website"
              v-model.trim="$v.form.listingUrl.$model"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="http://hooli.xyz/careers"
            >
            <p v-if="$v.form.listingUrl.$error" class="text-red-500 text-xs italic">
              This needs to be a valid URL
            </p>
          </div>
        </div>

        <h2 class="text-lg text-center py-4 uppercase text-gray-900 font-thin">
          More Information
        </h2>

        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="contact-name"
            >
              Contact Name
            </label>
            <input
              id="contact-name"
              v-model.trim="form.contactName"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Gavin Belson"
            >
            <p class="text-gray-600 text-xs italic">
              It helps to know with whom you'll be in contact with
            </p>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="contact-email"
            >
              Contact Email
            </label>
            <input
              id="contact-email"
              v-model.trim="form.contactEmail"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="gavin.belson@hooli.xyz"
            >
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-3">
          <div class="w-full px-3 mb-3 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="notes"
            >
              Notes
            </label>
            <textarea
              v-model="form.notes"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
              cols="30"
              rows="10"
            />
          </div>
        </div>

        <button type="submit" class="btn mb-4" :class="{ 'bg-gray-200': saving }" :disabled="!!saving">
          Save Lead
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, url } from 'vuelidate/lib/validators'
import { EMPTY_LEAD, STATUSES } from '~/store/leads'
export default {
  data () {
    return {
      saving: false,
      form: {}
    }
  },
  validations: {
    form: {
      companyName: {
        required,
        minLength: minLength(1)
      },
      companyWebsite: {
        url
      },
      listingUrl: {
        url
      }
    }
  },
  computed: {
    title () {
      return this.form.companyName
        ? 'An exciting new opportunity at '
        : 'An exciting new opportunity'
    },
    statuses () {
      return STATUSES
    },
    statusClasses () {
      if (this.form.status) {
        const statusObj = STATUSES.find(status => status.text === this.form.status)
        return statusObj.classes
      }
      return 'bg-gray-200 text-gray-700'
    }
  },
  mounted () {
    this.form = {
      ...EMPTY_LEAD
    }
  },
  methods: {
    async saveLead () {
      this.saving = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        await this.$store.dispatch('leads/create', this.form)
        this.$router.push({ path: '/leads' })
      }
      this.saving = false
    }
  }
}
</script>
