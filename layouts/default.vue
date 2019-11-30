<template>
  <div>
    <NavBar />
    <nuxt class="container pt-20" />
    <Footer />
  </div>
</template>

<script>
import NavBar from './partials/navbar'
import Footer from './partials/footer'
export default {
  components: { NavBar, Footer }
}
</script>
<style>
</style>
