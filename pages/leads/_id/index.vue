<template>
  <div class="p-2 mb-2 w-full md:w-2/3 lg:w-1/2">
    <div class="py-2">
      <nuxt-link to="/leads" class="text-gray-600 hover:text-gray-800 hover:underline">
        &lt; Back to Leads
      </nuxt-link>
    </div>
    <div class="rounded shadow bg-white p-4 md:p-8">
      <h1 class="text-2xl uppercase text-center text-gray-900 font-thin">
        {{ lead.companyName }}
      </h1>
      <h2 class="text-center text-gray-700 font-normal">
        {{ lead.jobTitle }}
      </h2>
      <div class="text-center my-4">
        <StatusTag :status="lead.status" size="xs" />
        <!-- <span class="inline-block rounded-full py-1 px-4" :class="statusClass">
          {{ lead.status }}
        </span>
        <p class="uppercase font-semibold text-xs">
          Application Status
        </p> -->
      </div>
      <hr class="m-6 w-2/3 mx-auto">
      <div class="flex flex-wrap md:flex-row md:content-around w-full mx-auto text-sm text-center">
        <div class="w-1/2 lg:w-1/4 px-2 py-3">
          <h5 class="text-gray-700 font-semibold">
            Company Website
          </h5>
          <a v-if="lead.companyWebsite" :href="lead.companyWebsite" class="text-blue-800">
            {{ lead.companyWebsite }}
          </a>
          <span v-else class="text-gray-500 italic">
            No website added
          </span>
        </div>
        <div class="w-1/2 lg:w-1/4 px-2 py-3">
          <h5 class="text-gray-700 font-semibold">
            Listing URL
          </h5>
          <a v-if="lead.listingUrl" :href="lead.listingUrl" class="text-blue-800">
            {{ lead.listingUrl }}
          </a>
          <span v-else class="text-gray-500 italic">
            No URL added
          </span>
        </div>
        <div v-show="lead.contactName" class="w-1/2 lg:w-1/4 px-2 py-3">
          <h5 class="text-gray-700 font-semibold">
            Contact Name
          </h5>
          <p class="text-gray-900">
            {{ lead.contactName }}
          </p>
        </div>
        <div v-show="lead.contactEmail" class="w-1/2 lg:w-1/4 px-2 py-3">
          <h5 class="text-gray-700 font-semibold">
            Contact Email
          </h5>
          <a :mail-to="lead.contactEmail" class="text-blue-800">
            {{ lead.contactEmail }}
          </a>
        </div>
      </div>
      <div class="mx-auto text-sm mt-6">
        <h5 class="text-gray-700 font-semibold">
          Notes
        </h5>
        <div v-if="lead.notes" class="bg-gray-100 rounded py-2 px-4 mt-2">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="compiledMarkdown" />
        </div>
        <div v-else class="bg-gray-100 rounded py-2 px-4 mt-2">
          <span class="text-gray-700 italic">No notes.</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col md:flex-row md:justify-between w-full py-4 text-center">
      <nuxt-link :to="'/leads/' + lead.id + '/edit'" class="bg-blue-400 py-2 px-3 rounded text-white md:text-sm mr-2 w-full md:w-auto">
        Edit Lead
      </nuxt-link>
      <div class="relative">
        <select
          id="status"
          v-model="status"
          class="block w-full md:w-auto appearance-none bg-white md:h-full text-gray-700 border-2 border-gray-300 md:text-sm py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-2 md:my-auto"
          @change="handleStatusChange"
        >
          <option value="">
            Quick Status Change
          </option>
          <option v-for="s in statuses" :key="s.key" :value="s.key">
            {{ s.text }}
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
      <div class="mt-4 md:m-auto py-1 px-3 md:flex-grow md:text-right">
        <a
          href="#"
          class="text-sm text-red-800 underline"
          @click.prevent="removeCurrent"
        >
          Remove
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import StatusTag from '~/components/statusTag'
import { STATUSES } from '~/store/leads'
export default {
  components: { StatusTag },
  data () {
    return {
      status: ''
    }
  },
  computed: {
    lead () {
      return this.$store.getters['leads/show']
    },
    compiledMarkdown () {
      return marked(String(this.lead.notes))
    },
    statuses () {
      return STATUSES
    }
  },
  mounted () {
    const leadId = this.$route.params.id
    this.$store.dispatch('leads/setLead', leadId)
  },
  methods: {
    async removeCurrent () {
      const confirmRemove = confirm('Are you sure you want to remove this lead?')
      if (confirmRemove) {
        await this.$store.dispatch('leads/remove', this.lead)
        this.$router.push({ path: '/leads' })
      }
    },
    handleStatusChange () {
      const lead = {
        ...this.lead
      }
      lead.status = this.status
      this.$store.dispatch('leads/update', lead)
    }
  }
}
</script>
