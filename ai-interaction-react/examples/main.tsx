import * as React from 'react'
import * as ReactDOM from 'react-dom/client' // виправлення проблеми з default import

import App from './App'

import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
