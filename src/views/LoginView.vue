<template>
  <form class="login" @submit.prevent="submit">
    <v-card class="login__card">
      <h1 class="mb-4">Log in</h1>
      <v-text-field v-model="form.username" label="Username" autocomplete="username" />
      <v-text-field v-model="form.password" label="Password" type="password" autocomplete="current-password" />
      <v-btn color="light-blue-darken-2" type="submit">Log in</v-btn>
    </v-card>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()
const form = reactive({
  username: '',
  password: '',
})
const submit = () => {
  if (!form.username || !form.password) {
    return
  }

  authStore.login({ username: form.username, password: form.password })
}
</script>

<style lang="scss" scoped>
.login {
  background-color: #f5f5f5;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;

  &__card {
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 400px;
  }

  &__logo {
    margin: 64px 64px 32px;
  }
}
</style>
