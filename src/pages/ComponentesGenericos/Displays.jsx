import styled from "styled-components";
import { Menu } from "./Menu";
import { Footer } from "./Footer";
import { PiDropSimple } from "react-icons/pi";
const DisplayPrincipalStyled = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    height:auto;
    
    margin-top: 80px;
    position: relative;
    z-index: 1;

    background-color: #e5e5f7;

background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #e5e5f7 10px ), repeating-linear-gradient( #ffffff55, #ffffff );
`

const ContenedorChildren = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    height:100%;
    min-height: calc(100vh - 80px);
    padding-top:  ${props => props.noPadding ? "0" : "20px"};
    
        @media (min-width: 1000px){
            padding-top:  ${props => props.noPadding ? "20px" : "20px"};
            
        }
    
    gap: 20px;
   z-index: -10;
    align-items:center;
`
export const DisplayPrincipal =({children , displayNone, noPadding})=>{
    return(
        <DisplayPrincipalStyled  >
            <Menu displayNone={displayNone}/>

            <ContenedorChildren noPadding={noPadding} > {children}</ContenedorChildren>

            <Footer displayNone={displayNone} />
        </DisplayPrincipalStyled>
    )
}
