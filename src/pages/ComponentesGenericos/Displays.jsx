import styled from "styled-components";
import { Menu } from "./Menu";
const DisplayPrincipalStyled = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    
    margin-top: 100px;
    position: relative;
    z-index: 1;
`
export const DisplayPrincipal =({children , displayNone})=>{
    return(
        <DisplayPrincipalStyled  >
            <Menu displayNone={displayNone}/>
            {children}
        </DisplayPrincipalStyled>
    )
}
