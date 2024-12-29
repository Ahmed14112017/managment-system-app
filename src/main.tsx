import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { AuthcontextProvider } from './Autcontext/Authcontext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthcontextProvider>
    <App />
    </AuthcontextProvider>
  </StrictMode>,
)
