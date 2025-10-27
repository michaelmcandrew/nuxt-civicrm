<script setup lang="ts">
import { ref } from '#imports'
import { useCivi } from '../composables/useCivi'

const { user, login, logout } = useCivi()

async function doLogin() {
  await login(username.value, password.value)
  username.value = ''
  password.value = ''
}
const username = ref('')
const password = ref('')
</script>

<template>
  <div class="login">
    <form
      v-if="!user"
      @submit.prevent="doLogin()"
    >
      <input
        v-model="username"
        placeholder="Username"
        autocomplete="username"
      >
      <input
        v-model="password"
        placeholder="Password"
        type="password"
        autocomplete="current-password"
      >
      <button>
        Login
      </button>
    </form>
    <div v-else>
      <p>Logged in as {{ user.display_name }}</p>
      <button @click="logout()">
        Logout
      </button>
    </div>
  </div>
</template>
