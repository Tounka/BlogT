import styled from "styled-components"
import { BtnMenu } from "./Botones"
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const ContenedorPadreMenu =  styled.div`
    height: 80px;
    width:100%;
    background-color: var(--BlancoPrincipal);
    display: flex;
    justify-content: space-between;
    position:fixed;
    top: 0;
    left: 0;
    
    -webkit-box-shadow: 0px 5px 17px 0px rgba(0,0,0,0.58);
    -moz-box-shadow: 0px 5px 17px 0px rgba(0,0,0,0.58);
    box-shadow: 0px 5px 17px 0px rgba(0,0,0,0.58);
`
const ContenedorSeccionesMenu = styled.div`
    display:flex;
    height: 100%;
    width: auto;
    gap:20px;
    

    
`


export const Menu = () =>{

    const navigate = useNavigate();
    const FnLogOut = async() =>{
            try {
                await signOut(auth);
                console.log("Cierre de sesión exitoso");
                navigate('/'); // Redirige al usuario a la página de inicio o a donde desees
            } catch (error) {
                console.error("Error al cerrar sesión:", error);
            }
        
    }
    const FnNombre = () =>{
        navigate('/Inicio');
    }
    const FnRedirect = ()=>{
        navigate('/CrearPost');
    }
    return(
        <ContenedorPadreMenu>
            {/* Izquierda */}
            <ContenedorSeccionesMenu>
                <BtnMenu handleClick={FnNombre} txt={'BlogT'} />
            </ContenedorSeccionesMenu>
            {/* Medio */}
            <ContenedorSeccionesMenu>
                <BtnMenu handleClick={FnNombre} txt={'Perfil'}  sty={'textoPeque'}/>
                <BtnMenu handleClick={FnRedirect} txt={'Crear Post'} sty={'textoPeque'}/>
                <BtnMenu handleClick={FnNombre} txt={'Mis Post'} sty={'textoPeque'}/>
            </ContenedorSeccionesMenu>
            {/* Derecha */}
            <ContenedorSeccionesMenu>
                <BtnMenu handleClick={FnLogOut} txt={<IoIosLogOut style={{fontSize: '40px' }} />} />
            </ContenedorSeccionesMenu>
            
            
            

        </ContenedorPadreMenu>
    )
}