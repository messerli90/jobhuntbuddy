<template>
  <div id="lead-index-wrapper" class="pt-16 px-2 w-full md:w-1/2 lg:w-1/3">
    <client-only>
      <nuxt-link to="/leads/create" class="flex items-center justify-center bg-blue-900 hover:bg-blue-800 text-white rounded shadow p-4 mb-4">
        <span>Track a new Lead</span>
      </nuxt-link>
      <nuxt-link v-for="lead in leads" :key="lead.id" :to="'/leads/' + lead.id">
        <IndexCard :lead="lead" />
      </nuxt-link>
      <NoLeadsCard v-if="!leads.length" />
    </client-only>
  </div>
</template>

<script>
import IndexCard from '~/components/leads/IndexCard'
import NoLeadsCard from '~/components/leads/noLeadsCard'
export default {
  components: { IndexCard, NoLeadsCard },
  computed: {
    leads () {
      return this.$store.getters['leads/all']
    }
  },
  async fetch ({ store }) {
    await store.dispatch('leads/getAll')
  }
}
</script>
