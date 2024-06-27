import { Titulo } from "../componentes/ComponentesPrincipales";
import { Seccion } from "../componentes/ComponenteSeccion";
import { FooterPost } from "../componentes/ComponentesPrincipales";

export const Template = ({post}) =>{
    const owner = post.owner;
 
    const tituloPrincipal = post.titulo;
    const secciones = post.secciones;
    const mainImage = post.mainImage;

    console.log(post);


    return(
        <>
            
            <Titulo src={mainImage} titulo={tituloPrincipal} ></Titulo>
            {secciones.map((seccion, index) => (
                <Seccion  data={seccion} index={index}/>
            )

            )}
            <FooterPost nombre={owner.userName} img={owner.userImg} fechaDeCreacion={owner.fechaDeCreacion} idUserPost={owner.userId} id={post.id}/>
            
            

        </>
    )
}