import styled from "styled-components";
import { ImgPicture } from '../../ComponentesGenericos/Img.jsx';
import imgDefault from '../../../src/imgDefault.png';

export const Titulo = styled.h1`
    font-size: 32px;
    width: 90%;
    text-align:center;
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
    width: 100%;
    height: 100px;
    display:flex;
    
    justify-content: right;
`;
const ContenedorImgFooter = styled.div`
    width: 100px;
    height: 100px;
    display:flex;
    
    justify-content: right;
`;

const ColumnaInformacionFooterPost = styled.div`
    margin-left: 20px;
    text-align: left;
    display:flex;
    flex-direction:column;
    justify-content:center;
    height: 100px;
`;

const TextoInformacionFooterPost = styled.div`
    font-size: 16px;
    font-weight: ${props => props.bold ? 'bold' : '400'};
`;

// Asegúrate de que img sea una URL de cadena y no un objeto
const formatTimestampToDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
};

export const FooterPost = ({ nombre = 'nombre normal', img, fechaDeCreacion }) => {
    const imagen = img || imgDefault;  // Usar imgDefault si img no está definido
    const fecha = formatTimestampToDate(fechaDeCreacion);

    return (
        <ContenedorFooterPostStyled>
            <ColumnaImgFooterPost>
                <ContenedorImgFooter>
                    <ImgPicture src={imagen} alt='Foto de usuario' />
                </ContenedorImgFooter>
            </ColumnaImgFooterPost>
            <ColumnaInformacionFooterPost>
                <TextoInformacionFooterPost bold>Escrito por:</TextoInformacionFooterPost>
                <TextoInformacionFooterPost>{nombre}</TextoInformacionFooterPost>
                <TextoInformacionFooterPost>{fecha}</TextoInformacionFooterPost>
            </ColumnaInformacionFooterPost>
        </ContenedorFooterPostStyled>
    );
};
