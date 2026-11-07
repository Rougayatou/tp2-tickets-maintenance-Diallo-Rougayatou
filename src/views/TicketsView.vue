<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { deleteTicket, getTickets, updateTicket } from '../services/ticketService'

const tickets = ref([])
const search = ref('')
const statusFilter = ref('')
const error = ref('')
const loading = ref(false)

const statuses = ['Ouvert', 'En cours', 'Résolu', 'Fermé']

const filteredTickets = computed(() => {
  const text = search.value.toLowerCase().trim()
  return tickets.value.filter((ticket) => {
    const matchesText =
      !text ||
      ticket.titre.toLowerCase().includes(text) ||
      ticket.description.toLowerCase().includes(text) ||
      ticket.demandeur.toLowerCase().includes(text)
    const matchesStatus = !statusFilter.value || ticket.statut === statusFilter.value
    return matchesText && matchesStatus
  })
})

async function loadTickets() {
  loading.value = true
  error.value = ''
  try {
    tickets.value = await getTickets()
  } catch {
    error.value = 'Impossible de charger les tickets. Vérifiez que JSON Server est lancé.'
  } finally {
    loading.value = false
  }
}

async function changeStatus(ticket) {
  const currentIndex = statuses.indexOf(ticket.statut)
  const nextStatus = statuses[(currentIndex + 1) % statuses.length]
  try {
    const updatedTicket = await updateTicket(ticket.id, { statut: nextStatus })
    ticket.statut = updatedTicket.statut
  } catch {
    error.value = 'Le changement de statut n’a pas pu être enregistré.'
  }
}

async function removeTicket(ticket) {
  if (!window.confirm(`Supprimer le ticket « ${ticket.titre} » ?`)) return

  try {
    await deleteTicket(ticket.id)
    tickets.value = tickets.value.filter((item) => item.id !== ticket.id)
  } catch {
    error.value = 'La suppression a échoué. Vérifiez la connexion au serveur.'
  }
}

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('fr-FR')
}

onMounted(loadTickets)
</script>

<template>
  <section>
    <div class="page-heading">
      <div>
        <p class="eyebrow">Maintenance informatique</p>
        <h1>Mes tickets</h1>
      </div>
      <RouterLink class="button" to="/tickets/nouveau">+ Nouveau ticket</RouterLink>
    </div>

    <div v-if="error" class="alert error">{{ error }}</div>

    <div class="filters">
      <label>
        Rechercher
        <input v-model="search" type="search" placeholder="Titre, description ou demandeur" />
      </label>
      <label>
        Filtrer par statut
        <select v-model="statusFilter">
          <option value="">Tous les statuts</option>
          <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
        </select>
      </label>
    </div>

    <p v-if="loading">Chargement des tickets...</p>
    <p v-else-if="filteredTickets.length === 0" class="empty">Aucun ticket trouvé.</p>

    <div v-else class="ticket-grid">
      <article v-for="ticket in filteredTickets" :key="ticket.id" class="ticket-card">
        <div class="card-top">
          <span :class="['badge', `status-${ticket.statut.toLowerCase().replace(' ', '-')}`]">
            {{ ticket.statut }}
          </span>
          <span :class="['priority', `priority-${ticket.priorite.toLowerCase()}`]">
            {{ ticket.priorite }}
          </span>
        </div>
        <h2>{{ ticket.titre }}</h2>
        <p>{{ ticket.description }}</p>
        <p class="muted">Demandé par {{ ticket.demandeur }} · {{ formatDate(ticket.dateCreation) }}</p>
        <div class="card-actions">
          <RouterLink :to="`/tickets/${ticket.id}`">Voir le détail</RouterLink>
          <button class="button button-secondary" type="button" @click="changeStatus(ticket)">
            Étape suivante
          </button>
          <button class="link-danger" type="button" @click="removeTicket(ticket)">Supprimer</button>
        </div>
      </article>
    </div>
  </section>
</template>
