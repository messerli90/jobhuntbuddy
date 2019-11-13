import Vue from 'vue'
import { mapGetters } from 'vuex'

const User = {
  install (Vue, options) {
    Vue.mixin({
      computed: {
        ...mapGetters({
          uid: 'users/uid',
          user: 'users/user',
          authenticated: 'users/isAuthenticated'
        })
      }
    })
  }
}

Vue.use(User)
