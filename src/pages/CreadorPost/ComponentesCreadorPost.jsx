// ComponentesCreadorPost.jsx
import { Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import styled from "styled-components";


export const ContenedorFormularioPost = styled(Form)`
    background-color: var(--MoradoPrincipal);
    height:auto;
    min-height: 400px;
    width: 85%;
    max-width: 800px;
    border-radius: 30px;
    padding: 30px 20px;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:10px;
    position:relative;
    margin: 0 0  100px 0;
    overflow: visible;
`;

export const LabelStyled = styled.h2`
    font-size: 36px;
    margin-top: 0;
    font-weight: bold;
    color: var(--BlancoV2);
    text-align:center;
`;

const FieldStyled = styled(Field)`
    background-color: var(--BlancoV2);
    width: 100%;
    height: 40px;
    color: var(--AzulPrincipal);
    border: none;
    padding-left: 10px;
    border-radius: 10px;

    &::placeholder {
        color: var(--AzulPrincipal);
        opacity: 1;
    }
`;

const FieldTextAreaStyled = styled.textarea`
    padding-left: 10px;
    border-radius: 10px;
    background-color: var(--BlancoV2);
    height: 120px;
    width:100%;
    resize: vertical;
    overflow-y: auto;
    white-space: pre-wrap;
    word-wrap: break-word;

    &::placeholder {
        color: var(--AzulPrincipal);
        opacity: 1;
    }
`;

const ContenedorInputImg = styled.div`
    display: grid;
    width: 100%;
    gap: 10px;
`;

const FieldFileStyled = styled(FieldStyled)`
    cursor: pointer;
    background-color: var(--BlancoSecundario);
    padding:0;

    &::-webkit-file-upload-button {
        background-color: var(--BlancoV2);
        color: var (--AzulPrincipal);
        border: none;
        height:100%;
        width: 50%;
        padding: 10px 20px;
        cursor: pointer;
        outline: none;
    }

    &::file-selector-button {
        background-color: var(--BlancoV2);
        color: var(--AzulPrincipal);
        width: 50%;
        border: none;
        height:100%;
        padding: 10px 20px;
        cursor: pointer;
        outline: none;
    }
`;

const InputFile = ({ name, onChange }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        onChange(name, file);
    };

    return (
        <FieldFileStyled
            type="file"
            name={name}
            accept="image/*"
            onChange={handleFileChange}
        />
    );
};

export const InputFormulario = ({ type, name, txt, FnOnchange, titular }) => {
    const handleInputChange = (event) => {
        FnOnchange(event); // Here, passing the full event so that FnOnchange can extract the value
    };

    return (
        <FieldStyled type={type} name={name} placeholder={txt} value={titular} onChange={handleInputChange} />
    );
};

const BtnAgregarInputStyled = styled.div`
    height: 60px;
    width: 60px;
    font-size: 40px;
    display: flex;
    justify-content:center;
    align-items:Center;
    background-color: var(--BlancoSecundario);
    border-radius:10px;
    cursor: pointer;
`;

export const BtnAgregarInput = ({ FnAgregar }) => {
    return (
        <BtnAgregarInputStyled onClick={FnAgregar}>
            <FaPlus />
        </BtnAgregarInputStyled>
    );
};

const TituloSeccion = styled.h2`
    color: var(--AzulPrincipal);
    font-size: 24px;
    margin: 0;
    text-align: center;
    color: var(--BlancoV2);
`;

export const SeccionTextareaFormulario = ({ txt, txt2, handleChange, id }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(name, value);
    };

    const handleFileChange = (name, file) => {
        handleChange(name, file);
    };

    return (
        <>
            <TituloSeccion>{'Seccion ' + (id+1) }</TituloSeccion>
            <FieldStyled type="input" name={'titulo'} placeholder={txt} onChange={handleInputChange} />
            <Field
                as={FieldTextAreaStyled}
                name={'descripcion'}
                placeholder={txt2}
                onChange={handleInputChange}
            />
            <ContenedorInputImg>
                <InputFile name={'img1'} onChange={handleFileChange} />
                <InputFile name={'img2'} onChange={handleFileChange} />
            </ContenedorInputImg>
        </>
    );
};

export const BtnOnSubmitStyled = styled.button`
    width: 100%;
    height: 100px;
    background-color: var(--NaranjaPrincipal);
    border:none;
    border-radius: 0 0 40px 40px;
    cursor:pointer;
    position:absolute;
    bottom: -45px;
    font-weight:bold;
    font-size: 22px;

    cursor:pointer;
    display:flex;
    align-items: end;
    justify-content:center;
    padding-bottom:10px;
    z-index: -1;
    color: var(--BlancoV2);
    user-select: none;
`;

export const BtnOnSubmit = () => {
    return(
        <BtnOnSubmitStyled type='submit'>
            Enviar Post
        </BtnOnSubmitStyled>
    );
};

const MensajeErrorStyled = styled.div`
    color: var(--NaranjaPrincipal);
    font-weight: bold;
    min-height: 60px;
    min-width: 120px;
    max-width: 100%;
    max-height: auto;
    text-align:center;

    position: relative;
    display:flex;
    justify-content: center;
    align-items:center;

    animation-name: vibrar;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;

    @keyframes vibrar {
        0% { transform: translate(-10px, -4px); opacity: 0; }
        10% { opacity: 1; }
        25% { transform: translate(10px, -2px); }
        50% { transform: translate(-10px, 0px); }
        75% { transform: translate(10px, ); }
        100% { transform: translate(0px, 0px); opacity: 1;}
    }
`;

export const MensajeError = ({ errores }) => {
    const [error, setError] = useState([]);

    useEffect(() => {
        if (errores) {
            const arregloErrores = Object.keys(errores).map(key => errores[key]);
            setError(arregloErrores[0]);
        }
    }, [errores]);

    return (
        <>
            {error && error.length > 0 && (
                <MensajeErrorStyled>{error}</MensajeErrorStyled>
            )}
        </>
    );
};
