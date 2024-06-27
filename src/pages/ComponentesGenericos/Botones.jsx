import styled from "styled-components";
import { useDatos } from "../../Contexto";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
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

const BtnEliminarPostStyled = styled.div`
    height: 60px;
    padding: 10px 20px;
    background-color: brown;
    font-size: 20px;
    display: flex;
    justify-content:center;
    align-items: center;
    color: white;
    border-radius: 10px;
    cursor: pointer;
`

export const BtnEliminarPost = ({idUserPost, id}) =>{
    const {usuario} = useDatos();
    const [mostrarModal, setMostrarModal] = useState(false);
    const navigate = useNavigate();
    const handleClick = async () =>{
        await deleteDoc(doc(db, 'post', id));
        navigate('/userPage');
    
    };




    useEffect(() => {
        if (idUserPost === usuario.uid) {
            setMostrarModal(true);
        }else{
            setMostrarModal(false); 
        }
    }, [idUserPost, usuario.uid]); 

    return(
        <>
            {mostrarModal ?
            <BtnEliminarPostStyled onClick={() => handleClick()}>Eliminar Post</BtnEliminarPostStyled>
            : null}
            
        </>
        
    )
}