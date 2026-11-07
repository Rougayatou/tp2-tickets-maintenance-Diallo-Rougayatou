import { createRouter, createWebHistory } from 'vue-router'
import TicketsView from '../views/TicketsView.vue'
import TicketFormView from '../views/TicketFormView.vue'
import TicketDetailView from '../views/TicketDetailView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/tickets' },
    { path: '/tickets', component: TicketsView },
    { path: '/tickets/nouveau', component: TicketFormView },
    { path: '/tickets/:id/modifier', component: TicketFormView },
    { path: '/tickets/:id', component: TicketDetailView }
  ]
})

export default router
