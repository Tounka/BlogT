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
    const [datosRam, setDatosRam] = useState(
      {
        owner: "5Ub7r1Q7D8e63Wk0sj3PTeElrph1",
        secciones: [
          {
            titulo: "5 Maneras Sencillas de Mejorar tu Productividad Diaria",
            descripcion: "Te sientes abrumado por la cantidad de tareas que tienes que hacer cada día? Descubre cinco estrategias efectivas y fáciles de implementar para aumentar tu productividad y lograr más en menos tiempo. Desde técnicas de gestión del tiempo hasta hábitos saludables, este post te ayudará a transformar tu rutina diaria y alcanzar tus metas con mayor eficiencia. ¡No te lo pierdas!",
            img1: 'https://imgs.search.brave.com/P1hbCvrh0klN029NUY7IXV6QvT6LRpuSuEaCYIYZNLU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9nZXR0/eWltYWdlcy04ODY2/NTUwNi02NjMyYjNh/NzJmYTJkLmpwZz9j/cm9wPTAuNjY4eHc6/MS4wMHhoOzAuMTY1/eHcsMCZyZXNpemU9/MzYwOio',
            img2: 'https://imgs.search.brave.com/N8XDNaSjSaZwMdtk0RMiHsIUfXyAvlLurbODvHInjwY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50LmVsbXVlYmxl/LmNvbS9tZWRpby8y/MDIzLzA0LzE0L2dh/dG8tYXp1bC1ydXNv/XzAwMDAwMDAwXzgy/YjMyOGFmXzIzMDQx/NDE5MTQwMV8xMDAw/eDE1MDAuanBn'
          },
          {
            titulo: "Transforma tu Hogar: Ideas Creativas para una Decoración Económica",
            descripcion: "¿Quieres darle un nuevo aire a tu hogar sin gastar una fortuna? En este post, compartimos ideas innovadoras y asequibles para renovar la decoración de tu casa. Aprende a reutilizar objetos, hacer manualidades y aprovechar ofertas para crear un ambiente acogedor y estilizado. Con estos consejos, tu hogar lucirá espectacular sin romper el banco. ¡Inspírate y empieza hoy mismo!"
          },
          {
            titulo: "Transforma tu Hogar: Ideas Creativas para una Decoración Económica",
            descripcion: "¿Quieres darle un nuevo aire a tu hogar sin gastar una fortuna? En este post, compartimos ideas innovadoras y asequibles para renovar la decoración de tu casa. Aprende a reutilizar objetos, hacer manualidades y aprovechar ofertas para crear un ambiente acogedor y estilizado. Con estos consejos, tu hogar lucirá espectacular sin romper el banco. ¡Inspírate y empieza hoy mismo!",
            img1: 'https://imgix.cosentino.com/es/wp-content/uploads/2023/07/Lumire-70-Facade-MtWaverley-vic-1.jpg?auto=format%2Ccompress&ixlib=php-3.3.0'
          },
          {
            titulo: "Transforma tu Hogar: Ideas Creativas para una Decoración Económica",
            descripcion: "¿Quieres darle un nuevo aire a tu hogar sin gastar una fortuna? En este post, compartimos ideas innovadoras y asequibles para renovar la decoración de tu casa. Aprende a reutilizar objetos, hacer manualidades y aprovechar ofertas para crear un ambiente acogedor y estilizado. Con estos consejos, tu hogar lucirá espectacular sin romper el banco. ¡Inspírate y empieza hoy mismo!",
            img1: 'https://imgix.cosentino.com/es/wp-content/uploads/2023/07/Lumire-70-Facade-MtWaverley-vic-1.jpg?auto=format%2Ccompress&ixlib=php-3.3.0'
          }
        ],
        titulo: "Mi Primer Post"
      }
      
    );

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((usuarioAutenticado) => {
        setUsuario(usuarioAutenticado);
        console.log('-------------------------',usuarioAutenticado);
      });
      
      return () => unsubscribe();
    }, []);
  return (
    <DatosContext.Provider value={{usuario,nombre, datosRam}} >
      {children}
    </DatosContext.Provider>
  );
};
