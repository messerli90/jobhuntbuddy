<template>
  <div id="lead-index-wrapper" class="container pt-8 px-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
    <client-only>
      <div v-if="leads.length">
        <div class="mb-4 flex flex-col items-center w-full">
          <div class="flex flex-wrap items-center justify-center md:justify-around w-full text-gray-800">
            <button class="bg-gray-400 rounded-full px-3 py-2 font-medium text-center text-sm m-1 hover:bg-gray-500" :class="{ 'bg-indigo-700 text-white hover:bg-indigo-800' : filterName === 'clearFilter' }" @click="clearFilter">
              All Leads
            </button>
            <button class="bg-gray-400 rounded-full px-3 py-2 font-medium text-center text-sm m-1 hover:bg-gray-500" :class="{ 'bg-yellow-500 text-white hover:bg-yellow-600' : filterName === 'filterProspects' }" @click="filterProspects">
              Prospects
            </button>
            <button class="bg-gray-400 rounded-full px-3 py-2 font-medium text-center text-sm m-1 hover:bg-gray-500" :class="{ 'bg-green-500 text-white hover:bg-green-600' : filterName === 'filterAppSent' }" @click="filterAppSent">
              Application Sent
            </button>
            <button class="bg-gray-400 rounded-full px-3 py-2 font-medium text-center text-sm m-1 hover:bg-gray-500" :class="{ 'bg-blue-500 text-white hover:bg-blue-600' : filterName === 'filterInterviewSet' }" @click="filterInterviewSet">
              Interview Set
            </button>
            <button class="bg-gray-400 rounded-full px-3 py-2 font-medium text-center text-sm m-1 hover:bg-gray-500" :class="{ 'bg-red-500 text-white hover:bg-red-600' : filterName === 'filterRejected' }" @click="filterRejected">
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
    this.filteredList = [...this.leads]
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
