import styled from "styled-components";
import { ImgPicture } from "./Img";
import imgDefault from '../../src/imgDefault.png'; // Renombrado para evitar conflicto de nombres
import { useNavigate } from "react-router-dom";

const ContenedorCardPost = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;

const ContenedorImg = styled.div`
    height: 175px;
    width: 100%;
    overflow: hidden;

    img {
        transition: .2s ease-in-out;
        &:hover {
            transform: scale(1.08);
            transition: .2s ease-in-out;
        }
    }
`;

const ContenedorTextoCard = styled.div`
    width: 100%;
    height: 75px;
    flex-direction: column;
    font-size: 16px;
`;

const ContenedorTitulo = styled.div`
    font-weight: bold;
    width: 100%;
    color: var(--AzulPrincipal);
`;

const ContenedorDescripcion = styled.div`
    width: 100%;
    height: auto;
    overflow: hidden;

    @media (max-width: 900px) {
        display: none;
    }
`;

export const CardPost = ({ post }) => {
    const titulo = post.titulo;
    const descripcion = post.secciones[0].descripcion;
    const img = post.mainImage || imgDefault;

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/post', { state: { post } });
    };

    return (
        <ContenedorCardPost onClick={handleClick}>
            <ContenedorImg>
                <ImgPicture hover='zoom' src={img} alt='imagen principal' />
            </ContenedorImg>
            <ContenedorTextoCard>
                <ContenedorTitulo>{titulo}</ContenedorTitulo>
                <ContenedorDescripcion>{descripcion}</ContenedorDescripcion>
            </ContenedorTextoCard>
        </ContenedorCardPost>
    );
};
