<template>
  <v-form v-model="isFormValid" class="login" @submit.prevent="submit">
    <v-card class="login__card">
      <h1 class="mb-4">Log in</h1>
      <v-text-field
          v-model="form.username"
          label="Username"
          autocomplete="username"
          required
          :rules="[required]"
      />
      <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
          autocomplete="current-password"
          :rules="[required]"
      />
      <v-btn color="light-blue-darken-2" type="submit">Log in</v-btn>
      <v-alert
          v-if="showLoginError"
          density="compact"
          type="error"
          text="Invalid username or password"
      />
    </v-card>
  </v-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()
const showLoginError = ref(false)
const isFormValid = ref(false)

const required = value => {
  if (value.length) return true

  return 'This field is required.'
}

const form = reactive({
  username: '',
  password: '',
})
const submit = () => {
  if (isFormValid.value) {
    try {
      authStore.login({ username: form.username, password: form.password })
    } catch (e) {
      showLoginError.value = true
    }
  }
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
    gap: 8px;
    flex-direction: column;
    align-items: stretch;
    width: 400px;
  }

  &__logo {
    margin: 64px 64px 32px;
  }
}
</style>
