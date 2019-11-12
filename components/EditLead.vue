<template>
  <div class="bg-gray-100 rounded shadow">
    <form @submit.prevent="saveLead">
      <div class="flex content-center justify-between px-4 pt-4">
        <h1 class="text-3xl text-center pt-4 text-gray-900 font-thin">
          {{ title }} <span class="font-medium">{{ form.companyName }}</span>
        </h1>
        <div class="text-center">
          <label class="text-gray-900 text-lg mb-2">
            Status
          </label>
          <div class="relative">
            <select v-model="form.status" class="block appearance-none w-full border border-gray-200 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none" :class="statusClasses">
              <option v-for="status in statuses" :key="status.text" :value="status.text">
                {{ status.text }}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>
      </div>
      <hr class="m-4">
      <div class="flex flex-wrap">
        <div class="w-full lg:w-1/2 p-4">
          <!-- Company Name Field -->
          <div class="flex flex-row items-center py-2">
            <div class="w-1/3">
              <label for="companyName" :class="{ 'text-red-500': $v.form.companyName.$error }">Company Name</label>
            </div>
            <div class="flex-grow">
              <input
                v-model.trim="$v.form.companyName.$model"
                :class="{ 'bg-red-200 border-red-400': $v.form.companyName.$error }"
                class="text-input"
                type="text"
                placeholder="Company Name"
              >
            </div>
          </div>
          <p v-if="!$v.form.companyName.required" class="text-right w-full text-xs text-red-400">
            We need at least a company name to create a lead.
          </p>
          <!-- /Company Name Field -->

          <!-- Job Title Field -->
          <div class="flex flex-row items-center py-2">
            <div class="w-1/3">
              <label for="jobTitle">Job Title</label>
            </div>
            <div class="flex-grow">
              <input
                v-model.trim="form.jobTitle"
                class="text-input"
                type="text"
                placeholder="Job Title"
              >
            </div>
          </div>
          <!-- /Job Title Field -->
        </div>
        <div class="w-full lg:w-1/2 p-4">
          <!-- Company Website Field -->
          <div class="flex flex-row items-center py-2">
            <div class="w-1/3">
              <label for="companyWebsite" :class="{ 'text-red-500': $v.form.companyWebsite.$error }">Company Website</label>
            </div>
            <div class="flex-grow">
              <input
                v-model.trim="$v.form.companyWebsite.$model"
                class="text-input"
                :class="{ 'bg-red-200 border-red-400': $v.form.companyWebsite.$error }"
                type="text"
                placeholder="https://"
              >
            </div>
          </div>
          <p v-if="!$v.form.companyWebsite.url" class="text-right w-full text-xs text-red-400">
            Needs to be a valid URL.
          </p>
          <!-- /Company Website Field -->
          <!-- Listing URL Field -->
          <div class="flex flex-row items-center py-2">
            <div class="w-1/3">
              <label for="listingWebsite" :class="{ 'text-red-500': $v.form.listingWebsite.$error }">Job Listing URL</label>
            </div>
            <div class="flex-grow">
              <input
                v-model.trim="$v.form.listingWebsite.$model"
                class="text-input"
                :class="{ 'bg-red-200 border-red-400': $v.form.listingWebsite.$error }"
                type="text"
                placeholder="https://"
              >
            </div>
          </div>
          <p v-if="!$v.form.listingWebsite.url" class="text-right w-full text-xs text-red-400">
            Needs to be a valid URL.
          </p>
          <!-- /Listing URL Field -->
        </div>
      </div>
      <h2 class="text-xl text-center pt-4 text-gray-900 font-thin">
        Extras
      </h2>
      <div class="flex flex-wrap">
        <div class="w-full lg:w-1/2 p-4">
          <!-- Contact Name Field -->
          <div class="flex flex-row items-center py-2">
            <div class="w-1/2">
              <label for="contactName">Contact Name</label>
            </div>
            <input
              v-model.trim="form.contactName"
              class="text-input"
              type="text"
              placeholder="Contact Name"
            >
          </div>
          <!-- /Contact Name Field -->

          <!-- Contact Email Field -->
          <div class="flex flex-row items-center py-2">
            <div class="w-1/2">
              <label for="contactEmail">Contact Email</label>
            </div>
            <input
              v-model.trim="form.contactEmail"
              class="text-input"
              type="text"
              placeholder="Contact Email"
            >
          </div>
          <!-- /Contact Email Field -->
        </div>
      </div>
      <h2 class="text-xl text-center pt-4 text-gray-900 font-thin">
        Notes
      </h2>
      <div class="p-4">
        <textarea v-model="form.notes" cols="30" rows="10" class="text-input" />
      </div>

      <button type="submit" class="btn m-4" :class="{ 'bg-gray-200': saving }" :disabled="!!saving">
        Save Lead
      </button>
    </form>
  </div>
</template>

<script>
import { required, minLength, url } from 'vuelidate/lib/validators'
import { EMPTY_LEAD, STATUSES } from '~/store/leads'
export default {
  props: {
    lead: {
      type: Object,
      required: false,
      default () {
        return EMPTY_LEAD
      }
    }
  },
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
      listingWebsite: {
        url
      }
    }
  },
  computed: {
    title () {
      if (this.lead) {
        return 'Update lead for '
      } else {
        return this.form.companyName
          ? 'An exciting new opportunity at '
          : 'An exciting new opportunity'
      }
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
    if (this.lead) {
      this.form = {
        ...this.lead
      }
    } else {
      this.form = EMPTY_LEAD
    }
  },
  methods: {
    saveLead () {
      // console.log('submit')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        const id = this.form.id || null
        this.form.id = id
        // const lead = {
        //   id,
        //   ...this.form
        // }
        this.$store.dispatch('leads/saveLead', this.form)
      }
    }
  }
}
</script>
