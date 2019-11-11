<template>
  <div class="flex flex-wrap pt-16">
    <div class="w-screen md:w-1/2 lg:w-1/3 p-2 pl-0 sm:overflow-y-auto">
      <div class="flex flex-row pb-4">
        <button class="btn" @click="handleAddLead">
          Add New Lead
        </button>
      </div>
      <div>
        <div v-for="lead in leads" :key="lead.name">
          <div class="card overflow-hidden flex items-center justify-between bg-gray-100 px-4 py-3 shadow rounded border-gray-700 mb-3" @click="setCurrentLead(lead)">
            <div class="w-2/3">
              <h2 class="font-medium text-lg text-gray-800">
                {{ lead.companyName }}
              </h2>
              <h3 class="font-thin text-sm text-gray-800">
                {{ lead.jobTitle }}
              </h3>
              <p class="truncate">
                <a href="#" class="text-sm text-blue-800 truncate">
                  {{ lead.companyWebsite }}
                </a>
              </p>
            </div>
            <div class="">
              <StatusTag :status="lead.status" class="text-xs" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-grow md:w-1/2 lg:w-2/3 p-2 pr-0">
      <div v-if="!editing && !currentLead" class="bg-gray-100 rounded shadow flex flex-col items-center justify-center">
        <WelcomeMessage />
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
          <a href="" class="py-1 px-3 text-sm text-red-800 underline" @click.prevent="removeCurrent">Remove</a>
        </div>
      </div>
      <div>
        <EditLead v-if="editing" :lead="currentLead" />
      </div>
    </div>
  </div>
</template>

<script>
import StatusTag from '~/components/statusTag'
import LeadView from '~/components/LeadView'
import EditLead from '~/components/EditLead'
import WelcomeMessage from '~/components/WelcomeMessage'
export default {
  components: { StatusTag, LeadView, EditLead, WelcomeMessage },
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
    },
    editCurrent () {
      this.editing = true
    },
    removeCurrent () {
      const confirmRemove = confirm('Are you sure you want to remove this lead?')
      if (confirmRemove) {
        this.$store.dispatch('leads/remove', this.currentLead)
        this.currentLead = null
      }
    },
    handleAddLead () {
      const self = this
      new Promise(function (resolve, reject) {
        self.editing = false
        self.currentLead = null
        resolve(true)
      }).then(function () {
        self.editing = true
      })
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
