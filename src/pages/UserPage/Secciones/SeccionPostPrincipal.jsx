import styled, { keyframes } from "styled-components";
import { ImgPicture } from "../../ComponentesGenericos/Img";
import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { TextoGenerico } from "../../ComponentesGenericos/Texto";
import { useNavigate } from "react-router-dom";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Estilizamos el spinner
const Spinner = styled.div`
  border: 16px solid #f3f3f3; /* Color claro del borde */
  border-top: 16px solid #3498db; /* Color del borde superior */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
  margin: auto;
`;

const PostPrincipalStyled = styled.div`
  width: 100%;
  height: 100%;
 
  max-height: 600px;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
    overflow: hidden;
    
  &:hover{
    img{
        transition: transform .1s ease-in;
        transform: scale(1.1);
    }
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .1s ease-in;
  }
`;

const ContenedorSombra = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(81,81,81);
  background: -moz-linear-gradient(219deg, rgba(81,81,81,0.48233553675376406) 60%, rgba(0,0,0,0.7736520633644083) 91%);
  background: -webkit-linear-gradient(219deg, rgba(81,81,81,0.48233553675376406) 60%, rgba(0,0,0,0.7736520633644083) 91%);
  background: linear-gradient(219deg, rgba(81,81,81,0.48233553675376406) 60%, rgba(0,0,0,0.7736520633644083) 91%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#515151", endColorstr="#000000", GradientType=1);
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 0 10px 50px 10px;
  gap: 10px;
`;

const ContenedorUsuario = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  gap: 10px;
  padding: 10px 0 ;
  
  border-top: solid var(--AzulPrincipal) 5px;
  border-bottom: solid var(--AzulPrincipal) 5px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;

  @media (max-width: 1000px) {
    display:flex;
    flex-direction: row-reverse;
    padding: 10px 20px;
  }
`;


const ContenedorSeccionTop = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
  width: 85%;
  height: 600px;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: 3fr 1fr;
    width: 100%;

    height: 700px;
  }
`;

const ContenedorImg = styled.div`
  width: 100px;
  max-height: 100px;
`;

const ContenedorImgSubSeccion = styled.div`
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1000px) {
       display: ${props => props.dpNone ? 'none' : '' };
  }
`;

const ContenedorNombreImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

const ContenedorTextoGenericoSecundario = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;

  @media (max-width: 1000px) {
       display: ${props => props.dpNone ? 'none' : '' };
  }
`;

export const PostPrincipal = () => {
  const [post, setPostPrincipal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, "post"),
          orderBy("owner.fechaDeCreacion", "desc"),
          limit(1)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setPostPrincipal(querySnapshot.docs[0].data());
        }
      } catch (error) {
        console.error("Error al obtener posts", error);
      }
    };
    console.log(post);

    fetchPosts();
  }, []);

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  const handleClick = () => {
    if (post) {
      navigate('/post', { state: { post } });
    }
  };

  return (
    <ContenedorSeccionTop>
      <PostPrincipalStyled onClick={handleClick}>
        {post ? (
          <>
            <ImgPicture src={post.mainImage} alt="Imagen post principal" />
            <ContenedorSombra>
              <TextoGenerico color='var(--BlancoV2)' size='24px' bold>{post.titulo}</TextoGenerico>
              <TextoGenerico color='var(--BlancoV2)' size='16px'>{post.owner.userName} - ({formatDate(post.owner.fechaDeCreacion)})</TextoGenerico>
            </ContenedorSombra>
          </>
        ) : (
          <Spinner />
        )}
      </PostPrincipalStyled>

      {post ? (
        <ContenedorUsuario onClick={handleClick}>
          {post.secciones[0].img1 && (
            <ContenedorImgSubSeccion>
              <ImgPicture src={post.secciones[0].img1} alt="Imagen de la sección" />
            </ContenedorImgSubSeccion>
          )}
          {post.secciones[0].img2 && (
            <ContenedorImgSubSeccion dpNone>
              <ImgPicture src={post.secciones[0].img2} alt="Imagen de la sección" />
            </ContenedorImgSubSeccion>
          )}
          {!post.secciones[0].img2 && post.secciones[0].descripcion && (
            <ContenedorTextoGenericoSecundario dpNone>
              <TextoGenerico color='var(--BlancoV2)' size='24px' align='center'>
                {post.secciones[0].descripcion}
              </TextoGenerico>
            </ContenedorTextoGenericoSecundario>
          )}
          
          <ContenedorNombreImg>
            <ContenedorImg>
              <ImgPicture src={post.owner.userImg} alt="Imagen de perfil" />
            </ContenedorImg>
            <TextoGenerico color='var(--AzulPrincipal)' size='24px' align='center'>{post.owner.userName}</TextoGenerico>
          </ContenedorNombreImg>
        </ContenedorUsuario>
      ) : (
        <Spinner />
      )}
    </ContenedorSeccionTop>
  );
};
