<template>
  <div>
    <NavBar />
    <nuxt class="container pt-16" />
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
