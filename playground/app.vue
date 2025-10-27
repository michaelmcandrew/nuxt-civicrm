<script setup lang="ts">
const { api, user } = useCivi()
const { data } = await api('Contact', 'get', { limit: 10 })
</script>

<template>
  <div>
    <header>
      <h1>
        Nuxt CiviCRM playground
      </h1>
      <CiviLogin />
    </header>
    <p>
      This is a very simple example that shows 10 contacts from CiviCRM.
    </p>
    <p v-if="!user">
      You need to log in to see the contacts.
    </p>
    <div v-if="data">
      <div v-for="contact in data.values" :key="contact.id">
        {{ contact.display_name }}
      </div>
    </div>
  </div>
</template>

<style>
@import '@fontsource-variable/figtree';

* {
  font-family: 'Figtree variable';
}

header {
  border-bottom: 1px solid black;
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
