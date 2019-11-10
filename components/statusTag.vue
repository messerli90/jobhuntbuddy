<template>
  <span class="rounded-full px-3 py-2 font-semibold truncate" :class="classes">{{ title }}</span>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: false,
      default () {
        return 'created'
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
        case 'created':
          classes = 'bg-yellow-200 text-yellow-800'
          break
        case 'rejected':
          classes = 'bg-red-200 text-red-800'
          break
      }
      return classes
    },
    title () {
      return this.status.charAt(0).toUpperCase() + this.status.slice(1)
    }
  }
}
</script>
