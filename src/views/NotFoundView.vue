<template>
  <section class="not-found">
    <div class="not-found__card">
      <v-card-title>
        <h1>Page not found</h1>
      </v-card-title>
      <v-card-text>
        <p>Sorry, we couldn't find the page you were looking for.</p>
      </v-card-text>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.not-found {
  background-color: #f5f5f5;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;

  &__card {
    padding: 16px;
    display: flex;
    gap: 8px;
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
