import { DisplayPrincipal } from "../ComponentesGenericos/Displays"
import { GridPost } from "../GridPost"
import { PostPrincipal } from "./Secciones/SeccionPostPrincipal"

export const UserPage = () => {

    
    return(
        <DisplayPrincipal >
            
            <PostPrincipal />

            <GridPost ></GridPost>
        
        </DisplayPrincipal>
        
        
    )
        
    
}