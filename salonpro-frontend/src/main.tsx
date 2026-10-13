import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './app/App'
import { AppErrorBoundary } from './app/AppErrorBoundary'

import './styles/tokens.css'
import './styles/global.css'
import './styles/ui.css'
import './styles/dashboard.css'

createRoot(
    document.getElementById('root')!,
).render(
    <StrictMode>
        <AppErrorBoundary>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AppErrorBoundary>
    </StrictMode>,
)