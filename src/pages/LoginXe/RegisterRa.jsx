import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../firebase.js';
import { useState } from 'react';
import { RegisterUx } from "./RegisterUx.jsx";

export const RegisterRa = ({ setBoolSwitchLoginRegister }) => {
    const [error, setError] = useState(null);
    const initialValues = {
        name: '',
        lastname: '',
        email: '',
        password: '',
    };

    const validate = values => {
        const errors = {};
        if (!values.name) {
            errors.name = 'El nombre es requerido';
        }

        if (!values.lastname) {
            errors.lastName = 'El apellido es requerido';
        }

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
            if (values.name && values.lastname && values.email && values.password) {
                // Crear el usuario en Firebase Authentication
                const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
                const user = userCredential.user;

                // Establecer el displayName del usuario
                await updateProfile(user, {
                    displayName: `${values.name} ${values.lastname}`
                });

                console.log("Registro exitoso");

            } else {
                await signInWithEmailAndPassword(auth, values.email, values.password);
                console.log("Inicio de sesión exitoso");
            }
            // Redirigir o hacer algo después del inicio de sesión o registro
        } catch (error) {
            // Manejar los errores de registro e inicio de sesión de manera diferente
            if (values.name && values.lastname) {
                setError("Error al registrar: " + error.message);
            } else {
                setError("Error al iniciar sesión: " + error.message);
            }
        }
    };

    const handleClickSwitchLogReg = () => {
        setBoolSwitchLoginRegister(0);
    }

    return (
        <RegisterUx
            validate={validate}
            onSubmit={onSubmit}
            initialValues={initialValues}
            error={error}
            setError={setError}
            handleClickSwitchLogReg={handleClickSwitchLogReg}
        />
    )
}
