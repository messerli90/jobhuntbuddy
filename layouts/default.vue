<template>
  <div>
    <NavBar />
    <nuxt />
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
