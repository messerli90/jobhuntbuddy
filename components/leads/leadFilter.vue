<template>
  <div>
    <div class="w-full mb-2">
      <input :value="search" type="search" class="h-12 p-4 mb-1 w-full bg-white border-2 border-gray-300 rounded-full" placeholder="Search leads..." @input="handleSearch">
    </div>
    <div class="mb-4 w-full">
      <div class="flex flex-wrap items-center justify-center md:justify-between w-full text-gray-800">
        <button class="bg-gray-400 rounded-full px-3 py-2 font-medium text-center text-sm m-1 hover:bg-gray-500" :class="{ 'bg-indigo-700 text-white hover:bg-indigo-800' : status === 'all' }" @click="handleStatusFilter('all')">
          All Leads
        </button>
        <button class="bg-gray-400 rounded-full px-3 py-2 font-medium text-center text-sm m-1 hover:bg-gray-500" :class="{ 'bg-yellow-500 text-white hover:bg-yellow-600' : status === 'prospect' }" @click="handleStatusFilter('prospect')">
          Prospects
        </button>
        <button class="bg-gray-400 rounded-full px-3 py-2 font-medium text-center text-sm m-1 hover:bg-gray-500" :class="{ 'bg-green-500 text-white hover:bg-green-600' : status === 'application-sent' }" @click="handleStatusFilter('application-sent')">
          Application Sent
        </button>
        <button class="bg-gray-400 rounded-full px-3 py-2 font-medium text-center text-sm m-1 hover:bg-gray-500" :class="{ 'bg-blue-500 text-white hover:bg-blue-600' : status === 'interview-set' }" @click="handleStatusFilter('interview-set')">
          Interview Set
        </button>
        <button class="bg-gray-400 rounded-full px-3 py-2 font-medium text-center text-sm m-1 hover:bg-gray-500" :class="{ 'bg-red-500 text-white hover:bg-red-600' : status === 'rejected' }" @click="handleStatusFilter('rejected')">
          Rejected
        </button>
      </div>
    </div>
    <div class="flex justify-end">
      <div class="relative mb-3 pr-4 pl-8">
        <p v-click-outside="closeOrderDropDown" class="text-gray-700 cursor-pointer" @click="orderOpen = !orderOpen">
          <fa :icon="['fas', 'sort-amount-down']" class="h-4 mx-1" />
          Order By
          <span v-show="orderChanged" class="font-semibold">{{ orderText }}</span>
        </p>
        <ul v-show="orderOpen" class="bg-white absolute z-20 px-3 py-2 mt-1 rounded shadow-lg text-gray-700 min-w-full">
          <li class="cursor-pointer pb-1 hover:text-indigo-600" :class="{ 'text-indigo-600' : order === 'createdAt' }" @click="handleFilterOrder('createdAt')">
            Created Date
          </li>
          <li class="cursor-pointer pb-1 hover:text-indigo-600" :class="{ 'text-indigo-600' : order === 'companyName' }" @click="handleFilterOrder('companyName')">
            Company Name
          </li>
          <li class="cursor-pointer hover:text-indigo-600" :class="{ 'text-indigo-600' : order === 'jobTitle' }" @click="handleFilterOrder('jobTitle')">
            Job Title
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from '~/helpers/index'
export default {
  data () {
    return {
      orderOpen: false,
      orderChanged: false
    }
  },
  computed: {
    search () {
      return this.$store.state.leads.filter.search
    },
    status () {
      return this.$store.state.leads.filter.status
    },
    order () {
      return this.$store.state.leads.filter.order
    },
    orderText () {
      switch (this.order) {
        case 'companyName':
          return 'Company Name'
        case 'jobTitle':
          return 'Job Title'
        default:
          return 'Created Date'
      }
    }
  },
  methods: {
    handleStatusFilter (status) {
      this.$store.dispatch('leads/filterStatus', status)
    },
    handleSearch: debounce(function (e) {
      this.$store.dispatch('leads/filterSearch', e.target.value)
    }, 500),
    handleFilterOrder (orderBy) {
      this.orderOpen = false
      this.orderChanged = true
      this.$store.dispatch('leads/filterOrder', orderBy)
    },
    closeOrderDropDown (e) {
      this.orderOpen = false
    }
  }
}
</script>
