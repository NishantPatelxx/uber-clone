import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContextProvider from './context/UserContext.jsx'
import CaptainDataProvider from './context/CaptainDataProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainDataProvider>
      <UserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContextProvider>
    </CaptainDataProvider>
  </StrictMode>,
)
