import { LoginUx } from "./LoginUx";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth, db } from '../../firebase'; // Asegúrate de que db esté exportado desde tu configuración de Firebase
import { useState } from 'react';
import { setDoc, doc, getDoc } from "firebase/firestore"; // Importa las funciones necesarias de Firestore

export const LoginRa = ({ setBoolSwitchLoginRegister }) => {
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
            console.log("Inicio de sesión exitoso");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleClickSwitchLogReg = () => {
        setBoolSwitchLoginRegister(1);
    }

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await setPersistence(auth, browserLocalPersistence);
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userDocRef = doc(db, "usuarios", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
              
                await setDoc(userDocRef, {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    createdAt: new Date() 
                });
                console.log("Usuario agregado a Firestore");
            }

            console.log("Inicio de sesión con Google exitoso", user);
        } catch (error) {
            console.error("Error al iniciar sesión con Google", error);
        }
    };

    return (
        <LoginUx 
            validate={validate}
            onSubmit={onSubmit}
            initialValues={initialValues}
            error={error}
            setError={setError}
            handleClickSwitchLogReg={handleClickSwitchLogReg}
            signInWithGoogle={signInWithGoogle}
        />
    );
}
