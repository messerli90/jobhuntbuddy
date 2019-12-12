<template>
  <div class="relative">
    <div class="container pt-8 pb-16 md:pt-32 md:pb-32">
      <div class="flex flex-col justify-center items-center text-center px-4">
        <h1 class="font-semibold text-gray-900 text-4xl pt-8 md:pt-16 md:pb-2">
          It's how you manage the job hunt.
        </h1>
        <p class="text-gray-700 text-xl md:pb-4">
          Organize your job search by tracking leads and staying on top of the hunt.
        </p>
        <CTABtn target="/auth/signup" title="Track your first lead" size="xl" class="py-4" />
      </div>
    </div>
    <div class="w-full relative bg-indigo-500 py-16">
      <h3 class="text-white text-3xl text-center">
        Track your leads
      </h3>
      <h5 class="text-indigo-200 text-xl text-center mb-8">
        See all of your potential jobs in one place and track their status
      </h5>
      <div class="rounded overflow-hidden shadow-lg w-4/5 lg:w-1/2 mx-auto">
        <img src="~/assets/images/screen_leads_list.png" alt="" class="w-full shadow-lg p-3 bg-gray-800 rounded-lg">
      </div>
    </div>
    <h1 class="text-indigo-800 text-center text-3xl pt-8 md:pt-16">
      Stay on top of the hunt
    </h1>
    <div class="container flex flex-col md:flex-row px-4 pt-12 pb-20">
      <div class="w-full flex flex-col items-center py-4 md:px-4">
        <img src="~/assets/images/page-under-construction.png" alt="" class="w-2/3 border-b-2 border-teal-500 rounded">
        <h3 class="text-indigo-700 text-xl py-2">
          Track the status
        </h3>
        <p class="text-gray-700 text-center">
          Keep track of the status of each application so you know what steps to take next. Clear out that list of 'prospects' by sending out some applications, or follow up on leads you haven't heard back about.
        </p>
      </div>
      <div class="w-full flex flex-col items-center py-4 md:px-4">
        <img src="~/assets/images/waiting.png" alt="" class="w-2/3 border-b-2 border-teal-500 rounded">
        <h3 class="text-indigo-700 text-xl py-2">
          Set Reminders
        </h3>
        <p class="text-gray-700 text-center">
          You sent your application five days ago, and you still haven't heard back? Set a reminder so you can be proactive and show your future company you're a go-getter.
        </p>
      </div>
      <div class="w-full flex flex-col items-center py-4 md:px-4">
        <img src="~/assets/images/done-1.png" alt="" class="w-2/3 border-b-2 border-teal-500 rounded">
        <h3 class="text-indigo-700 text-xl py-2">
          Keep Notes
        </h3>
        <p class="text-gray-700 text-center">
          Save the relevant details of the job posting, or start keeping a list of questions you'd like to ask the hiring manager. Keeping notes is a great way to get prepared for the interview.
        </p>
      </div>
    </div>
    <div class="w-full relative bg-indigo-500 py-16 md:mb-8">
      <h3 class="text-white text-3xl text-center">
        Hunt on the go
      </h3>
      <h5 class="text-indigo-200 text-xl text-center mb-8">
        Take your job hunt on the road and check your notes before you walk into the interview.
      </h5>
      <div class="container flex flex-col md:flex-row">
        <div class="w-full md:w-1/3 px-16 py-8">
          <img src="~/assets/images/mobile_screen_lead_list3.png" alt="" class="w-full shadow-lg p-5 bg-gray-800 rounded-lg">
        </div>
        <div class="w-full md:w-1/3 px-16 py-8">
          <img src="~/assets/images/mobile_screen_lead3.png" alt="" class="w-full shadow-lg p-5 bg-gray-800 rounded-lg">
        </div>
        <div class="w-full md:w-1/3 px-16 py-8">
          <img src="~/assets/images/mobile_screen_create1.png" alt="" class="w-full shadow-lg p-5 bg-gray-800 rounded-lg">
        </div>
      </div>
    </div>
    <div class="w-full relative py-8 md:mb-8">
      <h3 class="text-gray-800 text-2xl text-center">
        What are you waiting for?
      </h3>
      <h5 class="text-gray-600 text-lg text-center mb-4">
        It's how you manage the job hunt!
      </h5>
      <div class="flex justify-center">
        <CTABtn target="/auth/signup" title="Track your first lead" size="2xl" class="py-4" />
      </div>
    </div>
  </div>
</template>

<script>
import CTABtn from '~/components/ctaBtn'
export default {
  components: { CTABtn }
}
</script>
