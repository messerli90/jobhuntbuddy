<template>
  <div class="container w-full lg:w-1/2 p-2">
    <div class="pb-2">
      <nuxt-link to="/leads" class="text-gray-600 hover:text-indigo-800">
        &lt; Back to Leads
      </nuxt-link>
    </div>
    <div v-if="loading" class="w-full py-32">
      <LoadingAnimation text="Fetching your lead" text-size="2xl" />
    </div>
    <div v-else>
      <div class="w-full">
        <div class="bg-white border-t-2 border-indigo-600 rounded">
          <div class="flex flex-col lg:flex-row justify-between items-center text-center py-6 lg:py-2 px-8">
            <div>
              <h2 class="text-3xl text-indigo-700 mb-2">
                {{ lead.companyName }}
              </h2>
              <div class="">
                <StatusTag :status="lead.status" />
              </div>
            </div>
            <div class="pt-8 lg:pt-4 lg:pb-4">
              <div>
                <h5 class="text-gray-800 font-semibold py-1">
                  Job Listing
                </h5>
                <a v-if="lead.listingUrl" :href="lead.listingUrl" class="block truncate text-teal-600 hover:text-teal-800">
                  Visit Listing
                </a>
                <p v-else class="text-gray-600 italic">
                  No listing URL
                </p>
              </div>
              <div>
                <h5 class="text-gray-800 font-semibold py-1">
                  Company Website
                </h5>
                <a v-if="lead.companyWebsite" :href="lead.companyWebsite" class="block truncate text-teal-600 hover:text-teal-800">
                  Visit Company Website
                </a>
                <p v-else class="text-gray-600 italic">
                  No website
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row">
        <div class="w-full lg:w-1/3 py-2 lg:pr-2 flex-shrink-0">
          <div class="bg-white border-t-2 border-indigo-600 p-4 w-full rounded mb-4">
            <h2 class="text-indigo-800 text-xl pb-4">
              Job Details
            </h2>
            <div class="">
              <h5 class="text-gray-800 font-semibold py-1">
                Job title
              </h5>
              <p v-if="lead.jobTitle">
                {{ lead.jobTitle }}
              </p>
              <p v-else class="text-gray-600 italic">
                No job title
              </p>
            </div>
            <div class="mt-4">
              <h5 class="text-gray-800 font-semibold py-1">
                Compensation
              </h5>
              <p v-if="lead.compensation">
                {{ lead.compensation }}
              </p>
              <p v-else class="text-gray-600 italic">
                No compensation
              </p>
            </div>
            <div class="mt-4">
              <h5 class="text-gray-800 font-semibold py-1">
                Location
              </h5>
              <p v-if="lead.location">
                {{ lead.location }}
              </p>
              <p v-else class="text-gray-600 italic">
                No location
              </p>
            </div>
          </div>
          <div class="bg-white border-t-2 border-indigo-600 p-4 w-full rounded mb-4">
            <h2 class="text-indigo-800 text-xl pb-4">
              Contact Details
            </h2>
            <div class="">
              <h5 class="text-gray-800 font-semibold py-1">
                Contact Name
              </h5>
              <p v-if="lead.contactName">
                {{ lead.contactName }}
              </p>
              <p v-else class="text-gray-600 italic">
                No HR contact
              </p>
            </div>
            <div class="mt-4">
              <h5 class="text-gray-800 font-semibold py-1">
                Contact Email
              </h5>
              <p v-if="lead.contactEmail">
                {{ lead.contactEmail }}
              </p>
              <p v-else class="text-gray-600 italic">
                No contact email
              </p>
            </div>
          </div>
        </div>
        <div class="flex-grow py-2 lg:pl-2">
          <div class="h-full">
            <div class="bg-white border-t-2 border-indigo-600 p-4 w-full rounded">
              <h2 class="text-indigo-800 text-xl pb-4">
                Notes
              </h2>
              <div class="bg-indigo-100 p-4 rounded">
                <div v-if="lead.notes" class="">
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <div v-html="compiledMarkdown" class="text-gray-800 markdown-style" />
                </div>
                <div v-else class="">
                  <span class="text-gray-700 italic">No notes.</span>
                </div>
              </div>
            </div>
            <div class="flex flex-col md:flex-row md:justify-between w-full py-4 text-center">
              <nuxt-link :to="'/leads/' + lead.id + '/edit'" class="bg-indigo-700 hover:bg-indigo-800 py-2 px-3 rounded-full text-white md:text-sm mr-2 w-full md:w-auto">
                Edit Lead
              </nuxt-link>
              <div class="relative h-full">
                <select
                  id="status"
                  v-model="status"
                  @change="handleStatusChange"
                  class="block w-full md:w-auto appearance-none bg-white md:h-full text-gray-700 md:text-sm py-2 px-3 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-2 md:my-auto"
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
                  @click.prevent="removeCurrent"
                  href="#"
                  class="text-sm text-red-800 :hover:text-red-900"
                >
                  Remove
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import StatusTag from '~/components/statusTag'
import LoadingAnimation from '~/components/loadingAnimation'
import { STATUSES } from '~/helpers/leads'
export default {
  components: { StatusTag, LoadingAnimation },
  data () {
    return {
      status: ''
    }
  },
  computed: {
    loading () {
      return !this.lead.companyName
    },
    lead () {
      return this.$store.getters['leads/getLead']
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
    this.$store.dispatch('leads/setLeadById', leadId)
  },
  methods: {
    async removeCurrent () {
      const confirmRemove = confirm('Are you sure you want to remove this lead?')
      if (confirmRemove) {
        await this.$store.dispatch('leads/removeLead', this.lead)
        this.$router.push({ path: '/leads' })
      }
    },
    handleStatusChange () {
      const lead = { ...this.lead }
      if (this.status !== '') {
        lead.status = this.status
        this.$store.dispatch('leads/updateLead', lead)
      }
    }
  }
}
</script>

<style lang="scss">
.markdown-style {
  ul, ol {
    list-style-type: disc;
    margin-left: 2rem;
    padding: 5px 0;

    li {
      padding: 2px 0;
    }
  }
}
</style>
