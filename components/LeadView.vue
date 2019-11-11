<template>
  <div class="">
    <div class="flex sm:flex-row content-center justify-between items-center">
      <div>
        <div id="companyName" class="text-2xl text-gray-900">
          <h1 v-if="!!lead.companyName">
            {{ lead.companyName }}
          </h1>
          <h1 v-else class="text-gray-600">
            No company name
          </h1>
        </div>
        <div id="jobTitle" class="text-lg text-gray-800">
          <h2 v-if="!!lead.jobTitle">
            {{ lead.jobTitle }}
          </h2>
          <h2 v-else class="text-gray-600">
            No job title
          </h2>
        </div>
      </div>
      <div class="items-center">
        <div v-if="!!lead.companyWebsite" id="companyWebsite" class="py-2 text-gray-800 flex flex-col items-center text-sm">
          <p>
            <a :href="lead.companyWebsite" class="text-blue-800">{{ lead.companyWebsite }}</a>
          </p>
          <p class="text-gray-900 text-xs">
            Company Website
          </p>
        </div>
        <div v-if="!!lead.listingWebsite" id="listingWebsite" class="py-2 text-gray-800 flex flex-col items-center text-sm">
          <p>
            <a :href="lead.listingWebsite" class="text-blue-800">{{ lead.listingWebsite }}</a>
          </p>
          <p class="text-gray-900 text-xs">
            Company Website
          </p>
        </div>
      </div>
      <div>
        <StatusTag v-if="lead.status" :status="lead.status" class="text-sm" />
      </div>
    </div>
    <div class="py-2">
      <hr>
    </div>
    <div class="flex flex-row py-2">
      <div class="w-full">
        <dl>
          <div v-show="lead.contactName" class="py-1">
            <dt class="text-xs text-gray-700">
              Contact Name
            </dt>
            <dd>
              {{ lead.contactName }}
            </dd>
          </div>
          <div v-show="lead.contactEmail" class="py-1">
            <dt class="text-xs text-gray-700">
              Contact Email
            </dt>
            <dd>
              {{ lead.contactEmail }}
            </dd>
          </div>
        </dl>
      </div>
      <div class="w-full">
        <h3 class="text-lg">
          Notes
        </h3>
        <div class="text-gray-600 text-sm">
          <p>No Notes.</p>
        </div>
      </div>
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
  },
  computed: {},
  mounted () {
    // console.log(EMPTY_LEAD)
  },
  methods: {}
}
</script>
