import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { DemoProvider } from './context/DemoContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <DemoProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </DemoProvider>
    </ThemeProvider>
  </StrictMode>,
)
