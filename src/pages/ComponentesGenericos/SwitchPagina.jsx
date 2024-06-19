import styled from "styled-components";
import { FaAngleLeft, FaAngleDoubleLeft, FaAngleRight, FaAngleDoubleRight} from "react-icons/fa";
import { useDatos } from "../../Contexto";

const ContenedorBtnStyled = styled.div`
    height: 60px;
    width: 200px;
    
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
`

const ContenedorElemento = styled.div`
    width: 60px;
    height: 60px;
    font-size: 36px;


    display:flex;
    justify-content:center;
    align-items:center;
    
    color: var(--AzulPrincipal);
    cursor: ${props => props.pointer ? 'pointer' : ''};
`
export const SwitchPagina = ({ultimoPost, index, setIndex}) => {
    

    const handleClick = (estado) => {
        setIndex(index + estado);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log(index);
    };

    return (
        <ContenedorBtnStyled>
            {index > 1 ? (
                <ContenedorElemento pointer onClick={() => handleClick(-1)}>
                    <FaAngleLeft />
                </ContenedorElemento>
            ) : <ContenedorElemento />}

            <ContenedorElemento>
                {index}
            </ContenedorElemento>

            {ultimoPost == false ? (
                <ContenedorElemento pointer onClick={() => handleClick(+1)}>
                    <FaAngleRight />
                </ContenedorElemento>
            ) : <ContenedorElemento />}
           
        </ContenedorBtnStyled>
    );
};