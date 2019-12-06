<template>
  <div>
    <NavBar />
    <div class="container px-2 lg:py-2">
      <div class="flex flex-col w-full lg:w-2/3 xl:w-1/2 mx-auto">
        <div id="profile-sidebar" class="w-full">
          <ProfileMenu />
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
  components: { NavBar, Footer, ProfileMenu }
}
</script>
<style>
</style>
