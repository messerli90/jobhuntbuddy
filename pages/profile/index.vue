<template>
  <div>
    <div class="py-2 px-4 bg-white rounded">
      <PasswordChange />
    </div>
  </div>
</template>

<script>
import PasswordChange from '~/components/profile/passwordChange'
export default {
  layout: 'profile',
  components: { PasswordChange }
}
</script>
