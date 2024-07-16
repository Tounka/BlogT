import styled from "styled-components";
import { Menu } from "./Menu";
import { Footer } from "./Footer";
const DisplayPrincipalStyled = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    height:auto;
    
    margin-top: 80px;
    position: relative;
    z-index: 1;
`

const ContenedorChildren = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    height:100%;
    min-height: calc(100vh - 80px);
    
    @media (min-width: 1000px ){
        padding-top: ${props => props.noPaddingTop ? '' : '20px'};
    }
    gap: 20px;
   z-index: -10;
    align-items:center;
`
export const DisplayPrincipal =({children , displayNone, noPaddingTop})=>{
    return(
        <DisplayPrincipalStyled  >
            <Menu displayNone={displayNone}/>

            <ContenedorChildren noPaddingTop={noPaddingTop}> {children}</ContenedorChildren>

            <Footer displayNone={displayNone} />
        </DisplayPrincipalStyled>
    )
}
