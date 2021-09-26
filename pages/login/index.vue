<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? `Sign in` : `Sign up` }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" :to="{ name: 'register' }">Need an account?</nuxt-link>
            <nuxt-link v-else :to="{ name: 'login' }">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="val, key in errors">
              <li v-for="msg in val" :key="msg">{{ `${key} ${msg}` }} </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Your Name">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
import { login } from '@/api/user'

export default {
  name: 'Login',
  middleware: 'notAuthenticated',
  data() {
    return {
      user: {
        email: 'ssxsyj@gmail.com',
        password: 'realworld'
      },
      errors: {}
    }
  },
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    }
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = await login({ user: this.user })
        this.$store.commit('setAuth', data)
        Cookie.set('auth', JSON.stringify(data))
        this.$router.push('/')
      } catch (err) {
        this.errors = err.response.data.errors
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
