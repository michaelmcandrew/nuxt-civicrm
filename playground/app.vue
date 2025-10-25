<script setup lang="ts">
const { data } = await useCivi().api('Contact', 'get', { limit: 10 })
</script>

<template>
  <div>
    <header>
      <h1>
        Nuxt CiviCRM playground
      </h1>
      <CiviLogin />
    </header>
    <p>This is a very simple example that shows 10 contacts from CiviCRM.</p>
    <div v-if="data">
      <div
        v-for="contact in data.values"
        :key="contact.id"
      >
        {{ contact.display_name }}
      </div>
    </div>
  </div>
</template>

<style>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  .login form,
  .login div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  input {
    width: 80px;
  }
}
</style>
