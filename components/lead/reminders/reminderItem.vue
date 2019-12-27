<template>
  <div
    @mouseenter="showRemove = true"
    @mouseleave="showRemove = false"
    class="py-2 px-2 hover:bg-indigo-200 rounded"
  >
    <div class="flex flex-row justify-between items-center w-full">
      <div class="flex">
        <div class="text-indigo-600 mr-2">
          <span :class="{ 'text-red-700': pastDue }">
            {{ humanDate }}
          </span>
        </div>
        <p class="text-gray-800">
          {{ reminder.text }}
        </p>
      </div>
      <div v-show="showRemove" class="text-right px-2">
        <fa :icon="['fas', 'check']" @click.prevent="removeItem" class="h-4 lg:block text-indigo-700 hover:text-teal-700 cursor-pointer" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    reminder: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showRemove: false
    }
  },
  computed: {
    leads () {
      return this.$store.getters['leads/getLeads']
    },
    humanDate () {
      return moment.unix(this.reminder.dateTime.seconds).fromNow()
    },
    companyName () {
      const lead = this.leads.filter((l) => {
        return l.id === this.reminder.leadId
      })
      return lead[0].companyName
    },
    pastDue () {
      return moment().isAfter(moment.unix(this.reminder.dateTime.seconds))
    }
  },
  methods: {
    removeItem () {
      this.$store.dispatch('reminders/removeReminder', this.reminder)
    }
  }
}
</script>
