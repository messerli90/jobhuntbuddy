<template>
  <div class="container p-2">
    <div class="flex flex-col lg:flex-row">
      <div class="w-full lg:w-1/3">
        <div class="bg-white border-t-2 border-indigo-600 p-4 rounded text-center mb-4">
          <h2 class="text-2xl text-gray-900">
            {{ lead.companyName }}
          </h2>
          <div class="my-2">
            <h5 class="text-gray-800 font-semibold py-1">
              Status
            </h5>
            <StatusTag :status="lead.status" />
          </div>
          <div class="mt-4">
            <h5 class="text-gray-800 font-semibold py-1">
              Company Website
            </h5>
            <a :href="lead.companyWebsite" class="block truncate hover:text-indigo-600">
              {{ lead.companyWebsite }}
            </a>
          </div>
          <div class="mt-4">
            <h5 class="text-gray-800 font-semibold py-1">
              Job Listing
            </h5>
            <a :href="lead.listingUrl" class="block truncate text-indigo-600 hover:text-indigo-800">
              Visit Listing
            </a>
          </div>
        </div>
        <div class="bg-white border-t-2 border-indigo-600 p-4 w-full rounded text-center mb-4">
          <div class="">
            <h5 class="text-gray-800 font-semibold py-1">
              Job title
            </h5>
            <p>
              {{ lead.jobTitle }}
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
              No compensation...
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
              No location...
            </p>
          </div>
        </div>
      </div>
      <div>
        main
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import StatusTag from '~/components/statusTag'
import { STATUSES } from '~/helpers/leads'
export default {
  components: { StatusTag },
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
