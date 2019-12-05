<template>
  <div id="lead-index-wrapper" class="container pt-4 px-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
    <div>
      <div v-if="leads.length">
        <LeadFilter />
        <nuxt-link v-for="lead in filteredLeads" :key="lead.id" :to="'/leads/' + lead.id">
          <IndexCard :lead="lead" />
        </nuxt-link>
        <NoLeadsCard v-if="!filteredLeads.length" />
      </div>
      <OnboardingCard v-if="!leads.length" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LeadFilter from '~/components/leads/leadFilter'
import IndexCard from '~/components/leads/IndexCard'
import OnboardingCard from '~/components/leads/onboardingCard'
import NoLeadsCard from '~/components/leads/noLeadsCard'
export default {
  middleware: 'authenticated',
  components: { IndexCard, NoLeadsCard, OnboardingCard, LeadFilter },
  computed: {
    ...mapGetters({
      'leads': 'leads/getLeads',
      'filteredLeads': 'leads/getFilteredLeads',
      'lead': 'leads/getLead'
    })
  },
  async fetch ({ store }) {
    await store.dispatch('leads/fetchAllLeads')
  },
  mounted () {
    if (!this.leads.length) {
      this.$store.dispatch('leads/fetchAllLeads')
    }
  }
}
</script>
