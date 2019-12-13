<template>
  <div :class="'border-'+statusObj.baseColor+'-500'" class="card flex items-center justify-between bg-gray-100 p-6 shadow-md hover:shadow-lg rounded border-l-2 mb-3">
    <div class="w-3/5 flex-grow-0">
      <h2 class="font-semibold text-lg text-gray-900 truncate">
        {{ lead.companyName }}
      </h2>
      <h3 class="font-thin text-gray-700 truncate">
        {{ lead.jobTitle }}
      </h3>
    </div>
    <div class="flex-shrink-0">
      <StatusTag :status="lead.status" size="xs" class="break-words" />
    </div>
  </div>
</template>

<script>
import { STATUSES } from '~/helpers/leads'
import StatusTag from '~/components/statusTag'
export default {
  components: { StatusTag },
  props: {
    lead: {
      type: Object,
      required: true
    }
  },
  computed: {
    statusObj () {
      return STATUSES.find(s => s.key === this.lead.status)
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
