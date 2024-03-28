import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { moveStyles } from 'used-styles/moveStyles'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

moveStyles()

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
)
