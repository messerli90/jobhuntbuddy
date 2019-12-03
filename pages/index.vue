<template>
  <div class="relative">
    <div class="container pt-8 pb-16 md:pt-16 md:pb-32">
      <div class="flex flex-col justify-center items-center text-center px-4">
        <h1 class="font-semibold text-gray-900 text-4xl pt-8 md:pt-16">
          It's how you find a job.
        </h1>
        <p class="text-gray-700 text-xl md:pb-4">
          Manage your job search by tracking leads and staying on top of the hunt.
        </p>
        <CTABtn target="/auth/signup" title="Get started for free" class="py-4" />
      </div>
    </div>
    <div class="w-full relative bg-indigo-500 py-8 md:py-32">
      <div class="rounded overflow-hidden shadow-lg w-4/5 lg:w-1/2 mx-auto">
        <img src="~/assets/images/screen4.png" alt="" class="w-full">
      </div>
    </div>
    <h1 class="text-indigo-800 text-center text-3xl py-8">
      Stay on top of things
    </h1>
    <div class="container flex flex-col md:flex-row px-4">
      <div class="w-full flex flex-col items-center py-4 md:px-4">
        <img src="~/assets/images/page-under-construction.png" alt="" class="w-2/3 border-b-2 border-teal-500 rounded">
        <h3 class="text-indigo-700 text-xl py-2">
          Track the status
        </h3>
        <p class="text-gray-700 text-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis obcaecati delectus ipsa quos eligendi, unde animi corrupti tenetur.
        </p>
      </div>
      <div class="w-full flex flex-col items-center py-4 md:px-4">
        <img src="~/assets/images/waiting.png" alt="" class="w-2/3 border-b-2 border-teal-500 rounded">
        <h3 class="text-indigo-700 text-xl py-2">
          Set Reminders
        </h3>
        <p class="text-gray-700 text-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis obcaecati delectus ipsa quos eligendi, unde animi corrupti tenetur.
        </p>
      </div>
      <div class="w-full flex flex-col items-center py-4 md:px-4">
        <img src="~/assets/images/done-1.png" alt="" class="w-2/3 border-b-2 border-teal-500 rounded">
        <h3 class="text-indigo-700 text-xl py-2">
          Keep Notes
        </h3>
        <p class="text-gray-700 text-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis obcaecati delectus ipsa quos eligendi, unde animi corrupti tenetur.
        </p>
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
