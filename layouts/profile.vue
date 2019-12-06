<template>
  <div>
    <NavBar />
    <div class="container px-2">
      <div class="flex flex-col">
        <div id="profile-sidebar">
          <ProfileMenu />
        </div>
        <div id="profile-main" class="mt-4">
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
