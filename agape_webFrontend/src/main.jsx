import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

//Importante: poné .jsx al final de la importación de App, ya que Vite 
// lo requiere en algunos entornos, especialmente si no está configurado el resolve.extensions.
