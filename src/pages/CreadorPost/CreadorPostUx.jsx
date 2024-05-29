import { useState } from 'react'
import { ContenedorFormularioPost } from './ComponentesCreadorPost.jsx'
import { LabelStyled } from './ComponentesCreadorPost.jsx'
import { InputFormulario } from './ComponentesCreadorPost.jsx'
import { SeccionInputFormulario, SeccionTextareaFormulario, BtnAgregarInput, BtnOnSubmit } from './ComponentesCreadorPost.jsx'
import { MensajeError } from './ComponentesCreadorPost.jsx'
export const CreadorPostUx = ({setSecciones, secciones, agregarSeccion, errores}) => {

    return(
            <ContenedorFormularioPost>
                <LabelStyled>Crea tu post</LabelStyled>
                <InputFormulario txt='Titular' name='titular' type='text' />
                
                {secciones.map((seccion, index) => (
                    <SeccionTextareaFormulario 
                        key={index} 
                        nam={seccion.name} 
                        descripcion={seccion.descripcion} 
                        img1={seccion.img1}
                        img2={seccion.img2}
                        txt={'Agrega el titulo'} 
                        txt2={'Agrega el contenido de la sección'} 
                    />
                ))}
                <BtnAgregarInput FnAgregar={()=>agregarSeccion()}/>

                <MensajeError errores={errores}/>
                <BtnOnSubmit />
            </ContenedorFormularioPost>
    )
}
