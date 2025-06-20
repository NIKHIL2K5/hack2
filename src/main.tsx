
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { EnhancedAIProvider } from './contexts/EnhancedAIContext'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EnhancedAIProvider>
      <App />
    </EnhancedAIProvider>
  </React.StrictMode>,
)
