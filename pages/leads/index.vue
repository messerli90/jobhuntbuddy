<template>
  <div id="lead-index-wrapper" class="container pt-4 px-2 w-full flex">
    <div class="w-full lg:w-1/3 lg:pr-2">
      <ReminderList v-if="leads.length" :reminders="reminders" class="mb-4" />
    </div>
    <div class="w-full lg:pl-2">
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
import ReminderList from '~/components/reminders/reminderList'
import IndexCard from '~/components/leads/IndexCard'
import OnboardingCard from '~/components/leads/onboardingCard'
import NoLeadsCard from '~/components/leads/noLeadsCard'
export default {
  middleware: 'authenticated',
  components: { IndexCard, NoLeadsCard, OnboardingCard, LeadFilter, ReminderList },
  computed: {
    ...mapGetters({
      'leads': 'leads/getLeads',
      'filteredLeads': 'leads/getFilteredLeads',
      'lead': 'leads/getLead',
      'reminders': 'reminders/getAllReminders'
    })
  },
  async fetch ({ store }) {
    await store.dispatch('leads/fetchAllLeads')
    await store.dispatch('reminders/fetchAllReminders')
  },
  mounted () {
    if (!this.leads.length) {
      this.$store.dispatch('leads/fetchAllLeads')
    }
  }
}
</script>
