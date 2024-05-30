import { useDatos } from "../../Contexto"
import { DisplayPrincipal } from "../ComponentesGenericos/Displays";
import { PostUx } from "./PostUx";

export const Post = () =>{
    const {datosRam} = useDatos();
    console.log(datosRam)
    return(
        <DisplayPrincipal>
            <PostUx datosRam={datosRam} />
        </DisplayPrincipal>
        
    )
}