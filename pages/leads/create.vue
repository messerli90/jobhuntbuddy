<template>
  <div class="container p-2 lg:p-0 mb-2 w-full lg:w-3/5 xl:w-2/3">
    <div class="w-full lg:w-2/3 mx-auto">
      <nuxt-link to="/leads" class="text-gray-600 hover:text-indigo-800">
        &lt; Back to Leads
      </nuxt-link>
    </div>
    <div class="rounded shadow bg-white w-full lg:w-2/3 mx-auto border-t-2 border-indigo-700">
      <h1 class="text-xl md:text-2xl uppercase text-center p-4 md:p-8 text-gray-900 font-thin">
        {{ title }}
        <br>
        <span class="font-medium">{{ form.companyName }}</span>
      </h1>
      <form @submit.prevent="saveLead" class="w-full px-4">
        <div class="flex flex-wrap -mx-3 mb-3">
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
              :class="{ 'border-red-500': $v.form.companyName.$error }"
              class="text-input"
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
              for="status"
            >
              Current Application Status
            </label>
            <div class="relative text-gray-700">
              <select
                id="status"
                v-model="form.status"
                class="drop-down"
              >
                <option v-for="status in statuses" :key="status.key" :value="status.key">
                  {{ status.text }}
                </option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
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
              class="text-input"
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
              class="text-input"
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
              class="text-input"
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
              class="text-input"
              type="text"
              placeholder="Gavin Belson"
            >
            <p class="text-gray-600 text-xs italic">
              It helps to know with whom you'll be in contact
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
              class="text-input"
              type="text"
              placeholder="gavin.belson@hooli.xyz"
            >
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="compensation"
            >
              Compensation
            </label>
            <input
              id="compensation"
              v-model.trim="form.compensation"
              class="text-input"
              type="text"
              placeholder="$80,000 / yr"
            >
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="location"
            >
              Location
            </label>
            <input
              id="location"
              v-model.trim="form.location"
              class="text-input"
              type="text"
              placeholder="Silicon Valley, CA"
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
              class="text-input h-56"
              cols="30"
              rows="10"
            />
          </div>
        </div>

        <button :class="{ 'bg-gray-200': saving }" :disabled="!!saving" type="submit" class="btn mb-4">
          Save Lead
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, url } from 'vuelidate/lib/validators'
import { STATUSES, EMPTY_LEAD } from '~/helpers/leads'
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
        const statusObj = STATUSES.find(status => status.key === this.form.status)
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
        this.saving = false
      } else {
        await this.$store.dispatch('leads/createLead', this.form)
        this.$router.push({ path: '/leads' })
      }
    }
  }
}
</script>
