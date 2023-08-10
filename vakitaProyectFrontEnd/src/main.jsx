import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {UserProvider} from './context/UserProvider.jsx'
import VakitaProvider from './context/VakitaProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <VakitaProvider>
    <UserProvider>
    <App />
    </UserProvider>
    </VakitaProvider>
  </React.StrictMode>
)
