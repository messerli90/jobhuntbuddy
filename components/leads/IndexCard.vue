<template>
  <div class="card flex items-center justify-between bg-gray-100 p-6 shadow-md hover:shadow-lg rounded border-gray-700 mb-3">
    <div class="w-3/5 flex-grow-0">
      <h2 class="font-medium text-lg text-gray-800 truncate">
        {{ lead.companyName }}
      </h2>
      <h3 class="font-thin text-sm text-gray-800 truncate">
        {{ lead.jobTitle }}
      </h3>
    </div>
    <div class="flex-shrink-0">
      <StatusTag :status="lead.status" size="xs" class="break-words" />
    </div>
  </div>
</template>

<script>
import StatusTag from '~/components/statusTag'
export default {
  components: { StatusTag },
  props: {
    lead: {
      type: Object,
      required: true
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
