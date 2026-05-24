import { io } from 'socket.io-client'

const SOCKET_URL = 'http://localhost:5000'

let socket = null

/**
 * Connect to Socket.io server with JWT token
 */
export const connectSocket = (token) => {
  if (socket?.connected) return socket

  socket = io(SOCKET_URL, {
    auth: { token },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ['websocket', 'polling'],
  })

  socket.on('connect', () => {
    console.log('⚡ Socket connected:', socket.id)
  })

  socket.on('disconnect', (reason) => {
    console.log('🔌 Socket disconnected:', reason)
  })

  socket.on('connect_error', (err) => {
    console.warn('Socket connection error:', err.message)
  })

  return socket
}

/**
 * Disconnect socket
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

/**
 * Get current socket instance
 */
export const getSocket = () => socket

export default { connectSocket, disconnectSocket, getSocket }
