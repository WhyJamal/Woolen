import axios from 'axios'

const API_BASE = '/api'
//const API_BASE = import.meta.env.VITE_API_BASE + '/api/hs'

const USERNAME = import.meta.env.VITE_API_USER || ''
const PASSWORD = import.meta.env.VITE_API_PASS || ''
const basicToken = btoa(unescape(encodeURIComponent(`${USERNAME}:${PASSWORD}`)))
//const basicToken = btoa(`${USERNAME}:${PASSWORD}`)

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Authorization': `Basic ${basicToken}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 60000
})

export default api
