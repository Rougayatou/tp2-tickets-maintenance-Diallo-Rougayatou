<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getTicket } from '../services/ticketService'

const route = useRoute()
const ticket = ref(null)
const error = ref('')

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('fr-FR')
}

onMounted(async () => {
  try {
    ticket.value = await getTicket(route.params.id)
  } catch {
    error.value = 'Le ticket demandé n’existe pas.'
  }
})
</script>

<template>
  <section>
    <RouterLink class="back-link" to="/tickets">← Retour à la liste</RouterLink>
    <div v-if="error" class="alert error">{{ error }}</div>
    <article v-else-if="ticket" class="detail-card">
      <div class="card-top">
        <span class="badge">{{ ticket.statut }}</span>
        <span class="priority">{{ ticket.priorite }}</span>
      </div>
      <h1>{{ ticket.titre }}</h1>
      <dl>
        <dt>Description</dt>
        <dd>{{ ticket.description }}</dd>
        <dt>Demandeur</dt>
        <dd>{{ ticket.demandeur }}</dd>
        <dt>Date de création</dt>
        <dd>{{ formatDate(ticket.dateCreation) }}</dd>
      </dl>
      <RouterLink class="button" :to="`/tickets/${ticket.id}/modifier`">Modifier</RouterLink>
    </article>
  </section>
</template>
