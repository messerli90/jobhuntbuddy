<template>
  <div class="bg-indigo-200 rounded px-2 py-2">
    <h2 class="text-lg text-indigo-800 font-semibold px-2 py-1">
      Upcoming Reminders
    </h2>
    <ul>
      <transition-group name="list" tag="li">
        <ReminderItem v-for="r in reminders" :key="r.id" :reminder="r" />
      </transition-group>
    </ul>
  </div>
</template>

<script>
import ReminderItem from '~/components/reminders/reminderItem'
export default {
  components: { ReminderItem },
  props: {
    reminders: {
      type: Array,
      required: true
    }
  },
  computed: {
    leads () {
      return this.$store.getters['leads/getLeads']
    }
  }
}
</script>

<style>
.list-enter-active, .list-leave-active {
  transition: all 500ms;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(0);
}
</style>
