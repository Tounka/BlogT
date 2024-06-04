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

    overflow: hidden;
    border-radius: 20px;
    border: 2px solid var(--AzulPrincipal);
    
`;

const ContenedorImg = styled.div`
    height: 150px;
    width: 100%;
    overflow: hidden;

    border-bottom: 1px solid var(--AzulPrincipal);
    box-shadow: inset 0px 5px 17px -5px rgba(0, 0, 0, 0.58);
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
    height: 100px;
    flex-direction: column;
    font-size: 16px;

    
`;

const ContenedorTitulo = styled.div`
    font-weight: bold;
    width: 100%;
    color: var(--BlancoV2);
    background-color: var(--AzulSecundario);
    text-align:center;
    padding: 3px ;
`;

const ContenedorDescripcion = styled.div`
    width: 100%;
    height: calc(100% - 23.2px);
    text-align: justify;
    overflow: hidden;
    background-color: var(--AzulTerciario);
    color: var(--AzulPrincipal);
    padding: 4px ;
    overflow: scroll; /* Mantiene la capacidad de desplazamiento */
    -ms-overflow-style: none;  /* Oculta la barra de desplazamiento en Internet Explorer y Edge */
    scrollbar-width: none; 
  
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
