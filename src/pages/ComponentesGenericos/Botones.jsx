import styled from "styled-components";

const BtnStyled = styled.button`
    border:none;
    cursor: pointer;
    font-size: ${props => props.sty === 'textoPeque' ? '22px' : '36px'};
    font-weight:bold;
    background-color: transparent;
    width: 120px;
    transition: .3s ease;

    color: var(--AzulSecundario);
    fill: var(--AzulSecundario);

    &:hover{
        background-color: var(--AzulSecundario);
        
        color: var(--BlancoSecundario);
        fill: var(--BlancoSecundario);
        transition: .3s ease-in;
    }

    
`
export const BtnMenu = ({txt, handleClick, sty}) =>{
    return(
        <BtnStyled onClick={() => handleClick()} sty={sty}  >
            {txt}
        </BtnStyled>
    )
}