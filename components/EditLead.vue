<template>
  <div class="bg-gray-100 rounded shadow">
    <h1 class="text-2xl text-center pt-4 text-gray-900 font-thin">
      {{ title }} <span class="font-medium">{{ form.companyName }}</span>
    </h1>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-1/2 p-4">
        <!-- Company Name Field -->
        <div class="flex flex-row items-center py-2">
          <div class="w-1/2">
            <label for="companyName">Company Name</label>
          </div>
          <input
            v-model="form.companyName"
            class="text-input"
            type="text"
            placeholder="Company Name"
          >
        </div>
        <!-- /Company Name Field -->

        <!-- Job Title Field -->
        <div class="flex flex-row items-center py-2">
          <div class="w-1/2">
            <label for="jobTitle">Job Title</label>
          </div>
          <input
            v-model="form.jobTitle"
            class="text-input"
            type="text"
            placeholder="Job Title"
          >
        </div>
        <!-- /Job Title Field -->
      </div>
      <div class="w-full lg:w-1/2 p-4">
        <!-- Company Website Field -->
        <div class="flex flex-row items-center py-2">
          <div class="w-1/2">
            <label for="companyWebsite">Company Website</label>
          </div>
          <input
            v-model="form.companyWebsite"
            class="text-input"
            type="text"
            placeholder="https://"
          >
        </div>
        <!-- /Job Title Field -->
        <!-- Listing URL Field -->
        <div class="flex flex-row items-center py-2">
          <div class="w-1/2">
            <label for="listingWebsite">Job Listing URL</label>
          </div>
          <input
            v-model="form.listingWebsite"
            class="text-input"
            type="text"
            placeholder="https://"
          >
        </div>
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
            v-model="form.contactName"
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
            v-model="form.contactEmail"
            class="text-input"
            type="text"
            placeholder="Contact Email"
          >
        </div>
        <!-- /Contact Email Field -->
      </div>
    </div>

    <button class="btn m-4" :class="{ 'bg-gray-200': saving }" :disabled="!!saving" @click="saveLead">
      Save Lead
    </button>
  </div>
</template>

<script>
import { EMPTY_LEAD } from '~/store/leads'
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
      form: {
        companyName: '',
        jobTitle: '',
        companyWebsite: ''
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
    }
  },
  mounted () {
    if (this.lead) {
      console.log('exists')
      this.form = {
        ...this.lead
      }
    } else {
      console.log('new')
      this.form = EMPTY_LEAD
    }
  },
  methods: {
    saveLead () {
      const nuuid = this.lead ? this.lead.uuid : null
      const lead = {
        uuid: nuuid,
        ...this.form
      }
      this.$store.dispatch('leads/saveLead', lead)
    }
  }
}
</script>
