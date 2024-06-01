import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDatos } from '../../Contexto.js';
import { DisplayPrincipal } from '../ComponentesGenericos/Displays.jsx';
import { CreadorPostUx } from './CreadorPostUx.jsx';
import { db, storage } from '../../firebase.js';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import imageCompression  from 'browser-image-compression'; // Importar la función imageCompression de browser-image-compression

export const CreadorPost = () => {
    const navigate = useNavigate();
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
        if (usuario) { // Verifica si el usuario está cargado
            setDatos({
                titulo: titular,
                owner: {
                    userId: usuario.uid,
                    userName: usuario.providerData[0].displayName,
                    userImg: usuario.providerData[0].photoURL,
                    fechaDeCreacion: new Date() 
                },secciones: seccionesValues,
            });
        }
    }, [titular, usuario, seccionesValues]);

    const handleChange = (index, field, value) => {
        const newSeccionesValues = [...seccionesValues];
        newSeccionesValues[index] = { ...newSeccionesValues[index], [field]: value };
        setSeccionesValues(newSeccionesValues);
    };

    const initialValues = {
        titular: '',
    };

    const MAX_FILE_SIZE_MB = 1; // Tamaño máximo en MB permitido

    const handleSubmit = async (values) => {
        try {
            // Verifica si el usuario está cargado antes de continuar
            if (!usuario) {
                console.error("El usuario no está cargado.");
                return;
            }

            const updatedSeccionesValues = await Promise.all(
                seccionesValues.map(async (seccion) => {
                    const updatedSeccion = { ...seccion };
    
                    for (let imgKey of ['img1', 'img2']) {
                        if (updatedSeccion[imgKey] && updatedSeccion[imgKey] instanceof File) {
                            const fileSizeMB = updatedSeccion[imgKey].size / (1024 * 1024); // Convertir bytes a megabytes
                            if (fileSizeMB > MAX_FILE_SIZE_MB) {
                                // Comprime la imagen solo si su tamaño es mayor al límite establecido
                                const compressedImage = await imageCompression(updatedSeccion[imgKey], { maxSizeMB: MAX_FILE_SIZE_MB });
                                const uniqueFileName = uuidv4(); // Genera un nombre único
                                const storageRef = ref(storage, `images/${uniqueFileName}`);
                                const snapshot = await uploadBytes(storageRef, compressedImage);
                                const downloadURL = await getDownloadURL(snapshot.ref);
                                updatedSeccion[imgKey] = downloadURL;
                            } else {
                                // Si el tamaño del archivo es menor o igual al límite establecido, sube la imagen original
                                const uniqueFileName = uuidv4(); // Genera un nombre único
                                const storageRef = ref(storage, `images/${uniqueFileName}`);
                                const snapshot = await uploadBytes(storageRef, updatedSeccion[imgKey]);
                                const downloadURL = await getDownloadURL(snapshot.ref);
                                updatedSeccion[imgKey] = downloadURL;
                            }
                        }
                    }
                    return updatedSeccion;
                })
            );
    
            const docData = {
                ...datos,
                secciones: updatedSeccionesValues,
            };
    
            const docRef = await addDoc(collection(db, "post"), docData);
            console.log("Documento guardado con ID: ", docRef.id);
            navigate('/');
        } catch (error) {
            console.error("Error al guardar el documento: ", error);
        }
    };
    
    const FnTitular = (event) => {
        const { value } = event.target;
        setTitular(value);
    };

    const validate = values => {
        const errors = {};
        if (!titular) {
            errors.titular = 'El titular es requerido';
        }

        seccionesValues.forEach((seccion, index) => {
            if (!seccion.titulo) {
                errors[`titulo_${index}`] = 'El título es requerido';
            }
            if (!seccion.descripcion && !seccion.img1 && !seccion.img2) {
                errors[`descripcion_${index}`] = 'Debes poner algo de contenido en cada sección';
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
