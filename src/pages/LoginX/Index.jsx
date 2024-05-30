import { DispayPrincipal } from "./ComponentesLoginRegister";
import { LoginRa } from "./LoginRa";
import { RegisterRa } from "./RegisterRa";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';

export const Login = () => {
    const [boolSwitchLoginRegister, setBoolSwitchLoginRegister] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                // Usuario autenticado, redirigir
                console.log("Usuario autenticado, UID:", user.uid);
                navigate('/userPage'); // Cambia '/otra-pagina' por la ruta a la que quieres redirigir
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return (
        <DispayPrincipal>
            {boolSwitchLoginRegister
            ? <RegisterRa  setBoolSwitchLoginRegister={setBoolSwitchLoginRegister}/>
            : <LoginRa setBoolSwitchLoginRegister={setBoolSwitchLoginRegister} />
            }
        </DispayPrincipal>
    );  
};
