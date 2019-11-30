<template>
  <div id="lead-index-wrapper" class="pt-16 px-2 w-full md:w-2/3 lg:w-1/2 xl:w-2/5">
    <client-only>
      <div v-if="leads.length">
        <!-- <nuxt-link to="/leads/create" class="flex items-center justify-center bg-blue-900 hover:bg-blue-800 text-white text-lg rounded shadow py-3 mb-4">
          <span>Track a new Lead</span>
        </nuxt-link> -->
        <div class="my-4 flex flex-col items-center">
          <span class="text-gray-800 font-semibold uppercase text-sm mb-2">
            Filter Leads
          </span>
          <div class="flex flex-wrap justify-center">
            <button class="bg-gray-400 rounded-full px-3 py-2 font-semibold text-center text-xs m-1 hover:bg-gray-500" :class="{ 'bg-gray-700 hover:bg-gray-800 text-white' : filterName === 'clearFilter' }" @click="clearFilter">
              All Leads
            </button>
            <button class="bg-gray-400 rounded-full px-3 py-2 font-semibold text-center text-xs text-gray-800 m-1 hover:bg-gray-500" :class="{ 'bg-yellow-200 hover:bg-yellow-300 text-yellow-800' : filterName === 'filterProspects' }" @click="filterProspects">
              Prospects
            </button>
            <button class="bg-gray-400 rounded-full px-3 py-2 font-semibold text-center text-xs text-gray-800 m-1 hover:bg-gray-500" :class="{ 'bg-green-200 hover:bg-green-300 text-green-800' : filterName === 'filterAppSent' }" @click="filterAppSent">
              Application Sent
            </button>
            <button class="bg-gray-400 rounded-full px-3 py-2 font-semibold text-center text-xs text-gray-800 m-1 hover:bg-gray-500" :class="{ 'bg-blue-200 hover:bg-blue-300 text-blue-800' : filterName === 'filterInterviewSet' }" @click="filterInterviewSet">
              Interview Set
            </button>
            <button class="bg-gray-400 rounded-full px-3 py-2 font-semibold text-center text-xs text-gray-800 m-1 hover:bg-gray-500" :class="{ 'bg-red-200 hover:bg-red-300 text-red-800' : filterName === 'filterRejected' }" @click="filterRejected">
              Rejected
            </button>
          </div>
        </div>
        <nuxt-link v-for="lead in filteredList" :key="lead.id" :to="'/leads/' + lead.id">
          <IndexCard :lead="lead" />
        </nuxt-link>
        <NoLeadsCard v-if="!filteredList.length" />
      </div>
      <OnboardingCard v-if="!leads.length" />
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import IndexCard from '~/components/leads/IndexCard'
import OnboardingCard from '~/components/leads/onboardingCard'
import NoLeadsCard from '~/components/leads/noLeadsCard'
export default {
  middleware: 'authenticated',
  components: { IndexCard, NoLeadsCard, OnboardingCard },
  data () {
    return {
      filteredList: [],
      filterName: 'clearFilter'
    }
  },
  computed: {
    ...mapGetters({
      'leads': 'leads/all',
      'prospects': 'leads/prospects',
      'appSent': 'leads/appSent',
      'interviewSet': 'leads/interviewSet',
      'rejected': 'leads/rejected'
    })
  },
  async fetch ({ store }) {
    await store.dispatch('leads/getAll')
  },
  mounted () {
    this.filteredList = this.leads
  },
  methods: {
    clearFilter () {
      this.filterName = 'clearFilter'
      this.filteredList = this.leads
    },
    filterAppSent () {
      this.filterName = 'filterAppSent'
      this.filteredList = this.appSent
    },
    filterProspects () {
      this.filterName = 'filterProspects'
      this.filteredList = this.prospects
    },
    filterInterviewSet () {
      this.filterName = 'filterInterviewSet'
      this.filteredList = this.interviewSet
    },
    filterRejected () {
      this.filterName = 'filterRejected'
      this.filteredList = this.rejected
    }
  }
}
</script>
