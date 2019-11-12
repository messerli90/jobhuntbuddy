<template>
  <div class="p-2 mb-2 w-full md:w-2/3 lg:w-1/2">
    <div class="rounded shadow bg-white p-4 md:p-8">
      <h1 class="text-2xl uppercase text-center text-gray-900 font-thin">
        {{ lead.companyName }}
      </h1>
      <h2 class="text-center text-gray-700 font-normal">
        {{ lead.jobTitle }}
      </h2>
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
        <div class="bg-gray-100 rounded py-2 px-4 mt-2" v-html="compiledMarkdown" />
      </div>
    </div>
    <div class="flex justify-between content-center py-4">
      <nuxt-link to="/lead/edit" class="bg-blue-400 py-2 px-3 rounded text-white text-sm">
        Edit Lead
      </nuxt-link>
      <a href="#" class="py-1 px-3 text-sm text-red-800 underline" @click.prevent="removeCurrent">Remove</a>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
export default {
  computed: {
    lead () {
      return this.$store.getters['leads/show']
    },
    compiledMarkdown () {
      return marked(String(this.lead.notes))
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
    }
  }
}
</script>
