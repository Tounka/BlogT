import React from 'react';
import ReactDOM from 'react-dom'; // Importa directamente desde 'react-dom'
import './index.css';
import App from './App';
import { DatosContextProvider } from './Contexto.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DatosContextProvider>
        <App />
    </DatosContextProvider>
  </React.StrictMode>
);
