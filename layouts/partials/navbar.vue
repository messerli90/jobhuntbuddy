<template>
  <header class="z-50">
    <div class="w-screen bg-indigo-700 h-1" />
    <div class="container">
      <div class="w-full p-2 md:px-0 flex items-center justify-between flex-wrap">
        <div class="flex items-center flex-shrink-0">
          <svg class="fill-current text-teal-500 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84.0419297409285 60"><g id="5f0e4cb3-c991-4015-a5dd-8550d53a5659" data-v-423bf9ae="" transform="matrix(0.8584796190261841,0,0,0.8584796190261841,-0.6060856580734253,-13.164786338806152)"><path d="M53.893 81.15c-4.05-1.67-26.459-3.809-35.562-4.562a32.449 32.449 0 0 1-.641-.053 1.517 1.517 0 0 1 .266-3.02l.831.07c5.337.385 17.599.29 21.787-4.13 1.196-1.264 1.64-2.8 1.356-4.698-.39-2.606-1.633-4.613-3.801-6.134-5.812-4.079-16.409-3.395-21.744-2.721l-.012.019C7.378 57.531.706 63.342.706 70.283c0 7.783 8.385 14.276 19.037 14.882l.025.055 1.63.005 38.571-.002c-1.705-1.48-3.957-3.201-6.076-4.073z" /><path d="M63.247 42.95l33.241-9.473c2.829-4.857 2.979-8.185-.527-8.779-3.044-.517-5.981-.89-8.828-1.15-.644-4.639-4.615-8.213-9.431-8.213-4.851 0-8.847 3.627-9.444 8.316-25.467 2.843-40.835 16.656-49.636 28.956 6.13-.542 15.464-.521 21.248 3.537 2.845 1.995 4.546 4.744 5.058 8.167.424 2.841-.301 5.273-2.155 7.231-1.646 1.738-4.081 2.915-6.795 3.704 3.447.381 6.931.805 10.003 1.248.917-.254 1.734-.571 2.417-.965a166.368 166.368 0 0 0 5.2-3.138L64.62 85.226h18.174a3.176 3.176 0 1 0 0-6.353H72.54l-8.557-13.511c13.106-9.529 24.041-20.054 29.929-28.023l-29.841 8.504a1.505 1.505 0 0 1-.824-2.893zm14.455-21.278a3.193 3.193 0 1 1 0 6.386 3.193 3.193 0 0 1 0-6.386z" /></g></svg>
          <nuxt-link :to="authenticated ? '/leads' : '/'" class="text-gray-900 text-2xl font-bold">
            Job<span class="font-thin">Hunt</span>Buddy<span class="font-thin">.co</span>
          </nuxt-link>
        </div>
        <div class="block lg:hidden">
          <button @click="isOpen = !isOpen" class="flex items-center px-3 py-2 border rounded text-indigo-300 border-indigo-400 hover:text-white hover:border-white">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
        </div>
        <div :class="isOpen ? 'block' : 'hidden'" class="w-full  flex-grow bg-indigo-700 lg:bg-transparent lg:flex lg:items-center justify-end lg:w-auto rounded-b rounded-tl">
          <CTABtn v-if="authenticated" target="/leads/create" title="Track New Lead" class="hidden lg:block" />
          <nuxt-link
            v-if="authenticated"
            to="/leads/create"
            class="block px-4 py-2 lg:hidden text-white font-semibold"
          >
            Track new lead
          </nuxt-link>
          <nuxt-link
            v-if="authenticated"
            to="/profile"
            class="block px-4 py-2 text-white lg:text-gray-700 font-semibold hover:text-indigo-600"
          >
            <fa :icon="['fas', 'user-circle']" class="h-4" />
            <span class="sm:hidden">Profile</span>
          </nuxt-link>
          <nuxt-link
            v-if="!authenticated"
            to="/auth/signin"
            class="block py-2 text-center text-white lg:text-gray-700 font-semibold hover:text-teal-200 lg:hover:text-indigo-700 mr-6"
          >
            Sign In
          </nuxt-link>
          <CTABtn v-if="!authenticated" target="/auth/signup" title="Get Started" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import CTABtn from '~/components/ctaBtn'

export default {
  components: { CTABtn },
  data () {
    return {
      isOpen: false
    }
  }
}
</script>
