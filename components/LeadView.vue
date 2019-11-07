<template>
  <div class="p-6">
    <div class="flex justify-between items-center">
      <div>
        <div id="companyName" class="text-2xl text-gray-900">
          <h1 v-if="hasCompanyName">
            {{ lead.companyName }}
          </h1>
          <h1 v-else class="text-gray-600">
            No company name
          </h1>
        </div>
        <div id="jobTitle" class="text-lg text-gray-800">
          <h2 v-if="hasjobTitle">
            {{ lead.jobTitle }}
          </h2>
          <h2 v-else class="text-gray-600">
            No job title
          </h2>
        </div>
      </div>
      <div>
        <div id="companyWebsite" class="text-gray-800 flex flex-col items-center">
          <h1 class="text-gray-900 text-lg">
            Company Website
          </h1>
          <p v-if="hasCompanyWebsite">
            <a :href="lead.companyWebsite" class="text-blue-800">{{ lead.companyWebsite }}</a>
          </p>
          <p v-else class="text-gray-600">
            No website
          </p>
        </div>
      </div>
      <div>
        <StatusTag :status="lead.status" class="text-sm"/>
      </div>
    </div>
  </div>
</template>

<script>
import StatusTag from '~/components/statusTag'
export default {
  props: ['lead'],
  components: { StatusTag },
  computed: {
    hasCompanyName () {
      return !!this.lead.companyName
    },
    hasjobTitle () {
      return !!this.lead.jobTitle
    },
    hasCompanyWebsite () {
      return !!this.lead.companyWebsite
    }
  }
}
</script>
