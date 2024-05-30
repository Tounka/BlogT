import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDatos } from '../../Contexto.js';
import { DisplayPrincipal } from '../ComponentesGenericos/Displays.jsx';
import { CreadorPostUx } from './CreadorPostUx.jsx';
import { db } from '../../firebase.js';
import { addDoc, collection } from 'firebase/firestore';

export const CreadorPost = () => {
    const [errores, setErrores] = useState('');
    const [secciones, setSecciones] = useState([{ name: 'titulo_0', descripcion: 'descripcion_0', img1: `titulo_0_Img1`, img2: `titulo_0_Img2` }]);
    const [seccionesValues, setSeccionesValues] = useState([]);
    const [titular, setTitular] = useState('');
    const [datos, setDatos] = useState();
    const { usuario } = useDatos();

    const agregarSeccion = () => {
        setSecciones([...secciones, { name: `titulo_${secciones.length}`, descripcion: `descripcion_${secciones.length}`, img1: `titulo_${secciones.length}_Img1`, img2: `titulo_${secciones.length}_Img2` }]);
    };

    useEffect(() => {
        setDatos({
            titulo: titular,
            owner: usuario.uid, // Asumiendo que usuario está disponible aquí
            secciones: seccionesValues,
        });
    }, [titular, usuario.uid, seccionesValues]);

    const handleChange = (index, field, value) => {
        const newSeccionesValues = [...seccionesValues];
        newSeccionesValues[index] = { ...newSeccionesValues[index], [field]: value };
        setSeccionesValues(newSeccionesValues);
    };

    const initialValues = {
        titular: '',
    };

    const handleSubmit = async (values) => {
        try {
               
            const docRef = await addDoc(collection(db, "post"), datos);
            console.log("Documento guardado con ID: ", docRef.id);
        } catch (error) {
            console. Error("Error al guardar el documento: ", error);
        }
        console.log(datos);
   
    };

    const FnTitular = (event) => {
        const { value } = event.target;
        setTitular(value);
    };

    const validate = values => {
        const errors = {};
        if (!titular) { // Correction: should check for the absence of titular
            errors.titular = 'El titular es requerido';
        }

        seccionesValues.forEach(seccion => {
            if (!seccion.titulo) {
                errors[seccion.titulo] = 'El título es requerido';
            }
            if (!seccion.descripcion && !seccion.img1 && !seccion.img2) {
                errors[seccion.descripcion] = 'Debes poner algo de contenido en cada seccion';
            }
        });

        setErrores(errors);
        return errors;
    };

    return (
        <DisplayPrincipal>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validate={validate}
            >
                <CreadorPostUx
                    secciones={secciones}
                    setSecciones={setSecciones}
                    agregarSeccion={agregarSeccion}
                    handleChange={handleChange}
                    errores={errores}
                    FnTitular={FnTitular}
                    titular={titular}
                />
            </Formik>
        </DisplayPrincipal>
    );
};
