<template>
  <span :class="classes" class="rounded-full px-3 py-2 font-semibold text-center">
    {{ title }}
  </span>
</template>

<script>
import { STATUSES } from '~/helpers/leads'
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
      return `text-white bg-${this.statusObj.baseColor}-500 text-${this.size}`
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
