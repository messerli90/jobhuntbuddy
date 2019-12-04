<template>
  <div class="flex flex-col items-center justify-center h-full text-gray-900 p-8 rounded bg-gray-100">
    <h2 class="uppercase pb-6 text-3xl">
      Welcome to <span class="font-bold">JobHuntBuddy</span>
    </h2>
    <p class="text-lg">
      <span class="font-bold">Congrats!</span> You've made the first step towards managing your job hunt.
    </p>
    <p class="mt-6">
      JobHuntBuddy is here to help you keep track of jobs you find around the web. Create a lead for every position you find and enter useful information like:
    </p>
    <ul class="text-center text-gray-800 text-sm mt-4">
      <li class="py-2">
        Contact name &amp; email
      </li>
      <li class="py-2">
        Links to company website and job listing
      </li>
      <li class="py-2">
        Keep <span class="font-semibold">notes</span> on things like questions you'd ask during the interview
      </li>
      <li class="py-2">
        <span class="font-semibold"> Track the status</span> of your application: <span class="italic">Just a Prospect</span>, <span class="italic">Application Sent</span>, <span class="italic">Interview Set</span>, etc.
      </li>
    </ul>
    <p class="mt-12">
      The only thing left to do is
    </p>
    <div class="mt-4">
      <CTABtn target="/leads/create" title="Start tracking your first lead" size="lg" />
    </div>
  </div>
</template>

<script>
import CTABtn from '~/components/ctaBtn'
export default {
  components: { CTABtn }
}
</script>
