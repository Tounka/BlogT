
import styled from 'styled-components'
import { CiUser } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import {  Field, ErrorMessage } from 'formik';

export const DispayPrincipal = styled.div`
    height: 100%;
    width: 100%;
    display:flex;
    justify-content:center;
    align-items:center;

    
    background: rgb(66,76,227);
    background: -moz-linear-gradient(121deg, rgba(66,76,227,1) 0%, rgba(175,50,50,1) 100%);
    background: -webkit-linear-gradient(121deg, rgba(66,76,227,1) 0%, rgba(175,50,50,1) 100%);
    background: linear-gradient(121deg, rgba(66,76,227,1) 0%, rgba(175,50,50,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#424ce3",endColorstr="#af3232",GradientType=1);
  
    
    
    
`
export const DisplayLogInRegister = styled(DispayPrincipal)`
    height:100%;
    min-width:auto;
`
export const ContenedorCLoginRegister = styled.div`
    min-height: 400px;
    max-height: auto;
    width: 600px;
    background-color: var(--BlancoPrincipal);
    position:relative;
    border-radius: 60px;

    @media (max-width: 600px){
        width: 350px;
        max-height: 600px;
    }
     @media (max-width: 350px){
        width: 350px;
        border-radius: 0;
    }
    

    


`
const ContenedorIconoSuperior = styled.div`
    height: 150px;
    width: 100%;
    display: flex;
    justify-content:Center;
    align-items:center;
    position:absolute;

    top: -75px;

`
const ContenedorIcono = styled.div`
    height: 150px;
    width: 150px;
    border-radius: 50%;
    background-color: var(--AzulPrincipal);
    cursor: pointer;
    display:flex;
    justify-content:center;
    align-items:Center;

    font-size: 100px;
   
`

export const IconoSuperior = ({onClick, Icon = <CiUser fill='var(--BlancoPrincipal)' />}) => {
    return(
        <ContenedorIconoSuperior >
             <ContenedorIcono onClick={onClick}>
                {Icon }
                
            </ContenedorIcono>
        </ContenedorIconoSuperior>
    )
}

const ContenedorSuperiorFooterLoginRegister = styled.div`
    height: 75px;
    width: 100%;
    display:flex;
    justify-content:Center;

    position:absolute;
    bottom: -75px;
    border:none;
    overflow:hidden;
`
const ContenedorFooterLoginRegister = styled.button`
    height: 100%;
    width:70%;
    

    border:none;
    cursor:pointer;
    border-radius: 0 0 40px 40px;
    text-align:center;
    font-size: 20px;
    

    display:flex;
    align-items:center;
    justify-content:center;

    background: rgb(201,187,202);
    background: -moz-linear-gradient(180deg, rgba(201,187,202,0) 0%, var(--BlancoPrincipal) 20%);
    background: -webkit-linear-gradient(180deg, rgba(201,187,202,0) 0%, var(--BlancoPrincipal) 20%);
    background: linear-gradient(180deg, rgba(201,187,202,0) 0%, var(--BlancoPrincipal) 20%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="var(--BlancoPrincipal)",endColorstr="var(--BlancoPrincipal)",GradientType=1);


`
export const FooterLoginRegister = ({txt})=>{
    return(
        <ContenedorSuperiorFooterLoginRegister >
            <ContenedorFooterLoginRegister type="submit" >
                {txt}
            </ContenedorFooterLoginRegister>

        </ContenedorSuperiorFooterLoginRegister>
  
    )
}
export const ContenedorCampos = styled.div`
    margin-top:75px;
    padding: 20px 20px 0 20px;
    
    
`
const ContenedorCampoInput = styled.div`
    display: grid;
    width: 100%;
    min-height: 40px;
    grid-template-columns: 50px auto;
    row-gap: 5px;

`
const ContenedorIzquiedoLb = styled.label`
    background-color: var(--AzulPrincipal);
    height: 50px;
    color: white;
    display:flex; 
    justify-content:Center;
    align-items:center;
    font-size: 25px;
`
const ContenedorDerechoLb = styled(Field)`
    background-color: var(--AzulSecundario);
    border:none;
    color: white;

    &::placeholder {
        color: var(--BlancoSecundario); 
    }
`
const ContenedorMsError = styled.div`
    grid-column: 1/3;
    height: 30px;

`
const MsgError = styled(ErrorMessage)`
    display:flex;
    justify-content:center;
    align-items:Center;
    width: 100%;
    text-align:center;
    place-items: center; 
`
export const CampoForm = ({type, name, txt, icon}) => {
    return(
        <ContenedorCampoInput>
            <ContenedorIzquiedoLb htmlFor={name}>{icon}</ContenedorIzquiedoLb>
            <ContenedorDerechoLb type={type} name={name} id={name} placeholder={txt} />
            <ContenedorMsError>
                <MsgError name={name}  component="ContenedorDerechoLb" />
            </ContenedorMsError>
            
        </ContenedorCampoInput>
    )
}

const ContenedorDisplayBtnSessionGoogle = styled.div`
    display:flex;
    width: 100%;
    height: 70px;
   

    justify-content:center;
    align-items:center;
`
const ContenedorBtnSessionGoogle = styled.div`
     display:flex;
     align-items:center;
     justify-content:center;
     border-radius: 20px;
     background-color: var(--AzulSecundario);
     padding: 0 20px;
    
     gap: 10px;
     
     font-size: 16px;
     svg{
        font-size: 30px;
        fill: var(--BlancoSecundario)
     }
     cursor: pointer;
`
const TextoBtnSessionGoogle = styled.p`
    color: var(--BlancoSecundario);
    
`
export const BtnSessionGoogle = ({handleClick}) => {
    return(
        <ContenedorDisplayBtnSessionGoogle>
            <ContenedorBtnSessionGoogle onClick={() => handleClick()}>
                <FcGoogle />
                <TextoBtnSessionGoogle> Continua con Google </TextoBtnSessionGoogle>
            </ContenedorBtnSessionGoogle>
            
        </ContenedorDisplayBtnSessionGoogle>
    )
}
const ContenedorDisplayTxtError = styled.div`
    display:flex;
    width: 100%;
    height: 40px;
   

    justify-content:center;
    align-items:center;
`
const TxtError = styled.div`
    color: var(--AzulPrincipal);
`
export const MsgErrorForm = ({children}) => {
    
    return(
        <ContenedorDisplayTxtError>
            <TxtError>{children}</TxtError>
        </ContenedorDisplayTxtError>
        
    )
} 