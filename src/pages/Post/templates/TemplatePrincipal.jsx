import { Titulo } from "../componentes/ComponentesPrincipales";
import { Seccion } from "../componentes/ComponenteSeccion";
import { FooterPost } from "../componentes/ComponentesPrincipales";
export const Template = ({data}) =>{
    const owner = data.owner;
    const tituloPrincipal = data.titulo;
    const secciones = data.secciones;
    console.log(secciones);
    return(
        <>
            
            <Titulo>{tituloPrincipal}</Titulo>
            {secciones.map((seccion, index) => (
                <Seccion  data={seccion} index={index}/>
            )

            )}
            <FooterPost nombre={owner.userName} img={owner.userImg} fechaDeCreacion={owner.fechaDeCreacion}/>
            <h1>{owner}</h1>
            

        </>
    )
}