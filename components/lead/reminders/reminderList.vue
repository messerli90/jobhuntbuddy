<template>
  <div>
    <div class="bg-white border-t-2 border-indigo-600 p-4 w-full rounded">
      <h2 class="pb-4 flex justify-between items-center">
        <span class="text-indigo-800 text-xl">
          Reminders
        </span>
      </h2>
      <div>
        <div v-if="!reminders.length">
          <p class="text-gray-600 italic">
            No reminders added.
          </p>
        </div>
        <div v-else>
          <ul>
            <transition-group name="list" tag="li">
              <ReminderItem v-for="r in reminders" :key="r.id" :reminder="r" />
            </transition-group>
          </ul>
        </div>
        <form @submit.prevent="addReminder" class="w-full pt-4">
          <div
            class="flex items-center border-b border-b-2 border-indigo-500 py-2"
          >
            <input
              v-model="reminder.text"
              class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="i.e. send follow up email"
              aria-label="Reminder Text"
            >
            <input
              v-model="reminder.date"
              class="appearance-none bg-transparent border-none w-56 text-gray-700 mr-3 py-1 leading-tight focus:outline-none"
              type="date"
              aria-label="Reminder Date"
            >
            <input
              v-model="reminder.time"
              class="appearance-none bg-transparent border-none w-56 text-gray-700 py-1 leading-tight focus:outline-none"
              type="time"
              aria-label="Reminder Date"
            >
          </div>
          <div class="flex justify-between py-2">
            <div class="text-red-500 text-sm italic">
              {{ errorMessage }}
            </div>
            <div class="flex justify-end">
              <button
                class="flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white py-1 px-2 rounded-full"
                type="submit"
              >
                {{ saveButtonText }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import ReminderItem from '~/components/lead/reminders/reminderItem'
export default {
  components: { ReminderItem },
  props: {
    leadId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      saving: false,
      newReminder: true,
      errorMessage: '',
      reminder: {
        text: '',
        date: '',
        time: '12:00'
      }
    }
  },
  computed: {
    reminders () {
      return this.$store.getters['reminders/getRemindersByLead'](this.leadId)
    },
    saveButtonText () {
      return this.saving ? 'Saving...' : 'Add Reminder'
    }
  },
  mounted () {
    this.fetchReminders()
  },
  methods: {
    humanDate (reminder) {
      return moment.unix(reminder.dateTime.seconds).fromNow()
    },
    fetchReminders () {
      this.$store.dispatch('reminders/fetchAllReminders')
    },
    async addReminder () {
      this.saving = true
      await this.validate()
      if (!this.errorMessage.length) {
        const datetime = moment(this.reminder.date + ' ' + this.reminder.time)
        const reminder = {
          text: this.reminder.text,
          dateTime: datetime.toDate(),
          leadId: this.leadId
        }
        await this.$store.dispatch('reminders/createReminder', reminder)
        this.reminder = {
          text: '',
          date: '',
          time: '12:00'
        }
      }
      this.saving = false
    },
    validate () {
      this.errorMessage = ''
      if (!this.reminder.text) {
        this.errorMessage = 'Reminders need a title.'
      } else if (!this.reminder.date) {
        this.errorMessage = 'Reminders need a date.'
      } else if (!this.reminder.time) {
        this.errorMessage = 'Reminders need a time.'
      } else if (moment().isAfter(this.reminder.date)) {
        this.errorMessage = 'Reminders needs to be in the future.'
      }
    }
  }
}
</script>
