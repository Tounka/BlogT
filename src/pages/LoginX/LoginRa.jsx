import { LoginUx } from "./LoginUx";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";

import { auth } from '../../firebase';
import { useState } from 'react';

export const LoginRa = ({setBoolSwitchLoginRegister }) =>{
    const [error, setError] = useState(null);
    const initialValues = {
        email: '',
        password: '',
    };
    const validate = values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
          errors.email = 'Email inválido';
        }
        if (!values.password) {
          errors.password = 'La contraseña es requerida';
        } else if (values.password.length < 6) {
          errors.password = 'La contraseña debe tener al menos 6 caracteres';
        }
        return errors;
      };

    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(false);
        try {
        await setPersistence(auth, browserLocalPersistence);
          await signInWithEmailAndPassword(auth, values.email, values.password);
          // Redirigir o hacer algo después del inicio de sesión
          console.log("Inicio de sesión exitoso");
        } catch (error) {
          setError(error.message);
        }
      };

      const handleClickSwitchLogReg = ()=>{
        setBoolSwitchLoginRegister(1);
        
      }

      const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await setPersistence(auth, browserLocalPersistence);
          const result = await signInWithPopup(auth, provider);
          // El usuario ha iniciado sesión exitosamente
          console.log("Inicio de sesión con Google exitoso", result.user);
        } catch (error) {
          // Manejar errores de inicio de sesión con Google
          console.error("Error al iniciar sesión con Google", error);
        }
      };

    return(
        <LoginUx 
            validate={validate}
            onSubmit={onSubmit}
            initialValues={initialValues}
            error={error}
            setError={setError}
            handleClickSwitchLogReg={handleClickSwitchLogReg}
            signInWithGoogle={signInWithGoogle}
        />
    )
}