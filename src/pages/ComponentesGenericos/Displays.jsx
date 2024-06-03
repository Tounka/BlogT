import styled from "styled-components";
import { Menu } from "./Menu";
import { Footer } from "./Footer";
const DisplayPrincipalStyled = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    height:auto;
    
    margin-top: 100px;
    position: relative;
    z-index: 1;
`
const ContenedorChildren = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    height:100%;
    min-height: 80vh;
   z-index: -10;
    align-items:center;
`
export const DisplayPrincipal =({children , displayNone})=>{
    return(
        <DisplayPrincipalStyled  >
            <Menu displayNone={displayNone}/>

            <ContenedorChildren > {children}</ContenedorChildren>

            <Footer displayNone={displayNone} />
        </DisplayPrincipalStyled>
    )
}
