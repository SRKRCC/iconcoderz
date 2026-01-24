import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryProvider } from './providers/QueryProvider'

const savedTheme = localStorage.getItem("theme");
if (!savedTheme || savedTheme === "dark") {
  document.documentElement.classList.add("dark");
  if (!savedTheme) localStorage.setItem("theme", "dark");
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <App />
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>,
)
