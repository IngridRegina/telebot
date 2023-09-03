<template>
  <v-app>
    <component :is="route.meta.layout || 'main'">
      <RouterView />
    </component>
  </v-app>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
const route = useRoute()
</script>
