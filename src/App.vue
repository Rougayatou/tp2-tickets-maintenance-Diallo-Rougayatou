<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="topbar">
    <div class="container topbar-content">
      <RouterLink class="brand" to="/tickets">Ticket Maintenance</RouterLink>
      <nav>
        <RouterLink to="/tickets">Liste des tickets</RouterLink>
        <RouterLink class="button button-small" to="/tickets/nouveau">Nouveau ticket</RouterLink>
      </nav>
    </div>
  </header>

  <main class="container page">
    <RouterView />
  </main>
</template>
