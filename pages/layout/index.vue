<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link to="/" class="navbar-brand">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
          </li>
          <template v-if="auth">
            <li class="nav-item">
              <nuxt-link :to="{ name: 'editor' }" class="nav-link">
                <i class="ion-compose" />&nbsp;New Post
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link :to="{ name: 'settings' }" class="nav-link">
                <i class="ion-gear-a" />&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link :to="{ name: 'settings' }" class="nav-link">
                <img class="user-pic" :src="auth.user.image">
                {{ auth.user.username }}
              </nuxt-link>
            </li>
          </template>
          <li v-else class="nav-item">
            <nuxt-link :to="{ name: 'login' }" class="nav-link">Sign in</nuxt-link>
          </li>
        </ul>
      </div>
    </nav>

    <nuxt-child />

    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['auth'])
  },
  methods: {}
}
</script>

<style scoped lang="scss">

</style>
