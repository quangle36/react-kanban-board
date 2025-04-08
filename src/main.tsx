// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TrelloProvider } from './contexts/TrelloContext.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode> 
  <TrelloProvider>
    <App />
  </TrelloProvider>
  // </StrictMode>,
)
