import styled from "styled-components";

const ContenedorFooter = styled.div`
    margin-top: 40px;
    width:100%;
    height: 80px;
    background-color: var(--BlancoPrincipal);

    display:flex;
    justify-content:center;
    align-items:center;
    text-align:center;

    bottom:0;
    font-size: 16px;
    color: var(--AzulPrincipal);

    display: ${props => props.displayNone ? 'none' : 'flex'};
`

export const Footer = () =>{
    return(
        <ContenedorFooter>
            Desarrollado  por Ramon Castillo
        </ContenedorFooter>
    )
}