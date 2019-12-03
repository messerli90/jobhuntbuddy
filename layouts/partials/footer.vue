<template>
  <footer class="pt-16 pb-8 text-center text-sm text-gray-600 flex flex-wrap justify-between container">
    <div class="flex content-center">
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
    <p class="flex-grow text-right">
      Made with <fa :icon="['fas', 'heart']" class="h-4 inline text-red-500" /> by <a href="https://twitter.com/michaelmesserli" class="text-gray-700 hover:text-indigo-700">@michaelmesserli</a>.
    </p>
  </footer>
</template>
