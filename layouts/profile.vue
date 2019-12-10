<template>
  <div>
    <NavBar />
    <div class="container px-2 lg:py-2">
      <div class="flex flex-col w-full lg:w-2/3 xl:w-1/2 mx-auto">
        <div id="profile-sidebar" class="w-full">
          <h1 class="text-center text-2xl text-gray-800">
            Account Settings
          </h1>
          <ProfileMenu v-if="showMenu" />
        </div>
        <div id="profile-main" class="mt-4 w-full">
          <nuxt />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from './partials/navbar'
import Footer from './partials/footer'
import ProfileMenu from '~/components/profile/menu'
export default {
  components: { NavBar, Footer, ProfileMenu },
  data () {
    return {
      showMenu: false
    }
  }
}
</script>
<style>
</style>
