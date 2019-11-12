<template>
  <span class="rounded-full px-3 py-2 font-semibold text-center" :class="classes">
    {{ title }}
  </span>
</template>

<script>
// import { STATUSES } from '~/store/leads'
export default {
  props: {
    status: {
      type: String,
      required: false,
      default () {
        return 'just a hunch'
      }
    }
  },
  computed: {
    classes () {
      let classes = ''
      switch (this.status) {
        case 'application sent':
          classes = 'bg-green-200 text-green-800'
          break
        case 'interview set':
          classes = 'bg-blue-200 text-blue-800'
          break
        case 'rejected':
          classes = 'bg-red-200 text-red-800'
          break
        default:
          classes = 'bg-yellow-200 text-yellow-800'
      }
      return classes
    },
    title () {
      return this.status.charAt(0).toUpperCase() + this.status.slice(1)
    }
  }
}
</script>
