<template>
  <span class="rounded-full px-3 py-2 font-semibold text-center" :class="classes">
    {{ title }}
  </span>
</template>

<script>
import { STATUSES } from '~/store/leads'
export default {
  props: {
    status: {
      type: String,
      required: false,
      default () {
        return 'prospect'
      }
    },
    size: {
      type: String,
      required: false,
      default () {
        return 'sm'
      }
    }
  },
  computed: {
    classes () {
      if (!this.statusObj) {
        return 'text-gray-800 bg-gray-200'
      }
      return `text-${this.statusObj.baseColor}-800 bg-${this.statusObj.baseColor}-200 text-${this.size}`
    },
    title () {
      if (!this.statusObj) {
        return 'Prospect'
      }
      return this.statusObj.text
    },
    statusObj () {
      return STATUSES.find(s => s.key === this.status)
    }
  }
}
</script>
