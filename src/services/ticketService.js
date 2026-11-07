import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

export async function getTickets() {
  const response = await api.get('/tickets')
  return response.data
}

export async function getTicket(id) {
  const response = await api.get(`/tickets/${id}`)
  return response.data
}

export async function createTicket(data) {
  const response = await api.post('/tickets', data)
  return response.data
}

export async function updateTicket(id, data) {
  const response = await api.patch(`/tickets/${id}`, data)
  return response.data
}

export async function deleteTicket(id) {
  await api.delete(`/tickets/${id}`)
}
