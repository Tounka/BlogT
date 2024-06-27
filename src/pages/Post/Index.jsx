import { useDatos } from "../../Contexto"
import { DisplayPrincipal } from "../ComponentesGenericos/Displays";
import { PostUx } from "./PostUx";
import { useLocation } from "react-router-dom";

export const Post = () => {
    const location = useLocation();
    const { post, key } = location.state || {}; // Manejar el caso donde el estado podría no estar definido


    return (
        <DisplayPrincipal>
            <PostUx post={post} id={key} />
        </DisplayPrincipal>
    );
};


