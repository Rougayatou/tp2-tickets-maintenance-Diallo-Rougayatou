<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { createTicket, getTicket, updateTicket } from '../services/ticketService'

const route = useRoute()
const router = useRouter()
const isEditing = computed(() => Boolean(route.params.id))
const form = ref({
  titre: '',
  description: '',
  demandeur: '',
  priorite: 'Moyenne',
  statut: 'Ouvert'
})
const errors = ref({})
const error = ref('')
const saving = ref(false)
const loading = ref(false)

function validate() {
  errors.value = {}
  if (!form.value.titre.trim()) errors.value.titre = 'Le titre est obligatoire.'
  if (!form.value.description.trim()) errors.value.description = 'La description est obligatoire.'
  if (!form.value.demandeur.trim()) errors.value.demandeur = 'Le demandeur est obligatoire.'
  return Object.keys(errors.value).length === 0
}

async function loadTicket() {
  if (!isEditing.value) return
  loading.value = true
  try {
    form.value = await getTicket(route.params.id)
  } catch {
    error.value = 'Ce ticket n’existe pas ou le serveur est indisponible.'
  } finally {
    loading.value = false
  }
}

async function saveTicket() {
  if (!validate()) return

  saving.value = true
  error.value = ''
  try {
    if (isEditing.value) {
      await updateTicket(route.params.id, form.value)
      router.push(`/tickets/${route.params.id}`)
    } else {
      await createTicket({
        ...form.value,
        statut: 'Ouvert',
        dateCreation: new Date().toISOString().slice(0, 10)
      })
      router.push('/tickets')
    }
  } catch {
    error.value = 'L’enregistrement a échoué. Vérifiez que JSON Server est lancé.'
  } finally {
    saving.value = false
  }
}

onMounted(loadTicket)
</script>

<template>
  <section class="form-page">
    <RouterLink class="back-link" to="/tickets">← Retour à la liste</RouterLink>
    <h1>{{ isEditing ? 'Modifier le ticket' : 'Nouveau ticket' }}</h1>

    <div v-if="error" class="alert error">{{ error }}</div>
    <p v-if="loading">Chargement...</p>

    <form v-else class="ticket-form" @submit.prevent="saveTicket">
      <label>
        Titre *
        <input v-model="form.titre" type="text" placeholder="Ex. Clavier défectueux" />
        <small v-if="errors.titre" class="field-error">{{ errors.titre }}</small>
      </label>
      <label>
        Description *
        <textarea v-model="form.description" rows="5" placeholder="Décrivez le problème"></textarea>
        <small v-if="errors.description" class="field-error">{{ errors.description }}</small>
      </label>
      <label>
        Demandeur *
        <input v-model="form.demandeur" type="text" placeholder="Nom du demandeur" />
        <small v-if="errors.demandeur" class="field-error">{{ errors.demandeur }}</small>
      </label>
      <label>
        Priorité
        <select v-model="form.priorite">
          <option>Basse</option>
          <option>Moyenne</option>
          <option>Haute</option>
        </select>
      </label>
      <label v-if="isEditing">
        Statut
        <select v-model="form.statut">
          <option>Ouvert</option>
          <option>En cours</option>
          <option>Résolu</option>
          <option>Fermé</option>
        </select>
      </label>
      <button class="button" type="submit" :disabled="saving">
        {{ saving ? 'Enregistrement...' : 'Enregistrer' }}
      </button>
    </form>
  </section>
</template>
