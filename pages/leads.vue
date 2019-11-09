<template>
  <div class="flex flex-wrap pt-16">
    <div class="w-screen md:w-1/2 lg:w-1/3 p-4 sm:overflow-y-auto">
      <div class="card flex flex-col items-center justify-center bg-gray-100 px-4 py-4 shadow rounded border-gray-700 mb-3 text-green-700" @click="handleAddLead">
        <svg class="h-8 w-8 fill-current stroke-current" viewBox="0 0 22 22">
          <path
            fill-rule="evenodd"
            d="M13.68,9.448h-3.128V6.319c0-0.304-0.248-0.551-0.552-0.551S9.448,6.015,9.448,6.319v3.129H6.319c-0.304,0-0.551,0.247-0.551,0.551s0.247,0.551,0.551,0.551h3.129v3.129c0,0.305,0.248,0.551,0.552,0.551s0.552-0.246,0.552-0.551v-3.129h3.128c0.305,0,0.552-0.247,0.552-0.551S13.984,9.448,13.68,9.448z M10,0.968c-4.987,0-9.031,4.043-9.031,9.031c0,4.989,4.044,9.032,9.031,9.032c4.988,0,9.031-4.043,9.031-9.032C19.031,5.012,14.988,0.968,10,0.968z M10,17.902c-4.364,0-7.902-3.539-7.902-7.903c0-4.365,3.538-7.902,7.902-7.902S17.902,5.635,17.902,10C17.902,14.363,14.364,17.902,10,17.902z"
          />
        </svg>
        Add New Lead
      </div>
      <div>
        <div v-for="lead in leads" :key="lead.name">
          <div class="card flex items-center justify-between bg-gray-100 px-4 py-3 shadow rounded border-gray-700 mb-3" @click="setCurrentLead(lead)">
            <div class="flex-shrink-0">
              <h2 class="font-medium text-lg text-gray-800">
                {{ lead.companyName }}
              </h2>
              <h3 class="font-thin text-sm text-gray-800">
                {{ lead.jobTitle }}
              </h3>
              <p>
                <a href="#" class="text-sm text-blue-800">
                  {{ lead.companyWebsite }}
                </a>
              </p>
            </div>
            <div class="flex-shrink">
              <StatusTag :status="lead.status" class="text-xs" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-grow p-4">
      <div v-if="!editing && !currentLead" class="bg-gray-100 rounded shadow flex flex-col items-center justify-center">
        <h1>Select a lead to get goin</h1>
        <h3>No Lead Selected</h3>
      </div>
      <div v-if="!editing && currentLead" class="">
        <LeadView :lead="currentLead" class="bg-gray-100 rounded shadow p-4" />
        <div class="py-3">
          <button class="bg-blue-500 hover:bg-blue-700 py-1 px-3 rounded text-sm text-white flex-row justify-center" @click="editCurrent">
            <svg class="inline h-5 w-5 fill-current" viewBox="0 0 32 32">
              <path fill="evenodd" d="M19.404,6.65l-5.998-5.996c-0.292-0.292-0.765-0.292-1.056,0l-2.22,2.22l-8.311,8.313l-0.003,0.001v0.003l-0.161,0.161c-0.114,0.112-0.187,0.258-0.21,0.417l-1.059,7.051c-0.035,0.233,0.044,0.47,0.21,0.639c0.143,0.14,0.333,0.219,0.528,0.219c0.038,0,0.073-0.003,0.111-0.009l7.054-1.055c0.158-0.025,0.306-0.098,0.417-0.211l8.478-8.476l2.22-2.22C19.695,7.414,19.695,6.941,19.404,6.65z M8.341,16.656l-0.989-0.99l7.258-7.258l0.989,0.99L8.341,16.656z M2.332,15.919l0.411-2.748l4.143,4.143l-2.748,0.41L2.332,15.919z M13.554,7.351L6.296,14.61l-0.849-0.848l7.259-7.258l0.423,0.424L13.554,7.351zM10.658,4.457l0.992,0.99l-7.259,7.258L3.4,11.715L10.658,4.457z M16.656,8.342l-1.517-1.517V6.823h-0.003l-0.951-0.951l-2.471-2.471l1.164-1.164l4.942,4.94L16.656,8.342z" />
            </svg>
            <span class="inline">Edit</span>
          </button>
        </div>
      </div>
      <div v-if="editing" class="bg-gray-100 rounded shadow">
        <EditLead :lead="currentLead" />
      </div>
    </div>
  </div>
</template>

<script>
import StatusTag from '~/components/statusTag'
import LeadView from '~/components/LeadView'
import EditLead from '~/components/EditLead'
export default {
  components: { StatusTag, LeadView, EditLead },
  data () {
    return {
      currentLead: null,
      editing: false
    }
  },
  computed: {
    leads () {
      return this.$store.getters['leads/all']
    }
  },
  // async fetch ({ store }) {
  //   await store.dispatch('leads/getLeads')
  // },
  methods: {
    setCurrentLead (lead) {
      this.editing = false
      this.currentLead = lead
      // this.$store.dispatch('lead/setCurrentLead', lead)
    },
    clearCurrentLead () {
      this.currentLead = null
      // this.$store.dispatch('lead/clearCurrentLead')
    },
    editCurrent () {
      this.editing = true
    },
    handleAddLead () {
      this.currentLead = null
      this.editing = true
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
