
import { Formik } from 'formik'
import {DisplayPrincipal} from '../ComponentesGenericos/Displays.jsx'
import { CreadorPostUx } from './CreadorPostUx.jsx'
import { useState } from 'react'
export const CreadorPost = () => {

    const [errores, setErrores] = useState('');
    const [secciones, setSecciones] = useState([{name: 'titulo_0', descripcion: 'descripcion_0', img1:`titulo_0_Img1`, img2:`titulo_0_Img2`}]);
    const agregarSeccion = () => {
        setSecciones([...secciones, { name: `titulo_${secciones.length}`, descripcion: `descripcion_${secciones.length}`, img1:`titulo_${secciones.length}_Img1`, img2:`titulo_${secciones.length}_Img2`}]);
        console.log(secciones)
    };

    const initialValues = {
        titular: '',
        
    }
    const onsubmit = (values) => {
        
        console.log(values)
    }

    const validate = values => {
        const errors = {};
        if (!values.titular) {
            errors.titular = 'El titular es requerido';
            
        }
    
        secciones.forEach(seccion => {
           
            if (!values[seccion.name]) {
                errors[seccion.name] = 'El título es requerido';
            }
            if (!values[seccion.descripcion] && !values[seccion.img1] && !values[seccion.img2] ) {
                errors[seccion.descripcion] = 'Debes poner algo de contenido en cada seccion';
            }
        });
        
        // Agrega más validaciones según tus necesidades para otros campos
        setErrores(errors);
        
        return errors;
    };
    return(
    

            <DisplayPrincipal>    
            <Formik
                initialValues={initialValues}
                onSubmit = {onsubmit}
                validate={validate}
            >
                <CreadorPostUx
                    secciones={secciones}
                    setSecciones={setSecciones}
                    agregarSeccion={agregarSeccion}
                    errores={errores}
                />
            </Formik>
            </DisplayPrincipal>

        

    )
}