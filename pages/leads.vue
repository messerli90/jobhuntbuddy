<template>
  <div class="flex">
    <div class="w-screen max-h-full md:w-1/2 lg:w-1/3 p-4">
      <div class="card flex flex-col items-center justify-center bg-gray-100 px-4 py-4 shadow rounded border-gray-700 mb-3 text-green-700">
        <svg class="h-8 w-8 fill-current stroke-current" viewBox="0 0 22 22">
          <path
            fill-rule="evenodd"
            d="M13.68,9.448h-3.128V6.319c0-0.304-0.248-0.551-0.552-0.551S9.448,6.015,9.448,6.319v3.129H6.319c-0.304,0-0.551,0.247-0.551,0.551s0.247,0.551,0.551,0.551h3.129v3.129c0,0.305,0.248,0.551,0.552,0.551s0.552-0.246,0.552-0.551v-3.129h3.128c0.305,0,0.552-0.247,0.552-0.551S13.984,9.448,13.68,9.448z M10,0.968c-4.987,0-9.031,4.043-9.031,9.031c0,4.989,4.044,9.032,9.031,9.032c4.988,0,9.031-4.043,9.031-9.032C19.031,5.012,14.988,0.968,10,0.968z M10,17.902c-4.364,0-7.902-3.539-7.902-7.903c0-4.365,3.538-7.902,7.902-7.902S17.902,5.635,17.902,10C17.902,14.363,14.364,17.902,10,17.902z"
          />
        </svg>
        Add New Lead
      </div>
      <div v-for="lead in leads" :key="lead.name">
        <div class="card flex items-center justify-between bg-gray-100 px-4 py-3 shadow rounded border-gray-700 mb-3" @click="setCurrentLead(lead)">
          <div class="flex-shrink-0">
            <h2 class="font-medium text-lg text-gray-800">{{ lead.companyName }}</h2>
            <h3 class="font-thin text-sm text-gray-800">{{ lead.jobTitle }}</h3>
            <p><a href="#" class="text-sm text-blue-800">{{ lead.companyWebsite }}</a></p>
          </div>
          <div class="flex-shrink">
            <StatusTag :status="lead.status" class="text-xs"></StatusTag>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-grow max-h-screen p-4">
      <div class="bg-gray-100 w-full h-full rounded shadow">
        <div v-if="!currentLead" class="flex flex-col h-full items-center justify-center">
          <h1>Select a lead to get goin</h1>
          <h3>No Lead Selected</h3>
        </div>
        <div v-else>
          <LeadView :lead="currentLead"></LeadView>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatusTag from '~/components/statusTag'
import LeadView from '~/components/LeadView'
export default {
  components: { StatusTag, LeadView },
  computed: {
    leads () {
      return this.$store.getters['leads/getAll']
    },
    currentLead () {
      return this.$store.getters['leads/getCurrentLead']
    }
  },
  async fetch ({ store }) {
    await store.dispatch('leads/getLeads')
  },
  methods: {
    setCurrentLead (lead) {
      this.$store.dispatch('leads/setCurrentLead', lead)
    },
    clearCurrentLead () {
      this.$store.dispatch('leads/clearCurrentLead')
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  transition: all .4s ease; /* back to normal */
}
.card:hover {
  transform: translate3D(0,-1px,0) scale(1.01);
  transition: all .3s ease; /* zoom in */
  cursor: pointer;
}
</style>
