import styled from "styled-components";
import { BtnMenu } from "./Botones";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useState } from "react";

const ContenedorPadreMenu = styled.div`
    height: 80px;
    width: 100%;
    background-color: var(--BlancoPrincipal);
    display: ${props => props.displayNone ? 'none' : 'flex'};
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100000;
    -webkit-box-shadow: 0px 5px 17px 0px rgba(0,0,0,0.58);
    -moz-box-shadow: 0px 5px 17px 0px rgba(0,0,0,0.58);
    box-shadow: 0px 5px 17px 0px rgba(0,0,0,0.58);
`;

const ContenedorSeccionesMenu = styled.div`
    display: flex;
    height: 100%;
    width: auto;
    gap: 20px;
`;

const ContenedorSeccionesMenuPrincipal = styled(ContenedorSeccionesMenu)`
    @media (max-width: 650px) {
        display: none;
    }
`;

const SubMenu = styled.div`
    position: absolute;
    top: 80px;
    left: 0;
    background-color: var(--BlancoPrincipal);
    box-shadow: 0px 5px 17px 0px rgba(0,0,0,0.58);
    z-index: 100001;
    display: ${props => props.show ? 'block' : 'none'};
    width: 200px;
`;

const SubMenuButton = styled.button`
    width: 100%;
    padding: 10px;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    
    &:hover {
        background-color: var(--AzulSecundario);
        color: white;
    }

    @media (min-width: 650px) {
        display: ${props => props.dpNone ? 'none' : 'flex'};

    }

`;

export const Menu = ({ displayNone }) => {
    const navigate = useNavigate();
    const [subMenuVisible, setSubMenuVisible] = useState(false);

    const FnLogOut = async () => {
        try {
            await signOut(auth);
            console.log("Cierre de sesión exitoso");
            navigate('/'); // Redirige al usuario a la página de inicio o a donde desees
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const FnNombre = () => {
        navigate('/userPage');
    };

    const FnMisPost = () => {
        navigate('/MisPost');
    };

    const FnRedirect = () => {
        navigate('/CrearPost');
    };

    const toggleSubMenu = () => {
        setSubMenuVisible(!subMenuVisible);
    };

    const handleSubMenuClick = (path) => {
        setSubMenuVisible(false);
        navigate(path);
    
        // Hacer scroll hacia arriba
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Para que el scroll sea suave
        });
    };

    return (
        <ContenedorPadreMenu displayNone={displayNone}>
            {/* Izquierda */}
            <ContenedorSeccionesMenu>
                <BtnMenu handleClick={toggleSubMenu} txt={'BlogT'} />
                <SubMenu show={subMenuVisible}>
                    <SubMenuButton dpNone onClick={() => handleSubMenuClick('/')}>Inicio</SubMenuButton>
                    <SubMenuButton dpNone onClick={() => handleSubMenuClick('/CrearPost')}>Crear Post</SubMenuButton>
                    <SubMenuButton dpNone onClick={() => handleSubMenuClick('/MisPost')}>Mis Post</SubMenuButton>
                </SubMenu>
            </ContenedorSeccionesMenu>
            {/* Medio */}
            <ContenedorSeccionesMenuPrincipal>
                <BtnMenu handleClick={FnNombre} txt={'Perfil'} sty={'textoPeque'} />
                <BtnMenu handleClick={FnRedirect} txt={'Crear Post'} sty={'textoPeque'} />
                <BtnMenu handleClick={FnMisPost} txt={'Mis Post'} sty={'textoPeque'} />
            </ContenedorSeccionesMenuPrincipal>
            {/* Derecha */}
            <ContenedorSeccionesMenu>
                <BtnMenu handleClick={FnLogOut} txt={<IoIosLogOut style={{ fontSize: '40px' }} />} />
            </ContenedorSeccionesMenu>
        </ContenedorPadreMenu>
    );
};
