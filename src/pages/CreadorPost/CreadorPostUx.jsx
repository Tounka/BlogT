import { ContenedorFormularioPost, LabelStyled, InputFormulario, SeccionTextareaFormulario, BtnAgregarInput, BtnOnSubmit, MensajeError, InputFile } from './ComponentesCreadorPost.jsx';

export const CreadorPostUx = ({ secciones, agregarSeccion, errores, handleChange, FnTitular, titular, handleMainImageChange }) => {
    return (
        <ContenedorFormularioPost>
            <LabelStyled>Crea tu post</LabelStyled>
            <InputFormulario txt='Titular' name='titular' type='text' FnOnchange={FnTitular} titular={titular} />
            <InputFile name={'imgPrincipal'} onChange={handleMainImageChange} /> {/* Update this line */}
            
            {secciones.map((seccion, index) => (
                <SeccionTextareaFormulario 
                    key={index} 
                    id={index}
                    txt={'Agrega el titulo'} 
                    txt2={'Agrega el contenido de la sección'} 
                    handleChange={(field, value) => handleChange(index, field, value)}
                />
            ))}
            
            <BtnAgregarInput FnAgregar={agregarSeccion} />
            <MensajeError errores={errores} />
            <BtnOnSubmit />
        </ContenedorFormularioPost>
    );
};
