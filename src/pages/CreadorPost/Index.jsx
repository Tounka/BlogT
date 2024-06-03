import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDatos } from '../../Contexto.js';
import { DisplayPrincipal } from '../ComponentesGenericos/Displays.jsx';
import { CreadorPostUx } from './CreadorPostUx.jsx';
import { db, storage } from '../../firebase.js';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

export const CreadorPost = () => {
    const navigate = useNavigate();
    const [errores, setErrores] = useState('');
    const [secciones, setSecciones] = useState([{ name: 'titulo_0', descripcion: 'descripcion_0', img1: `titulo_0_Img1`, img2: `titulo_0_Img2` }]);
    const [seccionesValues, setSeccionesValues] = useState([]);
    const [titular, setTitular] = useState('');
    const [datos, setDatos] = useState();
    const [mainImage, setMainImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { usuario } = useDatos();

    const agregarSeccion = () => {
        setSecciones([...secciones, { name: `titulo_${secciones.length}`, descripcion: `descripcion_${secciones.length}`, img1: `titulo_${secciones.length}_Img1`, img2: `titulo_${secciones.length}_Img2` }]);
    };

    useEffect(() => {
        if (usuario) {
            setDatos({
                titulo: titular,
                owner: {
                    userId: usuario.uid,
                    userName: usuario.providerData[0].displayName,
                    userImg: usuario.providerData[0].photoURL,
                    fechaDeCreacion: Timestamp.fromDate(new Date()),
                },
                secciones: seccionesValues,
            });
            console.log(usuario);
        }
    }, [titular, usuario, seccionesValues]);

    const handleChange = (index, field, value) => {
        const newSeccionesValues = [...seccionesValues];
        newSeccionesValues[index] = { ...newSeccionesValues[index], [field]: value };
        setSeccionesValues(newSeccionesValues);
    };

    const handleMainImageChange = (name, file) => {
        setMainImage(file); 
    };

    const initialValues = {
        titular: '',
    };

    const MAX_FILE_SIZE_MB = 1;
    const MAX_MAIN_IMAGE_SIZE_MB = 1.5;

    const handleSubmit = async (values) => {
        setIsSubmitting(true);
        try {
            if (!usuario) {
                console.error("El usuario no está cargado.");
                setIsSubmitting(false);
                return;
            }

            const updatedSeccionesValues = await Promise.all(
                seccionesValues.map(async (seccion) => {
                    const updatedSeccion = { ...seccion };

                    for (let imgKey of ['img1', 'img2']) {
                        if (updatedSeccion[imgKey] && updatedSeccion[imgKey] instanceof File) {
                            const fileSizeMB = updatedSeccion[imgKey].size / (1024 * 1024);
                            const uniqueFileName = uuidv4();
                            const storageRef = ref(storage, `images/${uniqueFileName}`);
                            let fileToUpload = updatedSeccion[imgKey];

                            if (fileSizeMB > MAX_FILE_SIZE_MB) {
                                fileToUpload = await imageCompression(updatedSeccion[imgKey], { maxSizeMB: MAX_FILE_SIZE_MB });
                            }

                            const snapshot = await uploadBytes(storageRef, fileToUpload);
                            const downloadURL = await getDownloadURL(snapshot.ref);
                            updatedSeccion[imgKey] = downloadURL;
                        }
                    }
                    return updatedSeccion;
                })
            );

            let mainImageURL = '';
            if (mainImage) {
                const mainImageFileSizeMB = mainImage.size / (1024 * 1024);
                const mainImageFileName = uuidv4();
                const mainImageRef = ref(storage, `images/${mainImageFileName}`);
                let mainImageToUpload = mainImage;

                if (mainImageFileSizeMB > MAX_MAIN_IMAGE_SIZE_MB) {
                    mainImageToUpload = await imageCompression(mainImage, { maxSizeMB: MAX_MAIN_IMAGE_SIZE_MB });
                }

                const mainImageSnapshot = await uploadBytes(mainImageRef, mainImageToUpload);
                mainImageURL = await getDownloadURL(mainImageSnapshot.ref);
            }

            const docData = {
                ...datos,
                secciones: updatedSeccionesValues,
                mainImage: mainImageURL, 
            };

            const docRef = await addDoc(collection(db, "post"), docData);
            console.log("Documento guardado con ID: ", docRef.id);
            navigate('/');
        } catch (error) {
            console.error("Error al guardar el documento: ", error);
        } finally {
            setIsSubmitting(false);
            
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

        if (!mainImage) {
            errors.mainImage = 'La imagen principal es requerida';
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
                validateOnBlur={false} 
                validateOnChange={true} 
            >
                <CreadorPostUx
                    secciones={secciones}
                    setSecciones={setSecciones}
                    agregarSeccion={agregarSeccion}
                    handleChange={handleChange}
                    handleMainImageChange={handleMainImageChange} 
                    errores={errores}
                    FnTitular={FnTitular}
                    titular={titular}
                    mainImage={mainImage} 
                    isSubmitting={isSubmitting} 
                />
            </Formik>
        </DisplayPrincipal>
    );
};
