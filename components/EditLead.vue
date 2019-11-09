<template>
  <div class="p-4">
    <div class="flex flex-wrap">
      <div class="w-full lg:w-1/2">
        <!-- Company Name Field -->
        <div class="flex flex-row items-center py-2">
          <div class="w-1/2 md:w-1/3">
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
          <div class="w-1/2 md:w-1/3">
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
      <div>
        right
      </div>
    </div>

    <button class="btn object-right-bottom" :class="{ 'bg-gray-200': saving }" :disabled="!!saving" @click="saveLead">
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
  methods: {
    saveLead () {
      const nuuid = this.lead ? this.lead.uuid : null
      const lead = {
        uuid: nuuid,
        ...this.form
      }
      this.$store.dispatch('leads/saveLead', lead)
    }
  },
  mounted () {
    if (this.lead) {
      this.form = {
        ...this.lead
      }
    }
  }
}
</script>
