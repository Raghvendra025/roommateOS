import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api'

// ─── Axios instance ───────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// ─── Request interceptor: attach JWT token ────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ─── Response interceptor: handle 401 globally ───────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear storage and redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// ─── Auth API ─────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
}

// ─── House API ────────────────────────────────────────────────────────────────
export const houseAPI = {
  createHouse: (data) => api.post('/houses', data),
  joinHouse: (data) => api.post('/houses/join', data),
  getMyHouse: () => api.get('/houses/my'),
  getHouse: (id) => api.get(`/houses/${id}`),
  getMembers: (id) => api.get(`/houses/${id}/members`),
  updateHouse: (id, data) => api.put(`/houses/${id}`, data),
  leaveHouse: (id) => api.post(`/houses/${id}/leave`),
  regenerateCode: (id) => api.post(`/houses/${id}/regenerate-code`),
}

// ─── Expense API ──────────────────────────────────────────────────────────────
export const expenseAPI = {
  addExpense: (data) => api.post('/expenses', data),
  getExpenses: (params) => api.get('/expenses', { params }),
  getMySplits: () => api.get('/expenses/my-splits'),
  getExpenseById: (id) => api.get(`/expenses/${id}`),
  markSplitPaid: (splitId, data) => api.put(`/expenses/splits/${splitId}/pay`, data),
  deleteExpense: (id) => api.delete(`/expenses/${id}`),
}

// ─── Grocery API ──────────────────────────────────────────────────────────────
export const groceryAPI = {
  addItem: (data) => api.post('/groceries', data),
  getItems: (params) => api.get('/groceries', { params }),
  updateItem: (id, data) => api.put(`/groceries/${id}`, data),
  markBought: (id, data) => api.put(`/groceries/${id}/bought`, data),
  deleteItem: (id) => api.delete(`/groceries/${id}`),
}

// ─── Chore API ────────────────────────────────────────────────────────────────
export const choreAPI = {
  addChore: (data) => api.post('/chores', data),
  getChores: (params) => api.get('/chores', { params }),
  generateWeekly: (data) => api.post('/chores/generate', data),
  markDone: (id) => api.put(`/chores/${id}/done`),
  requestSwap: (id, data) => api.post(`/chores/${id}/swap-request`, data),
  respondToSwap: (id, data) => api.put(`/chores/${id}/swap-respond`, data),
}

// ─── Rent API ─────────────────────────────────────────────────────────────────
export const rentAPI = {
  generateRent: (data) => api.post('/rent/generate', data),
  getRentPayments: (params) => api.get('/rent', { params }),
  getMyRent: () => api.get('/rent/my'),
  markRentPaid: (id, data) => api.put(`/rent/${id}/pay`, data),
}

// ─── Wallet API ───────────────────────────────────────────────────────────────
export const walletAPI = {
  getWallet: () => api.get('/wallet'),
  deposit: (data) => api.post('/wallet/deposit', data),
  payBill: (data) => api.post('/wallet/pay', data),
  getTransactions: (params) => api.get('/wallet/transactions', { params }),
  getMyContributions: () => api.get('/wallet/my-contributions'),
}

// ─── Notification API ─────────────────────────────────────────────────────────
export const notificationAPI = {
  getNotifications: (params) => api.get('/notifications', { params }),
  getUnreadCount: () => api.get('/notifications/unread-count'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read-all'),
  deleteNotification: (id) => api.delete(`/notifications/${id}`),
  clearRead: () => api.delete('/notifications/clear-read'),
}

export default api
