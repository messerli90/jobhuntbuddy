<template>
  <div class="relative">
    <nuxt-link :to="target" :class="'flex flex-row items-center justify-center bg-'+color+'-700 hover:bg-'+color+'-800 text-white rounded-full shadow py-2 pl-6 pr-2'">
      <span class="mr-4 font-semibold">{{ title }}</span>
      <span :class="'bg-'+color+'-500 rounded-full w-6 h-6 flex items-center justify-center text-xs'">
        <fa :icon="['fas', 'chevron-right']" class="h-4" />
      </span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    target: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default () {
        return 'indigo'
      }
    }
  }
}
</script>
