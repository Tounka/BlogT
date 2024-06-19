import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase'; 

// Crear un contexto
const DatosContext = createContext();

export const useDatos = () => {
    const context = useContext(DatosContext); // Corregido el nombre del contexto
    if (!context) {
        throw new Error("useDatos debe ser utilizado dentro de un DatosContextProvider");
    }
    return context;
}

// Componente Proveedor
export const DatosContextProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [nombre, setNombre] = useState('edgar');
    const [indexTodosLosPost, setIndexTodosLosPost] = useState(1);
    const [indexMisPost, setIndexMisPost] = useState(1);


    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((usuarioAutenticado) => {
        setUsuario(usuarioAutenticado);
        console.log('-------------------------',usuarioAutenticado);
      });
      
      return () => unsubscribe();
    }, []);
  return (
    <DatosContext.Provider value={{usuario,nombre, indexTodosLosPost, setIndexTodosLosPost, indexMisPost, setIndexMisPost}} >
      {children}
    </DatosContext.Provider>
  );
};
