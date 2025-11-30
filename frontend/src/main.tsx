import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRouter'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>,
)
