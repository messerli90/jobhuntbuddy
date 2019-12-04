<template>
  <footer class="container w-full py-8 text-sm text-gray-600">
    <div class="flex flex-col items-center justify-center lg:flex-row lg:justify-between">
      <div class="flex content-center pb-4">
        <nuxt-link to="/policy/terms" class="hover:text-indigo-500">
          Terms of Service
        </nuxt-link>
        <p class="mx-2">
          |
        </p>
        <nuxt-link to="/policy/privacy" class="hover:text-indigo-500">
          Privacy Policy
        </nuxt-link>
      </div>
      <p class="">
        Made with <fa :icon="['fas', 'heart']" class="h-4 inline text-red-500" /> by <a href="https://twitter.com/michaelmesserli" class="text-gray-700 hover:text-indigo-700">@michaelmesserli</a>.
      </p>
    </div>
  </footer>
</template>
