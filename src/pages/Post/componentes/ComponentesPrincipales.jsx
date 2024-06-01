import styled from "styled-components";
import { ImgPicture } from '../../ComponentesGenericos/Img.jsx';
import imgDefault from '../../../src/imgDefault.png';

export const Titulo = styled.h1`
    font-size: 32px;
    font-weight: bold;
    color: var(--AzulPrincipal);
`;

const ContenedorFooterPostStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 20px;
    border-top: 1px solid black;
    padding-top: 20px;
    width: 80%;
    max-width: 1200px;
`;

const ColumnaImgFooterPost = styled.div`
    width: 100px;
    height: 100px;
`;

const ColumnaInformacionFooterPost = styled.div`
    text-align: left;
    height: 100px;
`;

const TextoInformacionFooterPost = styled.div`
    font-size: 14px;
`;

// Asegúrate de que img sea una URL de cadena y no un objeto
export const FooterPost = ({ nombre, img, fechaDeCreacion = 'hoy' }) => {
    const imagen = img || imgDefault;  // Usar imgDefault si img no está definido

    console.log(imagen);  // Esto debería mostrar imgDefault si img no está definido

    return (
        <ContenedorFooterPostStyled>
            <ColumnaImgFooterPost>
                <ImgPicture src={imagen} alt='Foto de usuario' />
            </ColumnaImgFooterPost>
            <ColumnaInformacionFooterPost>
                <TextoInformacionFooterPost>{nombre}</TextoInformacionFooterPost>
                <TextoInformacionFooterPost>{fechaDeCreacion}</TextoInformacionFooterPost>
            </ColumnaInformacionFooterPost>
        </ContenedorFooterPostStyled>
    );
};
